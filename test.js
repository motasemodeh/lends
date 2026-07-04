const { deserialize } = require('./server/api-util/sdk');
const str = '["^ ","~:email","test@test.com","~:message","Hello world! 123"]';
console.log(deserialize(str));
