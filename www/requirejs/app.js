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
define (
	[],
	function () {
		return ({
			'initialize': function (viewerElt, urn, bWithToolbars, env) {
				bWithToolbars =bWithToolbars || false ;
				env =env || 'AutodeskProduction' ;
				var viewerFactory =new Autodesk.ADN.Toolkit.Viewer.ViewerFactory (
					'http://' + window.location.host + '/api/token',
					{ 'environment': env }
				) ;
				viewerFactory.onInitialized (function () {
					viewerFactory.getViewablePath (
						urn,
						function (pathCollection) {
							var oViewer =viewerFactory.createViewer (
								$(viewerElt) [0],
								{
									lightPreset: 8,
									viewerType: (bWithToolbars ? 'GuiViewer3D' : 'Viewer3D'),
									qualityLevel: [ true, true ],
									navigationTool: 'freeorbit',
									progressiveRendering: true
								}
							) ;
							// loads the first 3d or 2d path available
							if ( pathCollection.path3d.length > 0 )
								oViewer.load (pathCollection.path3d [0].path) ;
							else if ( pathCollection.path2d.length > 0 )
								oViewer.load (pathCollection.path2d [0].path) ;
							else
								return (alert ('ERROR: No 3D or 2D view found in this document!')) ;
						},
						function (error) {
							console.info ("Load Error: " + error) ;
						}
					) ;
				}) ;
				return (viewerFactory) ;
			}

		}) ;
	}

) ;
