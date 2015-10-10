/* ----------------------------------------------------- */
/* Document.ready */
/* ----------------------------------------------------- */

jQuery(document).ready(function($){

	/* ----------------------------------------------------- */
	/* jCarousel Lite */
	/* ----------------------------------------------------- */
	
	var sliderShowItems = $(".work-carousel ul li").length;
	
	if(sliderShowItems > 3){
		sliderShowItems = 3;
	}
	
	if($(".work-carousel ul li").length > 0){
	
		//$("#latestwork .entry a").has('img').append('<div class="zoom"></div>');
	
		$(".work-carousel").touchwipe({
	     	wipeLeft: function() { $('.work-carousel-next').trigger("click"); },
	     	wipeRight: function() { $('.work-carousel-prev').trigger("click"); },
		});
	
		$(".work-carousel").jCarouselLite({
	        btnNext: ".work-carousel-next",
	        btnPrev: ".work-carousel-prev",
	        auto : 0,
	        speed: 300,
	        circular: true,
	        visible : 3,
	        scroll: 1
    	});
	
	}
	
	/* ----------------------------------------------------- */
	
	var sliderShowItems2 = $(".post-carousel ul li").length;
	
	if(sliderShowItems2 > 3){
		sliderShowItems2 = 3;
	}
	
	if($(".post-carousel ul li").length > 0){
	
		$(".post-carousel").touchwipe({
	     	wipeLeft: function() { $('.post-carousel-next').trigger("click"); },
	     	wipeRight: function() { $('.post-carousel-prev').trigger("click"); },
		});
	
		$(".post-carousel").jCarouselLite({
	        btnNext: ".post-carousel-next",
	        btnPrev: ".post-carousel-prev",
	        auto : 0,
	        speed: 300,
	        easing : 'easeOutSine',
	        circular: true,
	        visible : sliderShowItems2,
	        scroll: 1
    	});
	
	}

	/* ----------------------------------------------------- */
	/* prettyPhoto */
	/* ----------------------------------------------------- */
	
	$('a[href$=jpg], a[href$=JPG], a[href$=jpeg], a[href$=JPEG], a[href$=png], a[href$=gif], a[href$=bmp]:has(img), a[class^="prettyPhoto"]').prettyPhoto({
		opacity: 0.50,
		theme: 'light_square',
		show_title: false,
		horizontal_padding: 20,
		social_tools:false
	});

	/* ----------------------------------------------------- */
	/* Home Page + Navigation */
	/* ----------------------------------------------------- */
	
	/* ----------------------------------------------------- */
	// Search Slider
	$('#nav .searchform').click(function(){
		$(this).animate({'width' : '200px', 'opacity' : 1}, 400);
		$(this).find('input').focus();
	});
	
	$('#nav .searchform').focusout(function() {
		$('#nav .searchform').animate({'width' : '0px', 'opacity' : 0.5}, 400);
 	});
 	
 	/* ----------------------------------------------------- */
 	// Social
 	$('#social ul li').hover(function () {
 		$(this).stop().animate({'width' : '110px', 'opacity' : 1}, 400, 'easeOutQuad');
 	}, function(){
 		$(this).stop().animate({'width' : '28px', 'opacity' : 0.5}, 400, 'easeOutQuad');
 	});
 	
 	/* ----------------------------------------------------- */
	// Mobile Menu as Selectbox
	$('#nav ul.menu').mobileMenu({
    	defaultText: 'Navigate to...',
    	className: 'select-menu',
    	subMenuDash: '&nbsp;&nbsp;&nbsp;&ndash;'
	});
	
	/* ----------------------------------------------------- */
	// Superfish Dropdown Menu + Arrow-div
	$("#nav ul.menu").superfish({
		delay:       220,
		speed:       'normal',
        autoArrows:    true, 
        dropShadows: false
	});
	
	$('.sub-menu').append('<div class="triangle"></div>');
	
	/* ----------------------------------------------------- */
	// Work Item Hover
	$("#latestwork .entry, .post-entry .post-thumb, .work-item, #work-slider li").hover(function(){
		//$(this).animate({borderColor : '#ec7100'}, 300);
		$(this).find('a').has('img').append('<div class="zoom"></div>');
		$(this).find('.zoom').animate({opacity : '1'}, 300);
	}, function(){
		//$(this).animate({borderColor : '#f5f5f5'}, 300);
		$(this).find('.zoom').animate({opacity : '0'}, 300 ,function(){ 
			$(this).remove(); 
		});
	});
	
	
	
	/* ----------------------------------------------------- */
	/* Add Scroll-to-Top Link */
	$('html').UItoTop(); 

	
	/* ----------------------------------------------------- */
	/* Shortcodes */
	/* ----------------------------------------------------- */
	
	/* ----------------------------------------------------- */
	/* Accordion */
	var allPanels = $('.accordion > .inner').hide();
    
  	$('.accordion > .title > a').click(function() {
      $this = $(this);
      $target =  $this.parent().next();

      if(!$target.hasClass('active')){
         allPanels.slideUp(400, 'easeOutCirc');
         $target.slideDown(400, 'easeOutCirc');
         $this.parent().parent().find('.title').removeClass('active');
         $this.parent().addClass('active');
      }
      return false;
  	});
  	
  	$('.accordion > .inner').first().show();
  	$('.accordion .title').first().addClass('active');
  	
  	/* ----------------------------------------------------- */
  	/* Toggle */
	$(".toggle .title").toggle(function(){
		$(this).addClass("active").closest('.toggle').find('.inner').slideDown(400, 'easeOutCirc');
		}, function () {
		$(this).removeClass("active").closest('.toggle').find('.inner').slideUp(400, 'easeOutCirc');
	});
	
	/* ----------------------------------------------------- */
	/* Tabs */
	var tabContainers = $('div.tabs > div');
	tabContainers.hide().filter(':first').show();
			
	$('div.tabs ul.tabNavigation a').click(function () {
		tabContainers.hide();
		tabContainers.filter(this.hash).show();
		$('div.tabs ul.tabNavigation a').removeClass('active');
		$(this).addClass('active');
		return false;
	}).filter(':first').click();
	
	/* ----------------------------------------------------- */
  	/* Alert */
	$(".alert-message a").click(function(){
		$(this).parent().slideUp();
		return false;
	});
	
	/* ----------------------------------------------------- */
	/* Other Scripts */
	/* ----------------------------------------------------- */
	
});

