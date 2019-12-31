(function($) {
  "use strict"; // Start of use strict

  // Closes the sidebar menu
  $(".menu-toggle").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
    $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
    $(this).toggleClass("active");
  });

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('#sidebar-wrapper .js-scroll-trigger').click(function() {
    $("#sidebar-wrapper").removeClass("active");
    $(".menu-toggle").removeClass("active");
    $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
  });

  // Scroll to top button appear
  $(document).scroll(function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

})(jQuery); // End of use strict

// Disable Google Maps scrolling
// See http://stackoverflow.com/a/25904582/1607849
// Disable scroll zooming and bind back the click event
var onMapMouseleaveHandler = function(event) {
  var that = $(this);
  that.on('click', onMapClickHandler);
  that.off('mouseleave', onMapMouseleaveHandler);
  that.find('iframe').css("pointer-events", "none");
}
var onMapClickHandler = function(event) {
  var that = $(this);
  // Disable the click handler until the user leaves the map area
  that.off('click', onMapClickHandler);
  // Enable scrolling zoom
  that.find('iframe').css("pointer-events", "auto");
  // Handle the mouse leave event
  that.on('mouseleave', onMapMouseleaveHandler);
}
// Enable map zooming with mouse scroll when the user clicks the map
$('.map').on('click', onMapClickHandler);

var $title = $('.js-title');
var copy   = '.js-copy';

$title.click(function () {
  $(this).next(copy).slideToggle();
  $(this).parent().siblings().children().next().slideUp();
  return false;
});

// Globals
var prefixes         = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
var $container       = $('.container');
var $timeline        = $('.timeline');
var $timelineItem    = $('.timeline-item');
var $timelineContent = $('.timeline-content');
var $dropDown        = $('.dropdown');
var $hasHovered      = true;
var hideOnExit       = false;

// mouseenter event handler
$timelineItem.on('mouseenter', function(e) {

  var isSelected = $(this).hasClass('selected');

  if ( isSelected === false ) {

    var leftPos = $(this).position().left,
        left    = leftPos - 88,
        $that   = $(this);

    $timelineItem.removeClass('selected');
    $(this).addClass('selected');

    if ( $hasHovered === false ) {
      // Show Bounce

        // Set Flag
        $hasHovered = true;

        // Show DD Bounce
        showBounce(left);

        // Show DD content Bounce
        showContentBounce($that);

    } else {
      // Follow

        // Change pos of DD to follow
        dropDownFollow(left);

        // Hide previous dd content
        $timelineContent.removeClass('animated fadeIn bounceIn');

        // Show hovered dd content
        $that.find($timelineContent).addClass('animated fadeIn');
    }
  }

});

// mouseleave event handler
$timeline.on('mouseleave', function(e) {

  if (hideOnExit) {

    //   Set Flag
    $hasHovered = false;

    // Hide DD
    hideDropDown();

    // Hide DD content
    $timelineContent.removeClass('animated fadeIn');

  }

});

// Animation end event listener
$dropDown.on(prefixes, function(e) {

  if ( e.originalEvent.animationName === 'fadeOut' ) {
    $dropDown.removeAttr('style');
  }

});

/**
* Private functions that do showing/hiding/animating
*/
function showContentBounce(that) {
  $hasBounced = true;
  that.find('.timeline-content').addClass('animated bounceIn');
}

function showBounce(pos) {
  $dropDown.css('left', pos + 'px').removeClass('fadeOut').addClass('animated bounceIn');
}

function dropDownFollow(pos) {
  $dropDown.css('left', pos + 'px');
}

function hideDropDown() {
  $timelineItem.removeClass('selected');
  $dropDown.removeClass('bounceIn').addClass('fadeOut');
}
