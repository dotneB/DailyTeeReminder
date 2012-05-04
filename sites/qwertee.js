Qwertee.prototype = new BaseSite;
Qwertee.prototype.constructor = Qwertee;

function Qwertee()
{
    BaseSite.call(this);
    this.siteName = "Qwertee";
    this.siteDisplayName = "Qwertee";
    this.siteURL = "http://www.qwertee.com";
	this.imgWidth		 = 480;
	this.imgHeight		 = 480;
}

Qwertee.prototype.updateInfo = function(callback)
{
    var feed = new google.feeds.Feed("http://www.qwertee.com/rss/");
    feed.setNumEntries(1);

    // Process the feed, building the display
    feed.load(function(result)
                {
                    if (!result.error)
                    {
                        // The info is embedded within the title, so we have to manually parse it
                        var teeTitleText   = result.feed.entries[0].title;

                        // The tee's image is embedded within the content, so again, we have to parse it manually
                        var tempDiv = document.createElement("div");
                        tempDiv.innerHTML = result.feed.entries[0].content;
                        var teeImagesRaw = tempDiv.getElementsByTagName("img");

                        var teeImageSrc = teeImagesRaw[0].getAttribute("src");
                        if (teeImageSrc != localStorage["Qwertee_teeImgSrc"])
                        {
                            localStorage["Qwertee_read"] = "false";
                            localStorage["Qwertee_teeTitle"] = teeTitleText;
                            localStorage["Qwertee_teeImgSrc"] = teeImageSrc;
                        }
                    }
                    callback(localStorage["Qwertee_read"]);
                });
}