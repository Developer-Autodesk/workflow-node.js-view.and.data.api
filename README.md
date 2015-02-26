#Autodesk view and data API Node.js Basic Sample


##Description


A sample demonstrating how to load a model into web application with the Autodesk View & Data API. This web application has a basic Node.js server and JavaScript/HTML5 client

##Dependencies

*	Install these packages with npm before running the app by running "npm install" command from the server directory.
- express
- request
- serve-favicon

*	This sample does not includes the workflow of uploading models. It depends on other workflow samples to upload models, get model URN. Please follow Setup/Usage Instructions.

##Setup/Usage Instructions

You can work with production or staging environment of Autodesk View and Data.

To work with production, there are 2 options to setup and run this sample
 
Option A: Use [upload tool](http://still-spire-1606.herokuapp.com) online service to upload model. 

*	Install Node.js
*	Run "npm install" command from the server directory to install the necessary packages which are mentioned in Dependencies.
*	The [upload tool](http://still-spire-1606.herokuapp.com) provides some existing models. Choose any one of them.
    Or upload one of your own models with [upload tool](http://still-spire-1606.herokuapp.com)
*	The [upload tool](http://still-spire-1606.herokuapp.com) will generate the URN of the model
*	Copy this URN in /www/views/index.js, around line #20, replace the value for "urnprod".
*	In /www/views/index.js, around line #28, make sure the variable staging is false. 
*	In /www/views/index.js, around line #31, change value of tokenurl to the token service 'http://still-spire-1606.herokuapp.com/api/rawtoken'
*	In /www/views/index.html, use viewer3D.min.js and style.css from production environment 
*	Run the server: "node server.js" from command line
*	Connect to server locally using a WebGL-compatible browser: http://localhost:3000/node/basic

Option B: Use your own credentials and upload models on your account
 
*	Apply your own credentials from http://developer.autodesk.com 
*	Install Node.js
*	Run "npm install" command from the server directory to install the necessary packages which are mentioned in Dependencies.
*	Replace the place holder with your own credentials in credentials.js
*	Upload one of your model in your account and get its URN using other workflow sample,for example, [this workflow sample in .net winform application](https://github.com/Developer-Autodesk/workflow-dotnet-winform-view.and.data.api/) if you are using windows or [this workflow sample in Mac OS Swift](https://github.com/Developer-Autodesk/workflow-macos-swift-view.and.data.api) if you are using Mac. 
*	Get your model urn from the workflow sample, and copy this URN in /www/views/index.js, replace the one for "urnprod", around line #20.
*	In /www/views/index.js, around line #28, make sure the variable staging is false. 
*	In /www/views/index.js, around line #31, change value of tokenurl to get token through Node.js server
*	In /www/views/index.html, use viewer3D.min.js and style.css from production environment  
*	Run the server: "node server.js" from command line
*	Connect to server locally using a WebGL-compatible browser: http://localhost:3000/node/basic

To work with staging, only option B is available currently. 
*	Apply your own credentials from http://developer-stg.autodesk.com 
*	Install Node.js
*	Run "npm install" command from the server directory to install the necessary packages which are mentioned in Dependencies..
*	Replace the place holder with your own credentials in credentials-stg.js
*	Upload one of your model in your account and get its URN using other workflow sample,for example, [this workflow sample in .net winform application](https://github.com/Developer-Autodesk/workflow-dotnet-winform-view.and.data.api/) if you are using windows or [this workflow sample in Mac OS Swift](https://github.com/Developer-Autodesk/workflow-macos-swift-view.and.data.api) if you are using Mac. But please use [staging URL](https://developer-stg.api.autodesk.com) to proceed the workflow.
*	Get your model urn from the workflow sample, and copy this URN in /www/views/index.js, replace the one for "urnstg", around line #23.
*	In /www/views/index.js, around line #28, make sure the variable staging is true. 
*	In /www/views/index.js, around line #31, change value of tokenurl to get token through Node.js server
*	In /www/views/index.html, use viewer3D.min.js and style.css from staging environment  
*	Run the server: "node server.js" from command line
*	Connect to server locally using a WebGL-compatible browser: http://localhost:3000/node/basic	


## License

That samples are licensed under the terms of the [MIT License](http://opensource.org/licenses/MIT). Please see the [LICENSE](LICENSE) file for full details.

##Written by 

Written by [Philippe Leefsma](http://adndevblog.typepad.com/cloud_and_mobile/philippe-leefsma.html)  

