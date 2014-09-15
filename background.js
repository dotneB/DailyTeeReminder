var pollInterval = 1000 * 60 * 60 * 1;
var forceUpdateDelay = 250;

var currentTimeout;

function verifyVersion()
{
    $.getJSON(chrome.extension.getURL('manifest.json'), 
        function(manifest)
        {
            var newVersionLoaded = false;
            var appVersion = manifest.version;
            if(localStorage.getItem("version") != appVersion)
            {
                newVersionLoaded = true;
            }

            if(newVersionLoaded)
            {
                if(appVersion == "1.4.0" || appVersion == "2.0.0")
                {
                    localStorage.clear();
                }
                localStorage.setItem("version", appVersion);
            }
        } 
    );
}

$( document ).ready(function()
{
    verifyVersion();
    loadLatestShirts();
    
});

function loadLatestShirts()
{
    $.getJSON('http://dailyteeserver.herokuapp.com/latest.json', 
        function(latestShirts)
        {
            localStorage.setItem("latestShirts", JSON.stringify(latestShirts) );
            var seenShirts = JSON.parse( localStorage.getItem("seenShirts") )
            for (var i = 0; i < latestShirts.length; i++) 
            {
                if($.inArray(latestShirts[i].id, seenShirts) == -1)
                {
                    chrome.browserAction.setBadgeBackgroundColor({color:[214,1,2,255]});
                    chrome.browserAction.setBadgeText({text:"!"});
                }
            }
        } 
    );
    currentTimeout = setTimeout(loadLatestShirts, pollInterval);
}

function forceUpdate()
{
    clearTimeout(currentTimeout);
    currentTimeout = setTimeout(loadLatestShirts, forceUpdateDelay);
}
