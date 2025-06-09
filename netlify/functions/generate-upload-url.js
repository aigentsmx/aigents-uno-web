const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { fileName, fileType, companyName } = JSON.parse(event.body);

    // Validate required fields
    if (!fileName || !fileType || !companyName) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'fileName, fileType, and companyName are required' })
      };
    }

    // Validate file type
    if (fileType !== 'application/pdf') {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Only PDF files are allowed' })
      };
    }

    // Initialize S3 client
    const s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      }
    });

    // Generate company-specific S3 key structure
    const timestamp = Date.now();
    const sanitizedCompanyName = companyName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const s3Key = `web/companies/${sanitizedCompanyName}/documents/${timestamp}-${fileName}`;

    // Create presigned URL for PUT operation with metadata
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: s3Key,
      ContentType: fileType,
      ContentDisposition: 'inline',
      Metadata: {
        'company-name': companyName,
        'uploaded-at': new Date().toISOString(),
        'processing-status': 'pending'
      }
    });

    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uploadUrl,
        s3Key,
        fileName,
        companyFolder: `web/companies/${sanitizedCompanyName}`
      })
    };

  } catch (error) {
    console.error('Error generating upload URL:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate upload URL' })
    };
  }
}; 