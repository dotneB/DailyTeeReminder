google.load("feeds", "1");
google.setOnLoadCallback(pageLoaded);

function getVersion()
{
    $.getJSON(chrome.extension.getURL('manifest.json'), function(manifest){ $("#appName").html(manifest.name + " v" + manifest.version); } );
}

function pageLoaded()
{
    getVersion();
    //loadSites();
    writeSites();
    
    $( "ul" ).sortable({ 
        connectWith: "ul", 
        placeholder: "ui-state-highlight", 
        stop: function(event, ui)
        { 
            $.each($("#enabledSites").sortable('toArray'), function(index, value) { 
                //alert(index + ':e ' + value);
                chrome.extension.getBackgroundPage().getSites()[value].setEnabled(true);
                chrome.extension.getBackgroundPage().getSites()[value].setOrder(index);
                chrome.extension.getBackgroundPage().getSites()[value].save();
                chrome.extension.getBackgroundPage().forceUpdate();                
            });
            $.each($("#disabledSites").sortable('toArray'), function(index, value) { 
                //alert(index + ':d ' + value); 
                chrome.extension.getBackgroundPage().getSites()[value].setEnabled(false);
                chrome.extension.getBackgroundPage().getSites()[value].setOrder(index);
                chrome.extension.getBackgroundPage().getSites()[value].save();
            });
        } 
    }).disableSelection();
}

function writeSites()
{
    for (var order = 0; order < chrome.extension.getBackgroundPage().getSites().length; order++) 
    {
        for (var i = 0; i < chrome.extension.getBackgroundPage().getSites().length; i++) 
        {
            if (chrome.extension.getBackgroundPage().getSites()[i].getOrder() == order) 
            {
                var list = "#disabledSites";
                if (chrome.extension.getBackgroundPage().getSites()[i].isEnabled())
                {
                    list = "#enabledSites";
                }
                $(list).append(
                    "<li class=\"ui-state-default\" id=\"" + i + "\">" + chrome.extension.getBackgroundPage().getSites()[i].siteDisplayName + "</li>"
                );
            }
        }
    }
}