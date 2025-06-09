exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: 'Hello from Netlify Functions!',
      method: event.httpMethod,
      timestamp: new Date().toISOString()
    })
  };
}; 