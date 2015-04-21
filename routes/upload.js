///////////////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Cyrille Fauvel, 2015 - ADN/Developer Technical Services
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
///////////////////////////////////////////////////////////////////////////////

var express =require ('express') ;
var bodyParser =require ('body-parser') ;
var formidable = require('formidable')
var fs =require ('fs') ;
var async =require ('async') ;
var lmv =require ('./lmv.js') ;

var router =express.Router () ;
router.use (bodyParser.json ()) ;

router.post ('/file', function (req, res) {
	/*req
		.pipe (fs.createWriteStream ('data/' + req.headers ['x-file-name']))
		.on ('finish', function (err) {
			res.json ({ 'name': req.headers ['x-file-name'] }) ;
		})
		.on ('error', function (err) {
			res.status (500).end () ;
		})
	;*/
	var filename ='' ;

	var form =new formidable.IncomingForm () ;
	form.uploadDir ='data' ;
	form
		.on ('field', function (field, value) {
			console.log (field, value) ;
		})
		.on ('file', function (field, file) {
			console.log (field, file) ;
			fs.rename (file.path, form.uploadDir + '/' + file.name) ;
			filename =file.name ;
		})
		.on ('end', function () {
			console.log ('-> upload done') ;
			if ( filename == '' )
				res.status (500).end ('No file submitted!') ;
			res.json ({ 'name': filename }) ;
		})
	;
	form.parse(req);
}) ;

router.post ('/translate', function (req, res) {
	var filename ='data/' + req.body.name ;
	var bucket =
		'model'
		+ new Date ().toISOString ().replace (/T/, '-').replace (/:+/g, '-').replace (/\..+/, '')
		+ '-' + lmv.Lmv.getToken ().toLowerCase ().replace (/\W+/g, '') ;
	var policy ='transient' ;

	async.waterfall ([
		function (callbacks1) {
			console.log ('createBucketIfNotExist') ;
			new lmv.Lmv (bucket).createBucketIfNotExist (policy)
				.on ('success', function (data) {
					console.log ('Bucket already or now exist!') ;
					callbacks1 (null, data) ;
				})
				.on ('fail', function (err) {
					console.log ('Failed to create bucket!') ;
					callbacks1 (err) ;
				})
			;
		},

		function (arg1, callbacks2) {
			console.log ('async upload') ;
			new lmv.Lmv (bucket).uploadFile (filename)
				.on ('success', function (data) {
					console.log (filename + ' uploaded.') ;
					callbacks2 (null, data) ;
				})
				.on ('fail', function (err) {
					console.log ('Failed to upload ' + filename + '!') ;
					callbacks2 (err) ;
				})
			;
		},

		function (arg1, callbacks3) {
			console.log ('Launching translation') ;
			var urn =JSON.parse (arg1).objects [0].id ;
			new lmv.Lmv (bucket).register (urn)
				.on ('success', function (data) {
					console.log ('Translation requested.') ;
					callbacks3 (null, data) ;
				})
				.on ('fail', function (err) {
					console.log ('Failed to request translation!') ;
					callbacks3 (err) ;
				})
			;
		}

	], function (err, results) {
		if ( err != null ) {
			if ( err.hasOwnProperty ('statusCode') && err.statusCode != 200 )
				return (res.status (err.statusCode).send (err.body.reason)) ;
			if ( !err.raw_body.hasOwnProperty ('key') )
				return (res.status (500).send ('The server did not return a valid key')) ;
			return (res.status (500).send ('An unknown error occurred!')) ;
		}

		res.json (results) ;
	}) ;

}) ;

router.get ('/translate/:urn/progress', function (req, res) {
	var urn =req.params.urn ;
	new lmv.Lmv ('').status (urn)
		.on ('success', function (data) {
			console.log (data.progress) ;
			res.json (data) ;
		})
		.on ('fail', function (err) {
			res.status (404).end () ;
		})
	;
}) ;

module.exports =router ;