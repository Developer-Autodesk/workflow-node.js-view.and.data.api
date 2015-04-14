#Autodesk view and data API Node.js Basic Sample


##Description


A sample demonstrating how to load a model into web application with the Autodesk View & Data API. This web application has a basic Node.js server and JavaScript/HTML5 client

##Dependencies

Install Node.js on your machine and clone this repo. Download the project' dependencies using npm before running the app by running the following command
```
npm install
```
on the node.js console. This will install the following node.js modules in the project.
- express
- request
- serve-favicon

This sample does not includes the workflow of uploading models. It depends on other workflow samples to upload models, get model URN. Please follow Setup/Usage Instructions.

##Setup/Usage Instructions

You can work with production or staging Autodesk View and Data environments. By default, the project is setup with the production server.

With the production server, you got 2 options to setup and run this sample.
 
### Option A: Use [upload tool](http://still-spire-1606.herokuapp.com) online service to upload model. 

*	The [upload tool](http://still-spire-1606.herokuapp.com) provides some existing models. Choose any one of them, or upload one of your own models with [upload tool](http://still-spire-1606.herokuapp.com). The [upload tool](http://still-spire-1606.herokuapp.com) will generate a URN of the model that you need later.
*	Copy this URN in /www/views/index.js at line #18 <br />
  ```
  var urnprod = 'your_urn_here';
  ```
*	In /www/views/index.js, at line #36, change value of tokenurl to the access token you can generate from  'http://still-spire-1606.herokuapp.com/api/rawtoken'
*	Run the server from the Node.js console, by running the follwing command: <br />
  ```
  node server.js
  ```
*	Connect to server locally using a WebGL-compatible browser: [http://localhost:3000/node/basic](http://localhost:3000/node/basic)

### Option B: Use your own credentials and upload models on your account
 
*	Apply your own credentials from [http://developer.autodesk.com](http://developer.autodesk.com)
*	Replace the place holder with your own keys in credentials.js, line #23 and #25 <br />
  ```
  credentials.ClientId = '<replace with clientId>';
  
  credentials.ClientSecret = '<replace with clientSecret>';
  ```
*	Upload one of your model in your account and get its URN using other workflow sample,for example, [this workflow sample in .net winform application](https://github.com/Developer-Autodesk/workflow-dotnet-winform-view.and.data.api/) if you are using windows or [this workflow sample in Mac OS Swift](https://github.com/Developer-Autodesk/workflow-macos-swift-view.and.data.api) if you are using Mac. 
*	Copy this URN in /www/views/index.js at line #18 <br />
  ```
  var urnprod = 'your_urn_here';
  ```
*	Run the server from the Node.js console, by running the follwing command: <br />
  ```
  node server.js
  ```
*	Connect to server locally using a WebGL-compatible browser: [http://localhost:3000/node/basic](http://localhost:3000/node/basic)

#### To work with the staging environment, you need to use Option B. 
*	Apply your own credentials from [http://developer-stg.autodesk.com](http://developer-stg.autodesk.com)
*	Replace the place holder with your own keys in credentials-stg.js, line #23 and #25 <br />
  ```
  credentials.ClientId = '<replace with clientId>';
  
  credentials.ClientSecret = '<replace with clientSecret>';
  ```
*	Upload one of your model in your account and get its URN using other workflow sample,for example, [this workflow sample in .net winform application](https://github.com/Developer-Autodesk/workflow-dotnet-winform-view.and.data.api/) if you are using windows or [this workflow sample in Mac OS Swift](https://github.com/Developer-Autodesk/workflow-macos-swift-view.and.data.api) if you are using Mac. But please use [staging URL](https://developer-stg.api.autodesk.com) to proceed with the workflows.
*	Copy this URN in /www/views/index.js at line #19 <br />
  ```
  var urnstg = 'your_urn_here';
  ```
*	In /www/views/index.js, around line #24, make sure the variable staging is true. 
*	In /www/views/index.html (line $33 and #34), use viewer3D.min.js and style.css from the staging environment <br />
  ```
  <link type="text/css" rel="stylesheet" href="https://developer-stg.api.autodesk.com/viewingservice/v1/viewers/style.css"/>
  
  <script src="https://developer-stg.api.autodesk.com/viewingservice/v1/viewers/viewer3D.min.js"></script>
  ```
*	Run the server from the Node.js console, by running the follwing command: <br />
  ```
  node server.js
  ```
*	Connect to server locally using a WebGL-compatible browser: [http://localhost:3000/node/basic](http://localhost:3000/node/basic)


## License

That samples are licensed under the terms of the [MIT License](http://opensource.org/licenses/MIT). Please see the [LICENSE](LICENSE) file for full details.

## Written by 

Written by [Philippe Leefsma](http://adndevblog.typepad.com/cloud_and_mobile/philippe-leefsma.html)  

