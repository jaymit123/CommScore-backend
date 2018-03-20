const AWS = require('aws-sdk');
const DynamoDB = new AWS.DynamoDB.DocumentClient({ 'region' : 'us-east-2'});
exports.handler = (event, context, callback) => {
    console.log(event);
       try{  
    const query = {
           
        Item : {
            'userid' : event.userid,
            'age' : event.age,
            'height' : event.height,
            'income' : event.income
        },
        TableName: 'compare-yourself',
    }
    DynamoDB.put(query).promise().then( (item) => callback(null,item));
    
}catch(e){
  callback(e);
}
};