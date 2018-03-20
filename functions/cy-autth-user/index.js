exports.handler = (event, context, callback) => {
    const token = event.authorizationToken;
    if (token === 'allow' || token === 'deny') {
        const response = genResponse(event);
        callback(null, response)
    } else {
        callback('Unauthorized');
    }
};


const genResponse = (event) => {
    const policy = genPolicy(event.authorizationToken, event.methodArn);
    const principalId = 'sfsefsdes32fd'
    const context = {
        'simpleAuth': true
    }
    const response = {
        'principalId': principalId,
        'policyDocument': policy,
        'context': context
    }
    return response;
}

const genPolicy = (effect, resource) => {
    return {
        'Version': '2012-10-17',
        'Statement': [{
            'Action': 'execute-api:Invoke',
            'Effect': effect,
            'Resource': resource
        }]
    }
}