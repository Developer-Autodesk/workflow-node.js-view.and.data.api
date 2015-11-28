///////////////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved 
// Written by Philippe Leefsma 2014 - ADN/Developer Technical Services
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

///////////////////////////////////////////////////////////////////////////////
// Namespace declaration
//
///////////////////////////////////////////////////////////////////////////////
AutodeskNamespace("Autodesk.ADN.Toolkit.Viewer");

///////////////////////////////////////////////////////////////////////////////
// Autodesk.ADN.Toolkit.Viewer.ViewerFactory
//
///////////////////////////////////////////////////////////////////////////////
Autodesk.ADN.Toolkit.Viewer.ViewerFactory = function (
    tokenOrUrl,
    factoryConfig) {

    var _initialized = false;

    var _onInitialized = null;

    ///////////////////////////////////////////////////////////////////////////
    // Check if string is a valid url
    //
    ///////////////////////////////////////////////////////////////////////////
    function validateURL(str) {

        return (str.indexOf('http:') > -1 || str.indexOf('https:') > -1);
    }

    ///////////////////////////////////////////////////////////////////////////
    // Generates new random guid
    //
    ///////////////////////////////////////////////////////////////////////////
    function guid() {

        var d = new Date().getTime();

        var guid = 'xxxx-xxxx-xxxx-xxxx-xxxx'.replace(
            /[xy]/g,
            function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
            });

        return guid;
    };

    ///////////////////////////////////////////////////////////////////////////
    // Gets object property by name, returning default if prop doesnt exist
    //
    ///////////////////////////////////////////////////////////////////////////
    function getPropertyWithDefault(object, propName, defaultValue) {

        if (object && object.hasOwnProperty(propName)) {

            return object[propName];
        }

        return defaultValue;
    }

    ///////////////////////////////////////////////////////////////////////////
    // Initializes options
    //
    ///////////////////////////////////////////////////////////////////////////
    function initializeOptions() {

        var options = {

            env: getPropertyWithDefault(
                factoryConfig,
                'environment',
                'AutodeskProduction')
        };

        // initialized with getToken callback
        if (validateURL(tokenOrUrl)) {

            var getToken = function () {

                var xhr = new XMLHttpRequest();

                xhr.open("GET", tokenOrUrl, false);
                xhr.send(null);

                var response = JSON.parse(
                    xhr.responseText);

                return response.access_token;
            }

            options.getAccessToken = getToken;

            options.refreshToken = getToken;
        }

        // initialized with access token
        else {

            options.accessToken = tokenOrUrl;
        }

        return options;
    }

    ///////////////////////////////////////////////////////////////////////////
    // Internal Initializer
    //
    ///////////////////////////////////////////////////////////////////////////
    function initialize() {

        var options = initializeOptions();

        Autodesk.Viewing.Initializer(options, function () {

            _initialized = true;

            if(_onInitialized) {

                _onInitialized();
            }
        });
    }

    ///////////////////////////////////////////////////////////////////////////
    // Initialized callback
    //
    ///////////////////////////////////////////////////////////////////////////
    this.onInitialized = function(callback) {

        if(_initialized) {

            callback()
        }
        else {

            _onInitialized = callback;
        }
    }

    ///////////////////////////////////////////////////////////////////////////
    // Get 2d and 3d viewable path
    //
    ///////////////////////////////////////////////////////////////////////////
    this.getViewablePath = function (urn, onSuccess, onError) {

        if(!_initialized) {
            onError({
                error: 'Factory not initialized. ' +
                'Need to subscribe to onInitialized callback'
            });

            return;
        }

        if (urn.indexOf('urn:') !== 0)
            urn = 'urn:' + urn;

        Autodesk.Viewing.Document.load(
            urn,
            function (document) {

                var pathCollection = {

                    path2d: [],
                    path3d: []
                }

                var items2d = Autodesk.Viewing.Document.getSubItemsWithProperties(
                    document.getRootItem(),
                    {
                        'type': 'geometry',
                        'role': '2d'
                    },
                    true);

                for (var i =0; i<items2d.length; ++i) {

                    pathCollection.path2d.push({
                            name : items2d[i].name,
                            path: document.getViewablePath(items2d[i])
                        });
                }

                var items3d = Autodesk.Viewing.Document.getSubItemsWithProperties(
                    document.getRootItem(),
                    {
                        'type': 'geometry',
                        'role': '3d'
                    },
                    true);

                for (var i =0; i<items3d.length; ++i) {

                    pathCollection.path3d.push({
                            name : items3d[i].name,
                            path: document.getViewablePath(items3d[i])
                        });
                }

                onSuccess(pathCollection);
            },
            function (error) {

                onError(error);
            }
        );
    };

    ///////////////////////////////////////////////////////////////////////////
    // Creates new viewer div element
    //
    ///////////////////////////////////////////////////////////////////////////
    function createViewerDiv(container) {

        var id = guid();

        var viewerDiv = document.createElement("div");

        viewerDiv.id = id;

        viewerDiv.style.height = "100%";

        container.appendChild(viewerDiv);

        // disable default context menu on viewer div

        viewerDiv.addEventListener("contextmenu",
          function (e) {
                e.preventDefault();
            });

        // disable scrolling on DOM document
        // while mouse pointer is over viewer area

        viewerDiv.addEventListener("mouseover",
          function (e) {
              var x = window.scrollX;
              var y = window.scrollY;
              window.onscroll = function () {
                  window.scrollTo(x, y);
              };
          });

        viewerDiv.addEventListener("mouseout",
          function (e) {
              window.onscroll = null;
          });

        return viewerDiv;
    };

    ///////////////////////////////////////////////////////////////////////////
    //
    //
    ///////////////////////////////////////////////////////////////////////////
    this.createViewer = function (container, viewerConfig) {

        var viewer = null;

        var viewerDiv = createViewerDiv(container);

        switch(getPropertyWithDefault(viewerConfig, 'viewerType', 'GuiViewer3D')) {

            case 'GuiViewer3D':
                viewer = new Autodesk.Viewing.Private.GuiViewer3D(
                    viewerDiv);
                break;

            case 'Viewer3D':
                viewer = new Autodesk.Viewing.Viewer3D(
                    viewerDiv);
                break;

            default:

                console.log("Warning: viewerType not specified or incorrect in config, using Viewer3D");
                console.log("Valid values: {Viewer3D, GuiViewer3D}");

                viewer = new Autodesk.Viewing.Viewer3D(
                  viewerDiv);
                break;
        }

        viewer.start();

        viewer.setProgressiveRendering(
            getPropertyWithDefault(
                viewerConfig,
                'progressiveRendering',
                true));

        var qualityLevel = getPropertyWithDefault(
            viewerConfig,
            'qualityLevel',
            [true, true]);

        viewer.setQualityLevel(
            qualityLevel[0],
            qualityLevel[1]);

        viewer.impl.setLightPreset(
            getPropertyWithDefault(
                viewerConfig,
                'lightPreset', 8)
        );

        var bkColor = getPropertyWithDefault(
            viewerConfig,
            'backgroundColor',
            [3,4,5, 250, 250, 250]);

        viewer.setBackgroundColor(
            bkColor[0], bkColor[1], bkColor[2],
            bkColor[3], bkColor[4], bkColor[5]);

        viewer.setDefaultNavigationTool(
            getPropertyWithDefault(
                viewerConfig,
                'navigationTool',
                'freeorbit'));

        viewer.addEventListener(

            Autodesk.Viewing.GEOMETRY_LOADED_EVENT,

            function(event) {

                viewer.fitToView(false);
            });

        return viewer;
    }

    ///////////////////////////////////////////////////////////////////////////
    //
    //
    ///////////////////////////////////////////////////////////////////////////
    initialize();
}