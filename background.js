const MY_CUSTOM_RULE_ID = 1;

// Function to update the rule with a new header value
function updateRule(headerName, headerValue) {
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [MY_CUSTOM_RULE_ID],
        addRules: [
            {
                id: MY_CUSTOM_RULE_ID,
                priority: 1,
                action: {
                    type: "modifyHeaders",
                    requestHeaders: [
                        {
                            operation: "set",
                            header: headerName,
                            value: headerValue
                        }
                    ]
                },
                condition: {
                    "resourceTypes": ["main_frame", "sub_frame", "script", "stylesheet", "image", "font", "object", "xmlhttprequest", "ping", "csp_report", "media", "websocket", "other"]
                },
            }
        ],
    });
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'updateRule') {
        updateRule(request.headerName, request.headerValue);
        sendResponse({ message: 'Rule updated successfully' });
    }
});

// Create the popup
chrome.action.onClicked.addListener(function (tab) {
    chrome.windows.create({
        type: "popup",
        url: "popup.html",
        width: 250,
        height: 200,
    });
});

// Initial rule setup
updateRule("my custom header name", "my custom header value");
