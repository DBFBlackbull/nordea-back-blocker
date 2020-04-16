chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    let tabId = sender.tab.id;
    chrome.storage.local.get(['countArray'], function (countTracker) {
        let count = updateCount(countTracker, tabId, request.add);
        let countText = count > 0 ? count : '';
        chrome.browserAction.setBadgeText({text: '' + countText, tabId: tabId});
    });
});
chrome.runtime.onInstalled.addListener(function (event ) {
    chrome.storage.local.set({countArray: []});
});
chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
    chrome.storage.local.get(['countArray'], function (countTracker) {
        delete countTracker.countArray[tabId];
        chrome.storage.local.set(countTracker);
    });
});

function updateCount(countTracker, tabId, add) {
    let count = countTracker.countArray[tabId];
    count = count === undefined ? 0 : count;
    count += add;
    countTracker.countArray[tabId] = count;
    chrome.storage.local.set(countTracker);
    return count;
}