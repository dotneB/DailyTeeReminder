var pollInterval = 1000 * 60 * 60 * 1;
var forceUpdateDelay = 250;
google.load("feeds", "1");
google.setOnLoadCallback(pageLoaded);
var currentTimeout;
var appName = "";
var appVersion = 0;
var newVersionLoaded = false;

function loadManifest()
{
    $.getJSON(chrome.extension.getURL('manifest.json'), 
                function(manifest)
                {
                    appName = manifest.name;
                    appVersion = manifest.version;
                    if(localStorage.getItem("version") != appVersion)
                    {
                        newVersionLoaded = true;
                    }

                    if(newVersionLoaded)
                    {
                        if(appVersion == "1.4.0")
                        {
                            localStorage.clear();
                        }
                        localStorage.setItem("version", appVersion);
                    }
                } 
            );
}

function pageLoaded()
{
    loadManifest();
    loadSites();
    updateSites();
}

function updateSites()
{
    console.log("\n\nRefreshing t-shirt sites");
    for(var i = 0; i < window.sites.length; i++)
    {
        window.sites[i].load();
        if(window.sites[i].isEnabled())
        {
            window.sites[i].updateInfo(onUpdateDone);
        }
    }
    currentTimeout = setTimeout(updateSites, pollInterval);
}

function onUpdateDone(isRead)
{
    if(!isRead)
    {
        chrome.browserAction.setBadgeBackgroundColor({color:[214,1,2,255]});
        chrome.browserAction.setBadgeText({text:"!"});
    }
}

function forceUpdate()
{
    clearTimeout(currentTimeout);
    currentTimeout = setTimeout(updateSites, forceUpdateDelay);
}

function getSites()
{
    return window.sites;
}