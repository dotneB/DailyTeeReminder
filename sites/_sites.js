function loadSites()
{
	loadSiteJS("sites/shirtwoot.js");
    loadSiteJS("sites/teefury.js");
    loadSiteJS("sites/riptapparel.js");

    window.sites = new Array(
                            new ShirtWoot(),
                            new TeeFury(),
                            new RiptApparel()
                        );
}

function loadSiteJS(siteJSfile)
{
	var script   = document.createElement("script");
	script.type  = "text/javascript";
	script.src   = siteJSfile;    
	$('head').append(script);
}