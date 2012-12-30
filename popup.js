google.load("feeds", "1");
google.setOnLoadCallback(pageLoaded);

function resizeAndRespectRatio(image)
{
    var maxWidth = 722; // Max width for the image
    var maxHeight = 480;    // Max height for the image
    var ratio = 0;  // Used for aspect ratio
    var width = $(image).width();    // Current image width
    var height = $(image).height();  // Current image height

    if(width/maxWidth > height/maxHeight)
    {
            newWidth  = maxWidth;
            newHeight = newWidth/width*height;
    }
    else
    {
            newHeight = maxHeight;
            newWidth  = newHeight/height*width;
    }
    $(image).css("height", newHeight);   // Set new height
    $(image).css("width", newWidth);    // Scale width based on ratio
}

function pageLoaded()
{
    initSlides();
}

function initSlides()
{
    for (var order = 0; order < chrome.extension.getBackgroundPage().getSites().length; order++) 
    {
        for (var i = 0; i < chrome.extension.getBackgroundPage().getSites().length; i++) 
        {
            if (chrome.extension.getBackgroundPage().getSites()[i].isEnabled() && chrome.extension.getBackgroundPage().getSites()[i].getOrder() == order) 
            {
                chrome.extension.getBackgroundPage().getSites()[i].writeSlide($(".slides_container"));
            }
        }
    }
    chrome.browserAction.setBadgeText({text:""});
    
    $(".teeSiteLink").click(function(index) {
        chrome.tabs.create({"url": $(this).attr("metadata-url")});
    });

    $('#slides').slides({
            preload: true,
            preloadImage: 'assets/loading.gif',
            play: 5000,
            pause: 2500,
            hoverPause: true,
            animationStart: function(current){
                $('.caption').animate({
                    bottom:-35
                },100);
            },
            animationComplete: function(current){
                $('.caption').animate({
                    bottom:0
                },200);
            },
            slidesLoaded: function() {
                $('.caption').animate({
                    bottom:0
                },200);
                
                $(".teeImage").each(function(index) {
                    resizeAndRespectRatio($(this));
                });
            }
        });
}