$('.project__item').each(function(){
	var $this = $(this),
		$that = $this.find('.project__entry'),
		$video = $this.find('video'), // Video
		$overlay = $this.find('.item__overlay'),
		$this_slider = $this.find('.item__slider'),
		$touch_explore = $this.find('.touch-explore'),
		$touch_close = $this.find('.touch-close'),
		
		$siblings = $(this).siblings(),
		$sibling_overlay = $siblings.find('.item__overlay'),
		$sibling_explore = $siblings.find('.touch-explore'),
		$sibling_close = $siblings.find('.touch-close');

		if( !Modernizr.touchevents) {

			var timer;

			$that.hover( function() {
			  	// get video
			  	$video = $this.find('.flex-active-slide video');

			  	if(timer) {
			  		clearTimeout(timer);
			  	}
			  	
			  

				  	if($video.length){
				    	$video.get(0).play();
				    }
				    // Show overlay
				  	$overlay
				  		.addClass('active-hover')
					  	.animate({
					  		opacity:1
					  	});




			    
			  }, function() {
			  	// Else conditoin - hover out

			  	// if(timer) {
			  	// 	clearTimeout(timer);
			  	// 	timer = null;
			  	// }

			  	timer = setTimeout(function(){

			  	$overlay
				  	.removeClass('active-hover')
				  	.animate({
				  		opacity:0
				  	}, 500, function(){

				  		// Reset slide
					 	$this_slider.flexslider(0); //Go First slide

					  	 if($video.length){
					    	$video.get(0).pause();
					    	$video.get(0).load();
					    }

				  	});

				  	// clearTimeout(timer);


				  }, 1000);

			  });

		} else {
			// If touch events

			// Hide video and show image
			var $video_alt = $this.find('.item__video-wrapper'),
				$video_alt_src = $video_alt.data('src');

				$video.hide();

				$video_alt.append('<img src="'+ $video_alt_src +'" alt="Video Replacement">');


			$touch_explore.on('click', function(){

				var me = $(this);

				//console.log('clicked');

				// hide all overlays
				$([$sibling_overlay, $sibling_close]).each(function(){
					$(this).animate({
						opacity: 0
					}, 500);

				});

				// Show 'explore' button
				$sibling_explore
					.css('z-index', 10)
					.animate({
						opacity: 1
					}, 500);

				// Hide this explore button and send it to back (z-index)
				me.animate({
					opacity:0
				}, 500, function(){
					me.css('z-index', -1);
				});

				// Show this Overlay
				$overlay.animate({
			  		opacity:1
			  	}, 500);

				// Show Close button
			  	$touch_close
				  	.css('z-index', 10)
				  	.animate({
				  		opacity:0.4,
				  	}, 500);

			});

			$touch_close.on('click', function(){

				var me = $(this);

				me.animate({
					opacity:0
				}, 500, function(){
					me.css('z-index', -1);
				});

				$touch_explore
					.css('z-index', 10)
					.animate({
						opacity:1
					}, 500);

				$overlay.animate({
			  		opacity:0
			  	}, 500);



			});



		}

		

});


 $('.item__slider').flexslider({
    animation: "slide",
    animationLoop: false,
    slideshow: false,
    controlNav: false,
    prevText: "",
    nextText: "",

    start: function(slider) { // Fires when the slider loads the first slide
      var slide_count = slider.count - 1;

      $(slider)
        .find('img.lazy:eq(0)')
        .each(function() {
          var src = $(this).attr('data-src');
          $(this).attr('src', src).removeAttr('data-src');
        });

    },

    before: function(slider) { // Fires asynchronously with each slider animation
      var slides     = slider.slides,
          index      = slider.animatingTo,
          $slide     = $(slides[index]),
          $img       = $slide.find('img[data-src]'),
          current    = index,
          nxt_slide  = current + 1,
          prev_slide = current - 1,
          find_video = $slide.find('video'),
          define_video = find_video.get(0),
          all_video = $(slider).find('video');

      $slide
        .parent()
        .find('img.lazy:eq(' + current + '), img.lazy:eq(' + prev_slide + '), img.lazy:eq(' + nxt_slide + ')')
        .each(function() {
          var src = $(this).attr('data-src');
          $(this).attr('src', src).removeAttr('data-src');
        });

        // Pause all video
        all_video.get(0).pause();

        // Play video if exists
        if(find_video.length) {
        	define_video.play();
        }

    }
 });


 $('.collapsible__item').each(function(){
 	var $this = $(this),
 		$trigger = $this.find('.collapsible__trigger'),
 		$target = $this.find('.collapsible__target'),
 		$sibling = $this.siblings(),
 		$global__trigger = $sibling.find('.collapsible__trigger'),
 		$global__target = $sibling.find('.collapsible__target');

 		$this.on('click', function(){
 			if( !$trigger.is('.collapsible__trigger--active')) {
 				
 				// reset all other targets
 				$global__trigger.removeClass('collapsible__trigger--active');
 				$global__target.slideUp();

 				$trigger.addClass('collapsible__trigger--active');
 				$target.slideDown();

 			} else {
 				$trigger.removeClass('collapsible__trigger--active');
 				$target.slideUp();
 			}
 		});

 });


$('.close-oldbrowser-msg').on('click', function(){
	$(this).parent().fadeOut();
});
