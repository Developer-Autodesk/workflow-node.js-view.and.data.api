//
// Copyright (c) Autodesk, Inc. All rights reserved
//
// Node.js server workflow
// by Cyrille Fauvel - Autodesk Developer Network (ADN)
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

define ([ 'domReady!', 'threejs', 'viewer3d', 'viewer', 'app' ],
	function (doc, t, v3d, v, app) {
		//'use strict';

		// If not using shim, you can do this instead.

		//require ([ 'viewer3d' ],
		//	function (viewer3d) { // will be undefined
		//		Autodesk =window.Autodesk ;
		//		require ([ 'IoTTool', 'viewer' ],
		//			function (iot, viewer) {
		//				app.initialize ($('#viewer'), 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Y3lyaWxsZS0yMDE1MTAxNS9QaWVyOS5kd2Z4', true) ;
		//			}
		//		) ;
		//	}
		//) ;

		// Allows different urn to be passed as url parameter
		var paramUrn =GetURLParameter ('urn') ;
		var urn =(paramUrn !== undefined ? paramUrn : defaultUrn) ;
		// Initialize our viewer instance
		app.initialize ($('#viewer'), urn, true) ; // true = with toolbars

		function GetURLParameter (sParam) {
			var sPageURL =window.location.search.substring (1) ;
			var sURLVariables =sPageURL.split ('&') ;
			for ( var i =0 ; i < sURLVariables.length ; i++ ) {
				var sParameterName =sURLVariables [i].split ('=') ;
				if ( sParameterName [0] == sParam )
					return (sParameterName [1]) ;
			}
		}

	}
) ;
