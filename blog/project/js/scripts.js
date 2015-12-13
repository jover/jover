$(function() {

  var $window = $(window);
  var $navigation = $('#navigation');

  $('img:not(.img-responsive)').addClass('img-responsive');

  var MQL = 1170;

  // Navigation slide-in effect
  if ($window.width() > MQL) {
    var headerHeight = $navigation.height();

    $window.on('scroll', {
        previousTop: 0
      },
      function() {
        var currentTop = $window.scrollTop();
        // Check scrolling up action
        if (currentTop < this.previousTop) {
          // When scrolling up...
          if (currentTop > 0 && $navigation.hasClass('is-fixed')) {
            $navigation.addClass('is-visible');
          } else {
            $navigation.removeClass('is-visible is-fixed');
          }
        } else {
          // When scrolling down...
          $navigation.removeClass('is-visible');
          if (currentTop > headerHeight && !$navigation.hasClass('is-fixed')) $navigation.addClass('is-fixed');
        }
        this.previousTop = currentTop;
      }
    );
  }

})(jQuery);
