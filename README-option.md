# Autodesk View and Data API Node.js Basic Sample


## Description
A sample demonstrating how to view a model in a web application with the Autodesk View & Data API. This web application has a basic Node.js 
server and JavaScript/HTML5 client. This sample does not demonstrate how to upload a model to the Autodesk server for translation. See instructions below 
to prepare a model to be consumed in this sample.


## Dependencies
Install Node.js on your machine and clone this repo. Download the project dependencies using npm before running the app by running 
the following command in the project root directory
```
npm install
```
on the node.js console. This will install the following node.js modules in the project:
- express
- request
- serve-favicon

This sample does not include the workflow of uploading models. on the server It depends on other workflow samples to upload models and 
get model URNs - as explained in the Setup/Usage Instructions.


## Setup/Usage Instructions
 
* From the sample root folder, rename or copy the ./credentials_.js file into ./credentials.js <br />
  * Windows <br />
    ```
    copy credentials_.js credentials.js 
	```
  * OSX/Linux <br />
    ```
    cp credentials_.js credentials.js  
	```
* The [upload tool](http://still-spire-1606.herokuapp.com) provides some existing models. Choose any one of them, or upload one of your own
  models with [upload tool](http://still-spire-1606.herokuapp.com). The [upload tool](http://still-spire-1606.herokuapp.com) will generate a URN of the model that you need later.
* Copy the URN which was generated in the previous step in file /www/index.js at line #18 <br />
  ```
  var defaultUrn = '<replace with your encoded urn>';
  ```
* In /www/index.js, at line #21, replace the entire line by the following code: <br />
  ```
  var tokenurl ='http://still-spire-1606.herokuapp.com/api/rawtoken';
  ```
* Run the server from the Node.js console, by running the following command: <br />
  ```
  node server.js
  ```
* Connect to you local server using a WebGL-compatible browser: [http://localhost:3000/](http://localhost:3000/)


## License

That samples are licensed under the terms of the [MIT License](http://opensource.org/licenses/MIT). Please see the [LICENSE](LICENSE) file for full details.


## Written by 

Written by [Philippe Leefsma](http://adndevblog.typepad.com/cloud_and_mobile/philippe-leefsma.html)  <br />
(Autodesk Developer Network)
