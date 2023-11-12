const MY_CUSTOM_RULE_ID = 1;
// Stored Values
let storedHeaderName;
let storedHeaderValue;

// Initialize with default values
let currentHeaderName = '';
let currentHeaderValue = '';

let updateCallback = null;

// Function to update the rule with a new header value
function updateRule(headerName, headerValue) {
    currentHeaderName = headerName;
    currentHeaderValue = headerValue;
    
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

// Function to get the current rule values
function getCurrentRuleValues() {
    chrome.declarativeNetRequest.getDynamicRules(
        { },
        (rules) => {
            storedHeaderName = rules[0].action.requestHeaders[0].header;
            storedHeaderValue = rules[0].action.requestHeaders[0].value;        }
            );

    return { headerName:storedHeaderName,
             headerValue:storedHeaderValue};
    
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'updateRule') {
        updateRule(request.headerName, request.headerValue);
        sendResponse({ message: 'Rule updated successfully' });

        if(updateCallback) {
            updateCallback();
            updateCallback = null;
        }
        
    } else if (request.action === 'waitForUpdate') {
        updateCallback = function() {
            sendResponse({ success: true});
        }
    }
    else if (request.action === 'getCurrentRule') {
        //var currentRuleValues = getCurrentRuleValues();
        sendResponse(getCurrentRuleValues());
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
updateRule(currentHeaderName, currentHeaderValue);
