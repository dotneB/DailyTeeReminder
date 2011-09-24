TeeFury.prototype = new BaseSite;
TeeFury.prototype.constructor = TeeFury;

function TeeFury()
{
    BaseSite.call(this);
    this.siteName = "TeeFury";
    this.siteDisplayName = "Tee Fury";
    this.siteURL = "http://www.teefury.com";
}

TeeFury.prototype.updateInfo = function(callback) 
{
    var feed = new google.feeds.Feed("http://feeds.feedburner.com/TeefuryDailyTee");
    feed.setNumEntries(1);

    // Process the feed, building the display
    feed.load(function(result) 
                {
                    if (!result.error) 
                    {
                        // The info is embedded within the title, so we have to manually parse it
                        var teeTitleRaw   = result.feed.entries[0].title;
                        var teeTitleWords = teeTitleRaw.split(" - ");
                        var teeTitleText  = teeTitleWords[0].split(" by ")[0];
                        var teeAuthorText = teeTitleWords[0].split(" by ")[1];
                        var teePriceText  = teeTitleWords[1];
                         
                        // The tee's image is embedded within the content, so again, we have to parse it manually
                        var tempDiv = document.createElement("div");
                        tempDiv.innerHTML = result.feed.entries[0].content;
                        var teeImagesRaw = tempDiv.getElementsByTagName("img");

                        var teeImageSrc = teeImagesRaw[0].getAttribute("src");
                        
                        if (teeImageSrc != localStorage["TeeFury_teeImgSrc"]) 
                        {
                            localStorage["TeeFury_read"] = "false";
                            localStorage["TeeFury_teeTitle"] = teeTitleText;
                            localStorage["TeeFury_teeImgSrc"] = teeImageSrc;
                        }
                    }
                    callback(localStorage["TeeFury_read"]);
                });
}