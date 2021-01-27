const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const s3bucket = 'team3-docufiller';

exports.handler = async function(event) {

  const jsonStr = JSON.stringify(event); // have to stringify the event first
  console.log(jsonStr); // this produces standard JSON format

  const emp = JSON.parse(jsonStr); // then you can parse
  console.info(emp.name.last);

  const fileName = "forms/empData." + Date.now() + ".txt";

  try {
    const params = {
      Bucket: s3bucket,
      Key: fileName,
      Body: jsonStr,
      ContentType: 'text/html'
    };
    const putresult = await s3.putObject(params).promise();
  }
  catch (error) {
    console.log("ERR==>" + error);
    return;
  }

  return "200";
};
