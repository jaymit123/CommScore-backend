const AWS = require('aws-sdk');
const DynamoDB = new AWS.DynamoDB.DocumentClient({ 'region': 'us-east-2' });
const cisp = new AWS.CognitoIdentityServiceProvider({ 'apiVersion': '2016-04-18' });



// Get current user data or all users data based on what the api request.
exports.handler = (event, context, callback) => {
    try {
        const type = event.type;
        const parameter = query(event, type);
        switch (type) {
            case "all":
                DynamoDB.scan(parameter).promise().then(({ Items }) => callback(null, Items.map(({ age, height, income }) => { return { age, height, income } })));
                break;
            case "single":
                this.submitUserDetails(callback, parameter);
                break;

            default:
                callback(null, 'blank');
        }
    } catch (e) {
        callback(e);
    }
};


// Request currently logged in user details by getting userId from cognito.
const submitUserDetails = (callback, parameter) => {
    const AccessToken = event.accessToken;
    const cispParams = { AccessToken };

    cisp.getUser(cispParams, (err, result) => {
        if (err) callback(err);
        else {
            const userId = result.UserAttributes[0].Value;
            parameter.Key.userid = userId;
            DynamoDB.get(parameter).promise().then(({ Item: { age, height, income } }) => callback(null, [{ age, height, income }]));
        }
    });
};



const query = (event, type) => {

    if (type === 'single') {
        return {
            TableName: 'compare-yourself',
            Key: {
                'userid': null
            }

        }
    } else {
        return {
            TableName: 'compare-yourself'
        }
    }
}
