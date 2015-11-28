//
// Copyright (c) Autodesk, Inc. All rights reserved
//
// Node.js server workflow
// by Philippe Leefsma - ADN/Developer Technical Services
//    Cyrille Fauvel - Autodesk Developer Network (ADN)
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
//
var express =require ('express') ;
//var bodyParser =require ('body-parser') ;

var router =express.Router () ;
//router.use (bodyParser.json ()) ;

// Generates the access token NOT using the 'view-and-data' toolkit
//var request =require ('request') ;
//var config =(require ('fs').existsSync ('routes/credentials.js') ?
//	require('./credentials')
//	: (console.log ('No credentials.js file present, assuming using CONSUMERKEY & CONSUMERSECRET system variables.'), require('./credentials_'))) ;
//router.get ('/token', function (req, res) {
//    request.post (
//        config.Authentication,
//        { form: config.credentials },
//        function (error, response, body) {
//            if ( !error && response.statusCode == 200 )
//                res.send (body) ;
//        }) ;
//}) ;

// Generates the access token USING the 'view-and-data' toolkit
var vad =require ('view-and-data') ;
//var config =require ('../node_modules/view-and-data/config-view-and-data') ;
//config.credentials.ConsumerKey =process.env.CONSUMERKEY || '<replace with your consumer key>' ;
//config.credentials.ConsumerSecret =process.env.CONSUMERSECRET || '<replace with your consumer secret>' ;
var lmv =new vad (/*config*/) ;
router.get ('/token', function (req, res) {
	lmv.getToken ()
		.then (function (data) {
			res.json (data);
		}, function () {
			// errback, executed on rejection
		}) ;
}) ;

module.exports =router ;
