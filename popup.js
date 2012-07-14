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
    loadSites();
    initSlides();
}

function initSlides()
{
    for (var order = 0; order < window.sites.length; order++) 
    {
        for (var i = 0; i < window.sites.length; i++) 
        {
            if (window.sites[i].isEnabled() && window.sites[i].getOrder() == order) 
            {
                window.sites[i].writeSlide($(".slides_container"));
            }
        }
    }
    chrome.browserAction.setBadgeText({text:""});

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