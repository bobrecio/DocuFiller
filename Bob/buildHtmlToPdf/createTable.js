const fs = require('fs');
// JSON data
const data = require('./data.json');
// Build paths
const {buildPathHtml} = require("./buildPaths");

const createRow = (item) => `
    <tr>
        <td>${item.invoiceId}</td>
        <td>${item.invoiceName}</td>
        <td>${item.price}</td>
        <td>${item.createdDate}</td>
        <td>${item.dueDate}</td>
        <td>${item.address}</td>
        <td>${item.companyName}</td>
    </tr>
`;

const createTable = (rows) =>`
    <table>
        <tr>
            <th>Invoice ID</th>
            <th>Invoice Name</th>
            <th>Price</th>
            <th>Invoice Created</th>
            <th>Due Date</th>
            <th>Vendor Address</th>
            <th>Vendor Name</th>
        </tr>
        ${rows}
    </table>
`;

const createHtml = (table) => `
  <html>
    <head>
      <style>
        table {
          width: 100%;
        }
        tr {
          text-align: left;
          border: 1px solid black;
        }
        th, td {
          padding: 15px;
        }
        tr:nth-child(odd) {
          background: #CCC
        }
        tr:nth-child(even) {
          background: #FFF
        }
        .no-content {
          background-color: red;
        }
      </style>
    </head>
    <body>
      ${table}
    </body>
  </html>
`;

const doesFileExist = (filePath) => {
    try {
        fs.statSync(filePath);
        return true;
    } catch (error) {
        return false;
    }
};

try {
    // NOTE: this if-block is not requred 
    //   because fs.writeFileSync will 
    //   overwrite any existing file
    if (doesFileExist(buildPathHtml)){
        console.log('Deleting old build file');
        fs.unlinkSync(buildPathHtml);
    }
    const rows = data.map(createRow).join('');
    const table = createTable(rows);
    const html = createHtml(table);

    fs.writeFileSync(buildPathHtml, html);
    console.log('Succesfully created an HTML table');
} catch (error) {
    console.log('Error generating table', error);
}

