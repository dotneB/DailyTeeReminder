var pollInterval = 1000 * 60 * 60 * 1;
google.load("feeds", "1");
google.setOnLoadCallback(pageLoaded);

function pageLoaded()
{
    loadSites();
    updateSites();
}

function updateSites()
{
    for(var i = 0; i < window.sites.length; i++)
    {
        if(window.sites[i].isEnabled())
        {
            window.sites[i].updateInfo(onUpdateDone);
        }
    }
    setTimeout(updateSites, pollInterval);
}

function onUpdateDone(isRead)
{
    if(!isRead)
    {
        chrome.browserAction.setBadgeBackgroundColor({color:[214,1,2,255]});
        chrome.browserAction.setBadgeText({text:"!"});
    }
}