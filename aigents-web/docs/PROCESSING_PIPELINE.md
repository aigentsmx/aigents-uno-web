# Document Processing Pipeline - Fully Serverless

## Architecture Overview

**100% Serverless Event-Driven Architecture:**

1. **Upload** → Files go directly to S3 organized by company (`companies/company-name/`)
2. **Config** → Company configuration stored as JSON in S3 (`companies/company-name/config.json`)
3. **S3 Event** → Triggers processing automatically when files are uploaded
4. **Process** → Lambda extracts text, creates embeddings, chunks content
5. **Store** → Save processed data to vector database
6. **No Database Required** → Everything stored in S3 + Vector DB

## File Structure in S3

```
your-s3-bucket/
├── companies/
│   ├── company-name-1/
│   │   ├── config.json          # Company configuration
│   │   ├── documents/           # PDF documents
│   │   │   ├── 1234567-file1.pdf
│   │   │   └── 1234567-file2.pdf
│   │   └── processed/           # Optional: processed text files
│   │       ├── embeddings.json
│   │       └── chunks.json
│   └── company-name-2/
│       ├── config.json
│       └── documents/
```

## Processing Options

### Option 1: AWS Lambda + S3 Events (Recommended)

**S3 Event Configuration:**
```yaml
Event: s3:ObjectCreated:*
Prefix: companies/
Suffix: .pdf
Destination: Lambda Function
```

**Lambda Function:**
```javascript
exports.handler = async (event) => {
  for (const record of event.Records) {
    const bucket = record.s3.bucket.name;
    const key = record.s3.object.key; // companies/company-name/documents/file.pdf
    
    // Extract company name from S3 key
    const companyName = key.split('/')[1];
    
    // 1. Read company config from S3
    const config = await getCompanyConfig(bucket, companyName);
    
    // 2. Download and process PDF
    const text = await extractTextFromPDF(bucket, key);
    
    // 3. Create embeddings using company's prompt context
    const embeddings = await createEmbeddings(text, config.prompt);
    
    // 4. Store in vector database
    await storeInVectorDB(embeddings, companyName);
  }
};
```

### Option 2: Webhook to External Service

**S3 Event → SNS → Your Service:**
```json
{
  "bucket": "your-bucket",
  "key": "companies/company-name/documents/file.pdf",
  "configPath": "companies/company-name/config.json"
}
```

## Tech Stack (No Database Needed!)

### Storage:
- **S3**: File storage + configuration storage
- **Vector DB**: Pinecone, Weaviate, Qdrant, or Supabase Vector

### Processing:
- **Text Extraction**: PDF.js, AWS Textract
- **Embeddings**: OpenAI API, Cohere, local models
- **Chunking**: Custom logic or LangChain

### Benefits:
- ✅ **Zero database management**
- ✅ **Fully serverless**
- ✅ **Auto-scaling**
- ✅ **Event-driven**
- ✅ **Cost-effective** (pay per use)

## Environment Variables (Simplified)

```env
# AWS (Required)
MY_AWS_ACCESS_KEY_ID=your_aws_access_key
MY_AWS_SECRET_ACCESS_KEY=your_aws_secret_key
MY_AWS_REGION=us-east-1
MY_AWS_S3_BUCKET=your-s3-bucket-name

# Vector Database (Choose one)
PINECONE_API_KEY=your_pinecone_key
PINECONE_INDEX_NAME=your_index_name

# Embeddings API (Choose one)
OPENAI_API_KEY=your_openai_key
```

## Deployment Steps

1. **Deploy Netlify app** with S3 upload functionality
2. **Set up S3 bucket** with proper CORS and event configuration
3. **Deploy Lambda function** for document processing
4. **Configure S3 events** to trigger Lambda
5. **Set up vector database** (Pinecone, etc.)
6. **Test the flow**: Upload → Process → Query

## Real-time Status Updates (Optional)

Since there's no database, you can:
- **Write status to S3**: Update `companies/company-name/status.json`
- **Use WebSockets**: Pusher, Ably for real-time updates
- **Polling**: Frontend checks S3 for status updates

Perfect for a fully serverless, event-driven architecture! 🚀 