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

// The following code relies on the Autodesk.ADN.Toolkit.Viewer.AdnViewerManager
// For an example using the Autodesk API without the toolkit see 'index-pure.js'.

$(document).ready (function () {
    // Instantiate viewer factory
    var viewerFactory =new Autodesk.ADN.Toolkit.Viewer.AdnViewerFactory (
		'http://' + window.location.host + '/api/token',
		{ 'environment': 'AutodeskProduction' }
	) ;

    // Allows different urn to be passed as url parameter
    var paramUrn =Autodesk.Viewing.Private.getParameterByName ('urn') ;
    var urn =(paramUrn !== '' ? paramUrn : defaultUrn) ;
    viewerFactory.getViewablePath (
		urn,
        function(pathInfoCollection) {
            var viewerConfig ={ viewerType: 'GuiViewer3D' } ;
            var viewer =viewerFactory.createViewer ($('#viewer') [0], viewerConfig) ;
            viewer.load (pathInfoCollection.path3d [0].path) ;
        },
		function (error) {
				console.info ("Load Error: " + error) ;
		}
	) ;

}) ;
