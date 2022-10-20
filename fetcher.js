// Learn in class today 
const request = require('request');
const fs = require('fs');
// install npm install prompt-sync
const prompt = require('prompt-sync')();
//install npm npm i is-valid-path 
const isValid = require('is-valid-path');

const arrArgs = process.argv.slice(2);
const url = arrArgs[0];
const filePath = arrArgs[1];

//tell the user if the path invalid 

const fetcher = function () {
  if (!isValid(filePath)) {
    console.log(`File Path is invalid!`)
    process.exit();
    }
// if it already exists overwrite it
  if (fs.existsSync(filePath)){
    const answer = prompt("File Already Exists, would you like to overwrite it? (Y/N)");
    if (answer !== 'Y') return process.exit(); 
  }

  //tell the user if the URL is invalid
  request(url, (error, response, body) => {
    if (error) {
      return console.log(`URL is Invalid\n. ${error}.`);
    }
    
    if (response < 200 || response >= 300) {
      return console.log(console.log('statusCode:', response && response.statusCode));
    }

    fs.writeFile(filePath, body, err => {
      if (err) return console.log(err);
    });

    console.log(`Downloaded and saved ${body.length} bytes to ${filePath}.`)
  });

};

fetcher();