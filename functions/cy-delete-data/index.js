const AWS = require('aws-sdk');
const DynamoDB = new AWS.DynamoDB.DocumentClient({ 'region': 'us-east-2' });

exports.handler = (event, context, callback) => {
    try {
        const parameter = query(event);
        DynamoDB.delete(parameter).promise().then(({ Attributes: { age, height, income } }) => { callback(null, { age, height, income }) });
    } catch (e) {
        callback(e);
    }
};

const query = (event) => {
    return {
        TableName: 'compare-yourself',
        Key: { 'userid': 'user_0.5186815076831013' },
        ReturnValues: 'ALL_OLD'
    }
};


