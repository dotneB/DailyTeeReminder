Tilteed.prototype = new BaseSite;
Tilteed.prototype.constructor = Tilteed;

function Tilteed()
{
    BaseSite.call(this);
    this.siteName        = "Tilteed";
    this.siteDisplayName = "Tilteed";
    this.siteURL         = "http://www.tilteed.com";
    this.siteFeedURL     = "http://www.tilteed.com/home/rss";
}

Tilteed.prototype.updateInfo = function(callback)
{
    var self = this; // Keep a reference to this, to be used inside the feed callback
    var feed = new google.feeds.Feed(self.siteFeedURL);
    feed.setNumEntries(1);

    // Process the feed, building the display
    feed.load(function(result)
                {
                    if (!result.error)
                    {
                        // The info is embedded within the title, so we have to manually parse it
                        var teeTitleText = result.feed.entries[0].title;

                        // The tee's image is embedded within the content, so again, we have to parse it manually
                        var tempDiv = document.createElement("div");
                        tempDiv.innerHTML = result.feed.entries[0].content;
                        var teeImagesRaw = tempDiv.getElementsByTagName("img");
                        var teeImageSrc = teeImagesRaw[0].getAttribute("src");
						
                        self.setContent(teeTitleText, teeImageSrc);
                    }
                    callback(self.isRead());
                });
}