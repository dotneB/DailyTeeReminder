TheYeTee.prototype = new BaseSite;
TheYeTee.prototype.constructor = TheYeTee;

function TheYeTee()
{
    BaseSite.call(this);
    this.siteName = "TheYeTee";
    this.siteDisplayName = "TheYeTee";
    this.siteURL = "http://theyetee.com/";
}

TheYeTee.prototype.updateInfo = function(callback)
{
    var feed = new google.feeds.Feed("http://theyetee.com/feeds/shirts.php");
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

                        if (teeImageSrc != localStorage["TheYeTee_teeImgSrc"])
                        {
                            localStorage["TheYeTee_read"] = "false";
                            localStorage["TheYeTee_teeTitle"] = teeTitleText;
                            localStorage["TheYeTee_teeImgSrc"] = teeImageSrc;
                        }
                    }
                    callback(localStorage["TheYeTee_read"]);
                });
}