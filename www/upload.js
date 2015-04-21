/////////////////////////////////////////////////////////////////////////////////
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
/////////////////////////////////////////////////////////////////////////////////

var oViewDataClient =null ;

$(document).ready (function () {
	oViewDataClient =new Autodesk.ADN.Toolkit.ViewData.AdnViewDataClient (
		'https://developer.api.autodesk.com',
		'http://' + window.location.host + '/api/token'
	) ;

	$('#btnTranslateThisOne').click (function (evt) {
		var files =document.getElementById('files').files ;
		if ( files.length == 0 )
			return ;
		var bucket =
			'model'
			+ new Date ().toISOString ().replace (/T/, '-').replace (/:+/g, '-').replace (/\..+/, '')
			+ '-' + '<my_consumer_key>'.toLowerCase ().replace (/\W+/g, '') ;

		createBucket (bucket, files)
	}) ;

	$('#btnAddThisOne').click (function (evt) {
		var urn =$('#urn').val ().trim () ;
		if ( urn == '' )
			return ;
		AddThisOne (urn) ;
	}) ;
}) ;

function AddThisOne (urn) {
	var id =urn.replace (/=+/g, '') ;
	$('#list').append ('<div class="list-group-item row">'
			+ '<button id="' + id + '" type="text" class="form-control">' + urn + '</button>'
		+ '</div>'
	) ;
	$('#' + id).click (function (evt) {
		window.open ('/?urn=' + $(this).text (), '_blank') ;
	}) ;
}

function createBucket (bucket, files) {
	var bucketData ={
		bucketKey: bucket,
		servicesAllowed: {},
		policy: 'transient'
	} ;
	oViewDataClient.createBucketAsync (
		bucketData,
		//onSuccess
		function (response) {
			console.log ('Bucket creation successful:') ;
			console.log (response) ;
			$('#msg').text ('Bucket creation successful') ;
			uploadFiles (response.key, files) ;
		},
		//onError
		function (error) {
			console.log ('Bucket creation failed:');
			console.log (error) ;
			$('#msg').text ('Bucket creation failed!') ;
		}
	) ;
}

function uploadFiles (bucket, files) {
	for ( var i =0 ; i < files.length ; i++ ) {
		var file =files [i] ;
		//var filename =file.replace (/^.*[\\\/]/, '') ;
		console.log ('Uploading file: ' + file.name + ' ...') ;
		$('#msg').text ('Uploading file: ' + file.name + ' ...') ;
		oViewDataClient.uploadFileAsync (
			file,
			bucket,
			file.name,
			//onSuccess
			function (response) {
				console.log ('File was uploaded successfully:') ;
				console.log (response) ;
				$('#msg').text ('File was uploaded successfully') ;
				var fileId =response.objects [0].id ;
				var registerResponse =oViewDataClient.register (fileId) ;
				if (   registerResponse.Result === "Success"
					|| registerResponse.Result === "Created"
				) {
					console.log ("Registration result: " + registerResponse.Result) ;
					console.log ('Starting translation: ' + fileId) ;
					$('#msg').text ('Your model was uploaded successfully. Translation starting...') ;
					checkTranslationStatus (
						fileId,
						1000 * 60 * 5, // 5 mins timeout
						//onSuccess
						function (viewable) {
							console.log ("Translation was successful: " + response.file.name) ;
							console.log ("Viewable: ") ;
							console.log (viewable) ;
							$('#msg').text ('Translation was successful: ' + response.file.name + '.') ;
							//var fileId =oViewDataClient.fromBase64 (viewable.urn) ;
							AddThisOne (viewable.urn) ;
						}
					) ;
				}
			},
			//onError
			function (error) {
				console.log ('File upload failed:') ;
				console.log (error) ;
				$('#msg').text ('File upload failed!') ;
			}
		) ;
	}
}

function checkTranslationStatus (fileId, timeout, onSuccess) {
	var startTime =new Date ().getTime () ;
	var timer =setInterval (function () {
			var dt =(new Date ().getTime () - startTime) / timeout ;
			if ( dt >= 1.0 ) {
				clearInterval (timer) ;
			} else {
				oViewDataClient.getViewableAsync (
					fileId,
					function (response) {
						var msg ='Translation Progress ' + fileId + ': ' + response.progress ;
						console.log (msg) ;
						$('#msg').text (msg) ;
						if ( response.progress === 'complete' ) {
							clearInterval (timer) ;
							onSuccess (response) ;
						}
					},
					function (error) {
					}
				) ;
			}
		},
		2000
	) ;
}
