const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const s3bucket = 'team3-docufiller';

exports.handler = async function(event, context) {

  //const jsonStr = JSON.stringify(event.body);
  //const data = JSON.parse(jsonStr);
  const data = JSON.parse(event.body);
  
  /*
  try {
      const params0 = {
        Bucket: s3bucket,
        Key: 'test_form.htm',
        Body: JSON.stringify(data),
        ContentType: 'text/html'
      };
      const putresult0 = await s3.putObject(params0).promise();
      console.log("Successfully put");
    }
    catch (error) {
      console.log("ERR==>" + error);
      return;
    };
  */
    
  //console.log(data);

  const createVueObject = (emps) => `
      const formData = new Vue({
          el: "#dataForm",
          data: {
              empName: "${emps.name.last}, ${emps.name.first}",
              fullName: "${emps.name.first} ${emps.name.last}",
              fname: "${emps.name.first}",
              lname: "${emps.name.last}",
              fullAddress: "${emps.address.street}, ${emps.address.city}, ${emps.address.state}  ${emps.address.zipcode}",
              street: "${emps.address.street}",
              city: "${emps.address.city}",
              state: "${emps.address.state}",
              zip: "${emps.address.zipcode}",
              email: "${emps.email}",
              phone: "${emps.phone}"
          }
      })`;

  const htmlHead = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>EmployeeForm</title><script src="https://cdn.jsdelivr.net/npm/vue"></script><script src='data.js'></script><link rel="icon" href="data:;base64,iVBORw0KGgo=">`;
  const htmlStyle = `<style>body {font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;}table {background-color: #f0f0f0;width: 600px;border: 1px solid #000;}th.formTitle {background: #000;color: #ddd;text-align: left;padding: 5px 10px;font-size: 1em;text-shadow: #555 2px 2px;}td {background-color: #fff;color: black;vertical-align: top;padding: 2px 10px;font-size: 1.1em;}td.label {background: #ddd;color: #000;text-align: left;padding: 5px 10px;font-size: .8em;}div.formInfo {font-size: .5em;}</style></head>`;
  const htmlForm = [];
  htmlForm[0] = (vueData, timeStamp) => `${htmlHead}${htmlStyle}<body><div id='dataForm'><table><tr><th class='formTitle' colspan=2>Employee Details</th></tr><tr><td class='label' class=>First Name</td><td>{{fname}}</td></tr><tr><td class='label' class=>Last Name</td><td>{{lname}}</td></tr><tr><td class='label' class=>Street Address</td class=><td>{{street}}</td></tr><tr><td class='label' class=>City</td class=><td>{{city}}</td></tr><tr><td class='label'>State</td><td>{{state}}</td></tr><tr><td class='label'>Zip Code</td><td>{{zip}}</td></tr><tr><td class='label'>Full Address</td><td>{{fullAddress}}</td></tr><tr><td class='label'>Email</td><td>{{email}}</td></tr><tr><td class='label'>Phone</td><td>{{phone}}</td></tr></table><div class='formInfo'>Form 00: Employee Detail Data</div><div id='printTime' class='formInfo'>Printed:  ${timeStamp}</div><script>${vueData}</script></body></html>`;
  htmlForm[1] = (vueData, timeStamp) => `${htmlHead}${htmlStyle}<body><div id='dataForm'><table><tr><th class='formTitle' colspan=2>Recall Roster Details</th></tr><tr><td class='label' class=>Emp Name</td class=><td>{{fullName}}</td></tr><tr><td class='label'>Address</td><td>{{fullAddress}}</td></tr><tr><td class='label'>Email</td><td>{{email}}</td></tr><tr><td class='label'>Phone</td><td>{{phone}}</td></tr></table><div class='formInfo'>Form 01: Recall Roster Details</div><div id='printTime' class='formInfo'>Printed:  ${timeStamp}</div><script>${vueData}</script></body></html>`;
  htmlForm[2] = (vueData, timeStamp) => `${htmlHead}${htmlStyle}<body><div id='dataForm'><table><tr><th class='formTitle' colspan=2>Mailing Address</th></tr><tr><td class='label' class=>Name</td class=><td>{{fullName}}</td></tr><tr><td class='label' class=>Address</td class=><td>{{street}}<br>{{city}}, {{state}}  {{zip}}</td></tr></table><div class='formInfo'>Form 02: Mailing Address</div><div id='printTime' class='formInfo'>Printed:  ${timeStamp}</div><script>${vueData}</script></body></html>`;
  htmlForm[3] = (vueData, timeStamp) => `${htmlHead}${htmlStyle}<body><div id='dataForm'><table><tr><th class='formTitle' colspan='2' >Contact Methods</th></tr><tr><td class='label'>Employee</td><td>{{fullName}}</td></tr><tr><td class='label'>Email</td><td>{{email}}</td></tr><tr><td class='label'>Phone</td><td>{{phone}}</td></tr></table><div class='formInfo'>Form 03: Contact Methods</div><div id='printTime' class='formInfo'>Printed:  ${timeStamp}</div><script>${vueData}</script></body></html>`;

  try {
    const filledForm = [];
    const printTime = new Date();
    const vueData = data.map(createVueObject).join('');
    let thisForm = "";
    htmlForm.forEach((value, index) => {
      filledForm[index] = htmlForm[index](vueData, printTime);
      thisForm = "Form0" + index;

    });

    // -----form00-----
    filledForm[0] = htmlForm[0](vueData, printTime);
    thisForm = "Form00.html";

    try {
      const params0 = {
        Bucket: s3bucket,
        Key: thisForm,
        Body: filledForm[0],
        ContentLength: filledForm[0].length,
        ContentType: 'text/html'
      };
      const putresult0 = await s3.putObject(params0).promise();
      console.log("Successfully put " + thisForm + " (Length: " + filledForm[0].length + ")");
    }
    catch (error) {
      console.log("ERR==>" + error);
      return;
    }

    // -----form01-----
    filledForm[1] = htmlForm[1](vueData, printTime);
    thisForm = "Form01.html";

    try {
      const params1 = {
        Bucket: s3bucket,
        Key: thisForm,
        Body: filledForm[1],
        ContentType: 'text/html'
      };
      const putresult1 = await s3.putObject(params1).promise();
      console.log("Successfully put " + thisForm);
    }
    catch (error) {
      console.log("ERR==>" + error);
      return;
    }

    // -----form02-----
    filledForm[2] = htmlForm[2](vueData, printTime);
    thisForm = "Form02.html";

    try {
      const params2 = {
        Bucket: s3bucket,
        Key: thisForm,
        Body: filledForm[2],
        ContentType: 'text/html'
      };
      const putresult2 = await s3.putObject(params2).promise();
      console.log("Successfully put " + thisForm);
    }
    catch (error) {
      console.log("ERR==>" + error);
      return;
    }
    // -----form03-----
    filledForm[3] = htmlForm[3](vueData, printTime);
    thisForm = "Form03.html";

    try {
      const params3 = {
        Bucket: s3bucket,
        Key: thisForm,
        Body: filledForm[3],
        ContentType: 'text/html'
      };
      const putresult3 = await s3.putObject(params3).promise();
      console.log("Successfully put " + thisForm);
    }
    catch (error) {
      console.log("ERR==>" + error);
      return;
    }
    
  }
  catch (error) {
    console.log('Error generating form -> ', error);
  }
  
  return {"statusCode":200};
};
