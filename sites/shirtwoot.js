ShirtWoot.prototype = new BaseSite;
ShirtWoot.prototype.constructor = ShirtWoot;

function ShirtWoot()
{
    BaseSite.call(this);
    this.siteName        = "ShirtWoot";
    this.siteDisplayName = "Shirt Woot";
    this.siteURL         = "http://shirt.woot.com";
    this.siteFeedURL     = "http://api.woot.com/1/sales/current.rss/shirt.woot.com";
}

ShirtWoot.prototype.updateInfo = function(callback)
{
    var self = this; // Keep a reference to this, to be used inside the feed callback
    var feed = new google.feeds.Feed(self.siteFeedURL);
    feed.setNumEntries(1);
    feed.setResultFormat(google.feeds.Feed.MIXED_FORMAT);

    // Process the feed, building the display
    feed.load(function(result)
                {
                    if (!result.error)
                    {
                        var item = $(result.xmlDocument).find('item');
                        var shirtName = item.find('title').text();
                        var jSections = item.children();

                        var imageSrc = "";
                        jSections.each(
                            function( intSectionIndex )
                            {
                                if($( this )[ 0 ].nodeName == "woot:detailimage")
                                {
                                    // Set the term text.
                                    imageSrc = $( this ).text();
                                }
                            }
                        );
                        var publishedDate = result.feed.entries[0].publishedDate;
                        if(imageSrc != "")
                        {
                            self.addTshirt(shirtName, imageSrc, publishedDate);
                        }
                    }
                    callback(self.isRead());
                });
}