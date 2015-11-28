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
//var defaultUrn ='<replace with your encoded urn>' ;
var defaultUrn ='dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Y3lyaWxsZS0yMDE1MTAxNS9QaWVyOS5kd2Z4' ;

// The following code does NOT rely on the Autodesk.ADN.Toolkit.Viewer.AdnViewerManager
// and uses the Autodesk API directly.

$(document).ready (function () {

	var getToken =function () {
		var xhr =new XMLHttpRequest () ;
		xhr.open ("GET", 'http://' + window.location.host + '/api/token', false) ;
		xhr.send (null) ;
		var response =JSON.parse (xhr.responseText) ;
		return (response.access_token) ;
	}

	function initializeViewer (containerId, documentId, role) {
		var viewerContainer =$('#' + containerId) ;
		var viewer =new Autodesk.Viewing.Private.GuiViewer3D (viewerContainer [0]) ;
		viewer.start () ;

		Autodesk.Viewing.Document.load (
			'urn:' + documentId,
			function (document) {
				var rootItem =document.getRootItem () ;
				var geometryItems =Autodesk.Viewing.Document.getSubItemsWithProperties (
					rootItem,
					{ 'type': 'geometry', 'role': role },
					true
				) ;
				viewer.load (document.getViewablePath (geometryItems [0])) ;
			},
			function (msg) {
				console.log ("Error loading document: " + msg) ;
			}
		);
	}

	function initialize () {
		var options ={
			env: "AutodeskProduction",
			getAccessToken: getToken,
			refreshToken: getToken
		} ;
		Autodesk.Viewing.Initializer (options, function () {
			initializeViewer ('viewer', defaultUrn, '3d') ;
		}) ;
	}

	initialize () ;
}) ;
