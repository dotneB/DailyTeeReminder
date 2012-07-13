function BaseSite()
{
    this.siteName        = "";
    this.siteDisplayName = "";
    this.siteURL         = "";
    this.siteFeedURL     = "";
}

BaseSite.prototype.updateInfo      = function()         {}

BaseSite.prototype.setTeeTitle     = function(value)    { localStorage[this.siteName + "_teeTitle"] = value; }
BaseSite.prototype.getTeeTitle     = function()         { return localStorage[this.siteName + "_teeTitle"]; }
BaseSite.prototype.setTeeImage     = function(value)    { localStorage[this.siteName + "_teeImgSrc"] = value; }
BaseSite.prototype.getTeeImage     = function()         { return localStorage[this.siteName + "_teeImgSrc"]; }
BaseSite.prototype.setRead         = function(value)    { localStorage[this.siteName + "_read"] = value; }
BaseSite.prototype.isRead          = function()         { return localStorage[this.siteName + "_read"] == "true"; }
BaseSite.prototype.setEnabled      = function(value)    { localStorage[this.siteName + "_enabled"] = value; }
BaseSite.prototype.isEnabled       = function()         { return localStorage[this.siteName + "_enabled"] == "true" || localStorage[this.siteName + "_enabled"] == undefined || localStorage[this.siteName + "_enabled"] == "undefined"; }
BaseSite.prototype.setOrder        = function(value)    { localStorage[this.siteName + "_order"] = value; }
BaseSite.prototype.getOrder        = function()         { return (localStorage[this.siteName + "_order"] == "undefined" || localStorage[this.siteName + "_order"] == undefined) ? window.sites.length-1 : localStorage[this.siteName + "_order"]; }

BaseSite.prototype.setContent      = function(teeTitle, teeImage)
{
    if (teeImage != this.getTeeImage())
    {
        this.setRead(false);
        this.setTeeTitle(teeTitle);
        this.setTeeImage(teeImage);
    }
}

BaseSite.prototype.writeSlide      = function(container)
{
    if(this.isEnabled())
    {
        $(container).append(
            "<div class=\"slide\">" +
                "<div class=\"slide_content\">" +
                    ( this.isRead() ? "" : "<img src=\"assets/new-ribbon.png\" width=\"112\" height=\"112\" alt=\"New Ribbon\" id=\"ribbon\">") +
                    "<a href=\"#\" onclick=\"chrome.tabs.create({url: '" + this.siteURL + "'})\"><img class=\"teeImage\" src=\"" + this.getTeeImage() + "\"></a>" +                
                "</div>" +
                "<div class=\"caption\" style=\"bottom:0\">" +
                    "<p>" + this.siteDisplayName + ": " + this.getTeeTitle() +"</p>" +
                "</div>" +
            "</div>"
        );
        this.setRead(true);
    }
}