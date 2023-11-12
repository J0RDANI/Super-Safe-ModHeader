document.addEventListener('DOMContentLoaded', function () {
    let headerName = document.getElementById('headerName');
    let headerValue = document.getElementById('headerValue');
    let notification = document.getElementById('notification');
    let saveButton = document.getElementById('saveButton');
    

    chrome.runtime.sendMessage({ action: 'getCurrentRule' }, function (response) {
            console.log("Response:" + JSON.stringify(response));
            headerName.value = response.headerName;
            headerValue.value = response.headerValue;   
            
        });
    

    // Save button click event
    saveButton.addEventListener('click', function () {
        var newHeaderName = headerName.value;
        var newHeaderValue = headerValue.value;

        // Notify background script to update the rule with the new header value
        chrome.runtime.sendMessage({ action: 'updateRule', headerName: newHeaderName, headerValue: newHeaderValue }, function (response) {
            notification.hidden = false;

        });

    });
});
