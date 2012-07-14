function loadSites()
{
    //Doesn't work with manifest_version 2
    // So when we add a site, we have to remember to add the script include in popup.html, background.html and options.html
    /*loadSiteJS("sites/shirtwoot.js");
    loadSiteJS("sites/teefury.js");
    loadSiteJS("sites/riptapparel.js");
    loadSiteJS("sites/theyetee.js");
    loadSiteJS("sites/qwertee.js");
    loadSiteJS("sites/tilteed.js");*/

    window.sites = new Array(
                            new ShirtWoot(),
                            new TeeFury(),
                            new RiptApparel(),
                            new TheYeTee(),
                            new Qwertee(),
                            new Tilteed()
                        );
}

function loadSiteJS(siteJSfile)
{
    var script   = document.createElement("script");
    script.type  = "text/javascript";
    script.src   = siteJSfile;    
    $('head').append(script);
}