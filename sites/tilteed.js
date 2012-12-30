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
    callback(true);
    return;//Disable
    var self = this; // Keep a reference to this, to be used inside the feed callback
    var feed = new google.feeds.Feed(self.siteFeedURL);
    feed.setNumEntries(3);

    // Process the feed, building the display
    feed.load(function(result)
                {
                    if (!result.error)
                    {
                        for (var i = 0; i < result.feed.entries.length; i++)
                        {
                            // The info is embedded within the title, so we have to manually parse it
                            var shirtName = result.feed.entries[i].title;

                            // The tee's image is embedded within the content, so again, we have to parse it manually
                            var tempDiv = document.createElement("div");
                            tempDiv.innerHTML = result.feed.entries[i].content;
                            var teeImagesRaw = tempDiv.getElementsByTagName("img");
                            var imageSrc = teeImagesRaw[0].getAttribute("src");
                            
                            if(imageSrc.indexOf(self.siteURL) == -1)
                            {
                                imageSrc = self.siteURL + "/" + imageSrc;
                            }
                            var publishedDate = result.feed.entries[i].publishedDate;

                            self.addTshirt(shirtName, imageSrc, publishedDate);
                        }
                    }
                    callback(self.isRead());
                });
}