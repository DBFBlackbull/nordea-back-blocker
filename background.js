chrome.runtime.onMessage.addListener(function (request, sender, sendReponse) {
    chrome.browserAction.getBadgeText({tabId: sender.tab.id}, function (result) {
        var count = parseInt(result);
        if (isNaN(count)) {
            count = request.add;
        } else {
            count += request.add;
        }
        chrome.browserAction.setBadgeText({text: '' + count, tabId: sender.tab.id});
    });
});
