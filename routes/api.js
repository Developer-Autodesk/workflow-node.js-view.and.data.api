/////////////////////////////////////////////////////////////////////////////////
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
/////////////////////////////////////////////////////////////////////////////////
var credentials = require('../credentials');

var express = require('express');
var request = require('request');

var router = express.Router();

///////////////////////////////////////////////////////////////////////////////
// Generates access token
///////////////////////////////////////////////////////////////////////////////
router.get('/token', function (req, res) {
    var params = {
        client_id: credentials.ClientId,
        client_secret: credentials.ClientSecret,
        grant_type: 'client_credentials'
    }

    request.post(
        credentials.BaseUrl + '/authentication/v1/authenticate',
        { form: params },

        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body);
            }
        });
});

module.exports = router;
