history.pushState(null, document.title, location.href);
window.addEventListener('popstate', function (event)
{
    history.pushState(null, document.title, location.href);
    chrome.runtime.sendMessage({add: 1});
});

// Initialize the counter and refreshes the show number on page shifts
window.addEventListener('load', function (event) {
    chrome.runtime.sendMessage({add: 0}); 
});