function loadSites()
{
    loadSiteJS("sites/shirtwoot.js");
    loadSiteJS("sites/teefury.js");
    loadSiteJS("sites/riptapparel.js");
    loadSiteJS("sites/theyetee.js");
    loadSiteJS("sites/qwertee.js");

    window.sites = new Array(
                            new ShirtWoot(),
                            new TeeFury(),
                            new RiptApparel(),
							new TheYeTee(),
							new Qwertee()
                        );
}

function loadSiteJS(siteJSfile)
{
    var script   = document.createElement("script");
    script.type  = "text/javascript";
    script.src   = siteJSfile;    
    $('head').append(script);
}