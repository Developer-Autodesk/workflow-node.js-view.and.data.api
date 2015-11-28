<b>Note:</b> This repo is also used by our [tutorial material](https://github.com/Developer-Autodesk/tutorial-getting.started-view.and.data). If you are following instructions 
from our tutorial, please ignore the instructions below.


# Autodesk View and Data API Node.js Basic Sample


[![build status](https://api.travis-ci.org/Developer-Autodesk/workflow-node.js-view.and.data.api.png)](https://travis-ci.org/Developer-Autodesk/workflow-node.js-view.and.data.api)



## Description
This sample demonstrates how to view a model in a web application with the Autodesk View & Data API.
This web application implements a basic Node.js server and JavaScript/HTML5 client. It does not demonstrate
how to upload a model to the Autodesk server for translation.
See instructions below on how to prepare a model to be consumed in this sample.


## Dependencies
Install [Node.js](http://nodejs.org/) on your machine and clone this repo. Download the project dependencies
using npm by running the following command in the project root directory:
```
npm install
```
This will install the following node.js modules in the project:
```
"serve-favicon": ">= 2.2.0",
"express": ">= 4.12.3",
"request": ">= 2.55.0",
"view-and-data": "^1.0.6",
"bower": "^1.6.5"
```

## Setup/Usage Instructions

### Setup the sample with your API keys

* Apply for your own credentials (API keys) from [developer.autodesk.com](http://developer.autodesk.com)

* There is 3 ways to setup the sample with your API keys

  1. Edit the routes/credentials.js file
  2. Edit the routes/api.js file
  3. Edit the node_modules/view-and-data/config-view-and-data.js file (avoid that option)
  4. Set environment variables
     ```
     set CONSUMERKEY=<put your consumer key here>
     set CONSUMERSECRET=<put your consumer secret here>
     ```

### Upload a model to be consumed by this sample

The simplest way to get a model ready is to use this [service](http://model.autodesk.io/).
Enter your API keys, uplaod a model, wait for the model to be translated, and copy the resulting URN.

### Setup the sample with your URN
 
* Copy the URN which was generated in the previous step in files
  - /www/index.js at line #21
  - /www/index-old.js at line #21
  - /www/index-pure.js at line #21
  - /www/requirejs/app-init.js at line #21
  ```
  var defaultUrn = '<replace with your encoded urn>';
  ```

Note: the URN needs to be base64 encoded as mentioned [here](https://developer.autodesk.com/api/view-and-data-api/) under
"Step 6: Register Your Data with the Viewing Services"

### Usage

* Run the server from the Node.js console, by running the following command: <br />
  ```
  node start.js
  ```
  or
  ```
  npm start
  ```
* Connect to you local server using a WebGL-compatible browser: [http://localhost:3000/](http://localhost:3000/)

  1. [index.html](http://localhost:3000/index.html) is a version which uses the new view-and-data-toolkit
     you can install use bower.
     ```
     bower install view-and-data-toolkit --save
     ```
  2. [index-old.html](http://localhost:3000/index-old.html) is the older version of the view-and-data-toolkit
     which is accessed directly from [github](https://github.com/Developer-Autodesk/library-javascript-view.and.data.api).
  3. [index-pure.html](http://localhost:3000/index-pure.html) is a version using the View & Data API without
     the toolkit. Pure because it is raw API.
  4. [index-requirejs.html](http://localhost:3000/index-requirejs.html) is a version that uses [require.js](http://requirejs.org/)
     to manage javascript modules using the latest view-and-data-toolkit (1).

Note: the 4 html/js do exactly the same thing. Only the coding is different.


## License

That samples are licensed under the terms of the [MIT License](http://opensource.org/licenses/MIT).
Please see the [LICENSE](LICENSE) file for full details.


## Written by 

[Philippe Leefsma](http://adndevblog.typepad.com/cloud_and_mobile/philippe-leefsma.html), Autodesk Developer Network.

and Cyrille Fauvel (Autodesk Developer Network) <br />
    http://www.autodesk.com/adn <br />
    http://around-the-corner.typepad.com/ <br />