/* ----------------------------------------------------- */
/* Plugins */
/* ----------------------------------------------------- */

/* ----------------------------------------------------- */
/* UiToTop Plugin */

(function($){
	$.fn.UItoTop = function(options) {

 		var defaults = {
    			text: 'To Top',
    			min: 200,
    			inDelay:600,
    			outDelay:400,
      			containerID: 'toTop',
    			containerHoverID: 'toTopHover',
    			scrollSpeed: 300,
    			easingType: 'linear'
 		    },
            settings = $.extend(defaults, options),
            containerIDhash = '#' + settings.containerID,
            containerHoverIDHash = '#'+settings.containerHoverID;
		
		$('body').append('<a href="#" id="'+settings.containerID+'">'+settings.text+'</a>');
		$(containerIDhash).hide().on('click.UItoTop',function(){
			$('html, body').animate({scrollTop:0}, settings.scrollSpeed, settings.easingType);
			$('#'+settings.containerHoverID, this).stop().animate({'opacity': 0 }, settings.inDelay, settings.easingType);
			return false;
		})
		.prepend('<span id="'+settings.containerHoverID+'"></span>')
		.hover(function() {
				$(containerHoverIDHash, this).stop().animate({
					'opacity': 1
				}, 600, 'linear');
			}, function() { 
				$(containerHoverIDHash, this).stop().animate({
					'opacity': 0
				}, 700, 'linear');
			});
					
		$(window).scroll(function() {
			var sd = $(window).scrollTop();
			if(typeof document.body.style.maxHeight === "undefined") {
				$(containerIDhash).css({
					'position': 'absolute',
					'top': sd + $(window).height() - 50
				});
			}
			if ( sd > settings.min ) 
				$(containerIDhash).fadeIn(settings.inDelay);
			else 
				$(containerIDhash).fadeOut(settings.Outdelay);
		});
};
})(jQuery);

/* ----------------------------------------------------- */
/* EOF */
/* ----------------------------------------------------- */