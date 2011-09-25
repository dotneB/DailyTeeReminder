function BaseSite()
{
    this.siteName        = "";
    this.siteDisplayName = "";
    this.siteURL         = "";
}

BaseSite.prototype.updateInfo            = function()         {}

BaseSite.prototype.setLatestTeeTitle     = function(value)    { localStorage[this.siteName + "_teeTitle"] = value; }
BaseSite.prototype.getLatestTeeTitle     = function()         { return localStorage[this.siteName + "_teeTitle"]; }
BaseSite.prototype.setLatestTeeImgSrc    = function(value)    { localStorage[this.siteName + "_teeImgSrc"] = value; }
BaseSite.prototype.getLatestTeeImgSrc    = function()         { return localStorage[this.siteName + "_teeImgSrc"]; }
BaseSite.prototype.setRead               = function(value)    { localStorage[this.siteName + "_read"] = value; }
BaseSite.prototype.isRead                = function()         { return localStorage[this.siteName + "_read"] == "true"; }

BaseSite.prototype.writeSlide = function(container)
{
    $(container).append(
        "<div class=\"slide\">" +
            ( this.isRead() ? "" : "<img src=\"img/new-ribbon.png\" width=\"112\" height=\"112\" alt=\"New Ribbon\" id=\"ribbon\">") +
            "<a href=\"#\" onclick=\"chrome.tabs.create({url: '" + this.siteURL + "'})\"><img src=\"" + this.getLatestTeeImgSrc() + "\" width=\"722\" height=\"480\"></a>" +
            "<div class=\"caption\" style=\"bottom:0\">" +
                "<p>" + this.siteDisplayName + ": " + this.getLatestTeeTitle() +"</p>" +
            "</div>" +
        "</div>"
    );
    this.setRead(true);
}