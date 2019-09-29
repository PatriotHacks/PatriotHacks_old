// Default JavaScript Functions and Initiations

// Load Custom Google Font
WebFont.load({
  google: {
    families: ['Ubuntu:300,400,500,700', 'Montserrat:400,700']
  }
});

// Google Map -- currently unused
/*
function googleMap() {
  var map = document.getElementById('google-map');

  var map_options = {
    center: new google.maps.LatLng(38.8343675,-77.3137736,17),
    scrollwheel: false,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  var map = new google.maps.Map(map, map_options)

  // Map Marker
  var myLatlng = new google.maps.LatLng(38.8343675,-77.3137736,17);
  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    icon: 'img/location-pin.svg'
  });
}
google.maps.event.addDomListener(window, 'load', googleMap);
*/

//metismenu
$("#metismenu").metisMenu();

$(document).ready(function() {
  document.addEventListener('touchstart', handleTouchStart, false);
  document.addEventListener('touchmove', handleTouchMove, false);
  var xDown = null;
  var yDown = null;
  var swipeSensitivity = 5;
  var curPage = 1;
  var numOfPages = $(".skw-page").length;
  var animTime = 1000;
  var scrolling = false;
  var pgPrefix = ".skw-page-";

  function pagination() {
    scrolling = true;

    $(pgPrefix + curPage).removeClass("inactive").addClass("active");
    //$(pgPrefix + (curPage - 1)).addClass("inactive");
    for(i = curPage - 1; i > 0; i --){
      $(pgPrefix + (i)).addClass("active");
      $(pgPrefix + (i)).addClass("inactive");
    }
    //$(pgPrefix + (curPage + 1)).removeClass("active");
    for(i = curPage + 1; i <= numOfPages; i ++){
      $(pgPrefix + (i)).removeClass("active");
    }

    setTimeout(function() {
      scrolling = false;
    }, animTime);
  };

  function navigateUp() {
    if (curPage === 1) return;
    $(".nti"+curPage).removeClass("active");
    curPage--;
    $(".nti"+curPage).addClass("active");
    $(".navigation-tab-overlay").css({
      top: $(".nti"+curPage).prevAll().length * 99 + "px"
    });
    pagination();
  };

  function navigateDown() {
    if (curPage === numOfPages) return;
    $(".nti"+curPage).removeClass("active");
    curPage++;
    $(".nti"+curPage).addClass("active");
    $(".navigation-tab-overlay").css({
      top: $(".nti"+curPage).prevAll().length * 99 + "px"
    });
    pagination();
  };

  $(document).on("mousewheel DOMMouseScroll", function(e) {
    if (scrolling) return;
    if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
      navigateUp();
    } else {
      navigateDown();
    }
  });

  $(document).on("keydown", function(e) {
    if (scrolling) return;
    if (e.which === 38) {
      navigateUp();
    } else if (e.which === 40) {
      navigateDown();
    }
  });

  $(".navigation-tab-item").click(function() {
    $(".navigation-tab-item").removeClass("active");
    $(this).addClass("active");
    $(".navigation-tab-overlay").css({
      top: $(this).prevAll().length * 99 + "px"
    });
    curPage = $(this).prevAll().length + 1;
    pagination();
  });

  function getTouches(evt) {
    return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
  };

  function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  };

  function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if(Math.abs(xDiff) > swipeSensitivity || Math.abs(yDiff) > swipeSensitivity){
      if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
          if ( xDiff > 0 ) {
              /* left swipe */
          } else {
              /* right swipe */
          }
      } else {
          if ( yDiff > 0 ) {
              /* up swipe */
              navigateDown();
          } else {
              /* down swipe */
              navigateUp();
          }
      }
    }
    /* reset values */
    xDown = null;
    yDown = null;
  };
});

