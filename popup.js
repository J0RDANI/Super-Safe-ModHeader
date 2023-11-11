document.addEventListener('DOMContentLoaded', function () {
    const headerName = document.getElementById('headerName');
    const headerValue = document.getElementById('headerValue');
    const saveButton = document.getElementById('saveButton');

    // Save button click event
    saveButton.addEventListener('click', function () {
        console.log("Save button clicked!"); // Add this line
        const newHeaderName = headerName.value;
        const newHeaderValue = headerValue.value;
        // Notify background script to update the rule with the new header value
        chrome.runtime.sendMessage({ action: 'updateRule', headerName: newHeaderName, headerValue: newHeaderValue }, function (response) {
            console.log(response);
        });
    });
});
