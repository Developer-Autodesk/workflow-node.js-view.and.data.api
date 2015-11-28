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
var favicon =require ('serve-favicon') ;

var api =require ('./api') ;

// website/webservice definition
var app =express () ;
//app.use (bodyParser.urlencoded ({ extended: false })) ;
app.use (express.static (__dirname + '/../www')) ;
app.use (favicon (__dirname + '/../www/images/favicon.ico')) ;
app.use ('/api', api) ;
//app.use (function (req, res, next) {
//	res.header ("Access-Control-Allow-Origin", "*") ;
//	res.header ("Access-Control-Allow-Headers", "X-Requested-With") ;
//	next () ;
//}) ;
app.set ('port', process.env.PORT || 3000) ;

module.exports =app ;