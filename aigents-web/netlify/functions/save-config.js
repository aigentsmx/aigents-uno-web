import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { companyName, prompt } = JSON.parse(event.body);

    // Validate required fields
    if (!companyName || !prompt) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Company name and prompt are required' })
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

    // Create company configuration object
    const config = {
      companyName: companyName.trim(),
      prompt: prompt.trim(),
      processingStatus: 'idle',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Save configuration as JSON file in S3
    const sanitizedCompanyName = companyName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const configKey = `companies/${sanitizedCompanyName}/config.json`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: configKey,
      Body: JSON.stringify(config, null, 2),
      ContentType: 'application/json',
      Metadata: {
        'company-name': companyName,
        'last-updated': new Date().toISOString()
      }
    });

    await s3Client.send(command);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        message: 'Configuration saved successfully',
        configPath: configKey
      })
    };

  } catch (error) {
    console.error('Error saving configuration:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to save configuration' })
    };
  }
}; 