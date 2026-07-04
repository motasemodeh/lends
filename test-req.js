const handler = require('./server/api/send-support-email');

const req = {
  body: {
    email: 'test@example.com',
    message: 'Hello, this is a test message that is long enough.'
  }
};

const res = {
  status: function(code) {
    console.log('Status:', code);
    return this;
  },
  json: function(data) {
    console.log('JSON:', data);
    return this;
  }
};

handler(req, res).catch(console.error);
