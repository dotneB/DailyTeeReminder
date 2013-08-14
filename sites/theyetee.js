TheYeTee.prototype = new BaseSite;
TheYeTee.prototype.constructor = TheYeTee;

function TheYeTee()
{
    BaseSite.call(this);
    this.siteName        = "TheYeTee";
    this.siteDisplayName = "TheYeTee";
    this.siteURL         = "http://theyetee.com/";
    this.siteFeedURL     = "http://theyetee.com/feeds/shirts.php";
    this.supportMultiShirt = true;
}

TheYeTee.prototype.updateInfo = function(callback)
{
    var self = this; // Keep a reference to this, to be used inside the feed callback
    var feed = new google.feeds.Feed(self.siteFeedURL);
    feed.setNumEntries(self.supportMultiShirt ? 3 : 1);

    // Process the feed, building the display
    feed.load(function(result)
                {
                    if (!result.error)
                    {
                        for (var i = 0; i < result.feed.entries.length; i++)
                        {
                            // The info is embedded within the title, so we have to manually parse it
                            var rawTitle   = result.feed.entries[i].title;
                            var shirtName  = rawTitle.split(" by ")[0];

                            // The tee's image is embedded within the content, so again, we have to parse it manually
                            var tempDiv = document.createElement("div");
                            tempDiv.innerHTML = result.feed.entries[i].content;
                            var rawImage = tempDiv.getElementsByTagName("img");
                            var imageSrc = rawImage[0].getAttribute("src");
                            var publishedDate = result.feed.entries[i].publishedDate;

                            if(shirtName.toLowerCase().indexOf("(alt)") == -1) //Don't add "alt"s
                            {
                                self.addTshirt(shirtName, imageSrc, publishedDate);
                            }
                        };
                        
                    }
                    else
                    {
                        console.log("Error loading " + self.siteName);
                        console.log(result.error);
                    }
                    callback(self.isRead());
                });
}