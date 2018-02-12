// example api call with jQuery
function getReportingData(apiHost, formId, apiKey) {

    var reportingAPIEndpoint= apiHost + "/forms/"+ formId + "/submissions.json";

    // set up the HTTP Request options
    var ajaxOptions = {
        url: reportingAPIEndpoint,
        method: "GET",
        crossDomain: true,
        data: {  // URL Query Params, refer to swagger doc for additional filters check the Swagger docs
            testData: false,
            spam: false
        },
        headers: {
            "x-api-key" : apiKey
        },
        statusCode: {
            200: function (data) {
                console.log("response-data", data);
                // Create the data table.
                // setup columns and also dataMap to start counting submissions data in "data.form.fields"
                for (var inputsIndex = 0; inputsIndex < data.form.fields.length; inputsIndex++) {
                    var field = data.form.fields[inputsIndex];
                    console.log("field", field)
                }
            },
            202: function () {  // retry
                console.log("Still generating graph!");
                setTimeout(function () {
                    $.ajax(ajaxOptions);
                }, 1000);
            },
            // make sure your application can generically catch HTTP Status error codes >= 400 below are 2 common ones 
            // we usually conform to the RFC https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html  
            403: function () {  // auth failure
                console.log("Authentication Error!");
            },  
            500: function () { // server error
                console.log("Server Error");
            }
        }
    };

    // make the http request
    $.ajax(ajaxOptions);
}

