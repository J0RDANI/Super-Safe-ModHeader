document.addEventListener('DOMContentLoaded', function () {
    const headerName = document.getElementById('headerName');
    const headerValue = document.getElementById('headerValue');
    const notification = document.getElementById('notification');
    const saveButton = document.getElementById('saveButton');

    // Fetch current rule values and update input boxes
    chrome.runtime.sendMessage({ action: 'getCurrentRule' }, function (response) {
        headerName.value = response.headerName;
        headerValue.value = response.headerValue;
    });

    // Save button click event
    saveButton.addEventListener('click', function () {
        const newHeaderName = headerName.value;
        const newHeaderValue = headerValue.value;

        // Notify background script to update the rule with the new header value
        chrome.runtime.sendMessage({ action: 'updateRule', headerName: newHeaderName, headerValue: newHeaderValue }, function (response) {
            console.log(response);
            notification.hidden = false;
            
        });
    });
});
