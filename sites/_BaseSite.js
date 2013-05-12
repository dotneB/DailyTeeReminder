function BaseSite()
{
    this.siteName        = "";
    this.siteDisplayName = "";
    this.siteURL         = "";
    this.siteFeedURL     = "";
    this.supportMultiShirt = false;

    this.loadedData      = { 
                            'enabled': true, 
                            'order': -1, 
                            'read':false,
                            'shirts': [] 
                            };
}

BaseSite.prototype.load            = function()
{
    this.loadedData = JSON.parse(localStorage.getItem(this.siteName));
    if(this.loadedData==null)
    {
        this.loadedData      = { 
                                'enabled': true, 
                                'order': -1, 
                                'read':false,
                                'shirts': [] 
                                };
    }
}

BaseSite.prototype.save            = function()
{
    localStorage.setItem(this.siteName, JSON.stringify(this.loadedData));
}

BaseSite.prototype.updateInfo      = function()         {}

BaseSite.prototype.setRead         = function(value)    { this.loadedData["read"] = value; }
BaseSite.prototype.isRead          = function()         { return this.loadedData["read"] == true; }
BaseSite.prototype.setEnabled      = function(value)    { this.loadedData["enabled"] = value; }
BaseSite.prototype.isEnabled       = function()         { return this.loadedData["enabled"] == true; }
BaseSite.prototype.setOrder        = function(value)    { this.loadedData["order"] = value; }
BaseSite.prototype.getOrder        = function()         { return this.loadedData["order"] == -1 ? window.sites.length-1 : this.loadedData["order"]; }

BaseSite.prototype.addTshirt       = function(title, imageSrc, dateStr)
{
    this.load();
    console.log(this.siteName + " -----------------------------------------------------------------------");
    console.log("Checking " + title + ", " + dateStr);
    function DateStringToInt(d)
    {
        function pad(n){return n<10 ? '0'+n : n}
        return parseInt(d.getUTCFullYear()+''+ pad(d.getUTCMonth()+1)+''+ pad(d.getUTCDate()));
    }
    var date = DateStringToInt(new Date(dateStr));
    if(this.supportMultiShirt)
    {
        for (var i = this.loadedData.shirts.length - 1; i >= 0; i--) 
        {
            if(date > this.loadedData.shirts[i].date)
            {
                console.log("It's a new day, remove all the old shirts");
                this.loadedData.shirts.splice(i,1);//It's a new day, remove all the old shirts
            }
            else if(date < this.loadedData.shirts[i].date)
            {
                console.log("Trying to add an older shirt, skiping");
                return;
            }
        };
    }

    var shirtFound = false;
    for(var i = 0; i < this.loadedData.shirts.length; i++)
    {
        if(this.loadedData.shirts[i].title == title)
        {
            console.log("Shirt already exist");
            shirtFound = true;
        }
    }

    if(shirtFound)
    {
         return; //Shirt already exist
    }
    console.log("Add new shirt");
    if(!this.supportMultiShirt)
    {
        this.loadedData.shirts = [];
    }
    this.loadedData.shirts.push({'title': title, 'imgSrc': imageSrc, 'date': date});
    this.setRead(false);
    this.save();
}

BaseSite.prototype.writeSlide      = function(container)
{
    this.load();
    if(this.isEnabled())
    {
        var shirts = this.loadedData["shirts"];
        if(shirts)
        {
            for(var i = 0; i < shirts.length; i++)
            {
                $(container).append(
                    "<div class=\"slide\">" +
                        "<div class=\"slide_content\">" +
                            ( this.isRead() ? "" : "<img src=\"assets/new-ribbon.png\" width=\"112\" height=\"112\" alt=\"New Ribbon\" id=\"ribbon\">") +
                            "<a href=\"#\" class=\"teeSiteLink\" metadata-url=\"" + this.siteURL + "\"><img class=\"teeImage\" src=\"" + shirts[i].imgSrc + "\"></a>" +                
                        "</div>" +
                        "<div class=\"caption\" style=\"bottom:0\">" +
                            "<p>" + this.siteDisplayName + ": " + shirts[i].title +"</p>" +
                        "</div>" +
                    "</div>"
                );        
            }    
        }
        
        this.setRead(true);
    }
    this.save();
}