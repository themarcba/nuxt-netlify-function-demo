const uniqid = require('uniqid')
exports.handler = async (event, context) => {
    return { statusCode: 200, body: JSON.stringify({ message: 'hello', uid: uniqid(), at: new Date() }) };
};
