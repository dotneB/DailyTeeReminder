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

$( document ).ready(function()
{
    initSlides();
});

function initSlides()
{
    var latestShirts = JSON.parse( localStorage.getItem("latestShirts") )
    var seenShirts = JSON.parse( localStorage.getItem("seenShirts") )
    var seenNow = []
    for (var i = 0; i < latestShirts.length; i++) 
    {
        var seen = $.inArray(latestShirts[i].id, seenShirts) != -1;
        if(seen && latestShirts[i].site.id == 1)
        {
            continue;
        }
        $(".slides_container").append(
            "<div class=\"slide\">" +
                "<div class=\"slide_content\">" +
                    ( seen ? "" : "<img src=\"assets/new-ribbon.png\" width=\"112\" height=\"112\" alt=\"New Ribbon\" id=\"ribbon\">" ) +
                    "<a href=\"#\" class=\"teeSiteLink\" metadata-url=\"" + latestShirts[i].url + "\"><img class=\"teeImage\" src=\"" + latestShirts[i].image_url + "\"></a>" +                
                "</div>" +
                "<div class=\"caption\" style=\"bottom:0\">" +
                    "<p>" + latestShirts[i].site.name + ": " + latestShirts[i].name +"</p>" +
                "</div>" +
            "</div>"
        );

        seenNow.push( latestShirts[i].id );
    }
    localStorage.setItem("seenShirts", JSON.stringify(seenNow) );
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