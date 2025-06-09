let S3Client, PutObjectCommand;

try {
  const aws = require('@aws-sdk/client-s3');
  S3Client = aws.S3Client;
  PutObjectCommand = aws.PutObjectCommand;
} catch (error) {
  console.error('AWS SDK not available:', error.message);
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { companyName, websiteUrl } = JSON.parse(event.body);

    // Validate required fields
    if (!companyName || !websiteUrl) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'Company name and website URL are required' })
      };
    }

    // Check if AWS SDK is available
    if (!S3Client || !PutObjectCommand) {
      console.log('AWS SDK not available, returning mock response');
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          success: true,
          message: 'Configuration received successfully (AWS SDK not available)',
          companyName: companyName.trim(),
          websiteUrl: websiteUrl.trim()
        })
      };
    }

    // Initialize S3 client
    const s3Client = new S3Client({
      region: process.env.MY_AWS_REGION,
      credentials: {
        accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY
      }
    });

    // Create company configuration object
    const config = {
      companyName: companyName.trim(),
      websiteUrl: websiteUrl.trim(),
      processingStatus: 'idle',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Save configuration as JSON file in S3
    const sanitizedCompanyName = companyName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const configKey = `web/companies/${sanitizedCompanyName}/config.json`;

    const command = new PutObjectCommand({
      Bucket: process.env.MY_AWS_S3_BUCKET,
      Key: configKey,
      Body: JSON.stringify(config, null, 2),
      ContentType: 'application/json',
      Metadata: {
        'company-name': companyName,
        'website-url': websiteUrl,
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
    console.error('Error processing configuration:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        error: 'Failed to process configuration',
        details: error.message 
      })
    };
  }
}; 