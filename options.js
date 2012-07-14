google.load("feeds", "1");
google.setOnLoadCallback(pageLoaded);

function getVersion()
{
    $.getJSON(chrome.extension.getURL('manifest.json'), function(manifest){ $("#appName").html(manifest.name + " v" + manifest.version); } );
}

function pageLoaded()
{
    getVersion();
    loadSites();
    writeSites();
    
    $( "ul" ).sortable({ 
        connectWith: "ul", 
        placeholder: "ui-state-highlight", 
        stop: function(event, ui)
        { 
            $.each($("#enabledSites").sortable('toArray'), function(index, value) { 
                //alert(index + ':e ' + value); 
                window.sites[value].setEnabled(true);
                window.sites[value].setOrder(index);
            });
            $.each($("#disabledSites").sortable('toArray'), function(index, value) { 
                //alert(index + ':d ' + value); 
                window.sites[value].setEnabled(false);
                window.sites[value].setOrder(index);
            });
        } 
    }).disableSelection();
}

function writeSites()
{
    for (var order = 0; order < window.sites.length; order++) 
    {
        for (var i = 0; i < window.sites.length; i++) 
        {
            if (window.sites[i].getOrder() == order) 
            {
                var list = "#disabledSites";
                if (window.sites[i].isEnabled())
                {
                    list = "#enabledSites";
                }
                $(list).append(
                    "<li class=\"ui-state-default\" id=\"" + i + "\">" + window.sites[i].siteDisplayName + "</li>"
                );
            }
        }
    }
}