//Video Player
if( jQuery("#player").length > 0 ) {
  var player;
  var state = 0;
  var time_elapsed;
  function onYouTubePlayerAPIReady() {
    player = new YT.Player('player', {
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }
  function onPlayerStateChange() {
    if ( player.getPlayerState() == 1 ) {
      jQuery("#play").find('.purdue_video_controls_pause_share_play_border').find('.fa-pause').removeClass('hidden');
      jQuery("#play").find('.purdue_video_controls_pause_share_play_border').find('.fa-play').addClass('hidden');
      time_elapsed = setInterval(function(){
        var date_c = new Date(null);
        date_c.setSeconds(player.getCurrentTime());
        var elapsed = date_c.toISOString().substr(11, 8);
        jQuery('.purdue_video_controls_black_elapsed').text(elapsed);

        // _timeline
        var t_width = ( player.getCurrentTime() * 100 ) / player.getDuration();
        t_width = t_width + '%';
        jQuery('.purdue_video_controls_black_timeline').find('.time_elapsed').css('width', t_width);
      }, 300);
      state = 1;
    } else {
      clearInterval(time_elapsed);
      time_elapsed = 0;
      jQuery("#play").find('.purdue_video_controls_pause_share_play_border').find('.fa-pause').addClass('hidden');
      jQuery("#play").find('.purdue_video_controls_pause_share_play_border').find('.fa-play').removeClass('hidden');
      state = 0;
    }
  }

  function onPlayerReady(event) {
    //Set vars for duration
    var date_d = new Date(null);
    date_d.setSeconds(player.getDuration());
    var duration = date_d.toISOString().substr(11, 8);

    // Initialize timers
    jQuery('.purdue_video_controls_black_total').text(duration);
    jQuery('.purdue_video_controls_black_elapsed').text('00:00:00');

    // Play / Pause button
    jQuery("#play").on('click', function() {
      if ( state == 0) {
        player.playVideo();
        jQuery(this).find('.purdue_video_controls_pause_share_play_border').find('.fa-pause').removeClass('hidden');
        jQuery(this).find('.purdue_video_controls_pause_share_play_border').find('.fa-play').addClass('hidden');
        state = 1;
      } else {
        player.pauseVideo();
        jQuery(this).find('.purdue_video_controls_pause_share_play_border').find('.fa-pause').addClass('hidden');
        jQuery(this).find('.purdue_video_controls_pause_share_play_border').find('.fa-play').removeClass('hidden');
        state = 0;
      }
    });
    // Volume mute/unmute
    jQuery('.purdue_video_controls_black_volume').on('click', function() {
      if ( player.isMuted() ) {
        player.unMute();
        jQuery('.purdue_video_controls_black_volume').find('.fa-volume-mute').addClass('hidden');
        jQuery('.purdue_video_controls_black_volume').find('.fa-volume-up').removeClass('hidden');
      } else {
        player.mute();
        jQuery('.purdue_video_controls_black_volume').find('.fa-volume-mute').removeClass('hidden');
        jQuery('.purdue_video_controls_black_volume').find('.fa-volume-up').addClass('hidden');
      }
    });
    // Toggle Fullscreen
    jQuery(".purdue_video_controls_black_fullscreen").click(function () {
      var e = document.getElementById("player");
      if (e.requestFullscreen) {
        e.requestFullscreen();
      } else if (e.webkitRequestFullscreen) {
        e.webkitRequestFullscreen();
      } else if (e.mozRequestFullScreen) {
        e.mozRequestFullScreen();
      } else if (e.msRequestFullscreen) {
        e.msRequestFullscreen();
      }
    });
    // Progress Bar
    jQuery('.purdue_video_controls_black_timeline').on('mouseup touchend', function (e) {
      var p = jQuery('.purdue_video_controls_black_timeline').offset();
      var c = e.clientX;
      // _timeline
      var tw = ( Math.round(c - p.left) );
      var ts = Math.round( ( tw * player.getDuration() ) / jQuery('.purdue_video_controls_black_timeline').width() );
      jQuery('.purdue_video_controls_black_timeline').find('.time_elapsed').css('width', tw);
      player.seekTo(ts);
    });

    jQuery(".purdue_video_controls_pause_share_share").click(function () {
      jQuery('.modal').addClass('is-active');
      selectText('share_text');
    });
    jQuery('.modal').find('.modal-close').click(function () {
      jQuery('.modal').removeClass('is-active');
    });
    jQuery('.modal').find('.modal-background').click(function () {
      jQuery('.modal').removeClass('is-active');
    });
  }

  // Include script
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/player_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function selectText(node) {
  node = document.getElementById(node);
  if (document.body.createTextRange) {
    const range = document.body.createTextRange();
    range.moveToElementText(node);
    range.select();
  } else if (window.getSelection) {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
  } else {
    console.warn("Could not select text in node: Unsupported browser.");
  }
}

// Mobile Menu
document.addEventListener('DOMContentLoaded', function () {
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener('click', function () {
        var target = $el.dataset.target;
        var $target = document.getElementById(target);
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }
});

document.querySelectorAll('.navbar-item.has-dropdown.is-hoverable.is-mega > a').forEach(function(navbarLink){
  navbarLink.addEventListener('click', function(e){
  	e.preventDefault();
    navbarLink.nextElementSibling.classList.toggle('is-hidden-mobile');
  })
});
var h_carousel = document.querySelector('.carousel .views-element-container');
if ( h_carousel !== null ) {
  var flkty = new Flickity( h_carousel, {
    // options
    wrapAround: true,
    pageDots: false,
    autoPlay: false,
    pauseAutoPlayOnHover: true
  });
}

var v_carousel = document.querySelector('.videos-carousel-inner');
if ( v_carousel !== null ) {
  var flkty = new Flickity( v_carousel, {
    // options
    wrapAround: true,
    pageDots: true,
    autoPlay: false,
    pauseAutoPlayOnHover: true,
    prevNextButtons: false,
  });
}

var n_carousel = document.querySelector('.in-the-news');
if ( n_carousel !== null ) {
  var flkty = new Flickity( n_carousel, {
    // options
    wrapAround: true,
    pageDots: false,
    autoPlay: false,
    pauseAutoPlayOnHover: true,
    prevNextButtons: true,
  });
}

jQuery(document).ready(function($) {
	//Admin view, change bg color for active tab
	$('#block-purduetheme-local-tasks').find('ul:not(.contextual-links)').find('li').find('.is-active').parents('li').css('background-color','#d4d4d4d4');
	//Social Media Menu
	$('[id*=socialmedia] a').each(function () {
		if ($(this).text() == 'facebook') {
			$(this).html('<i class="fab fa-facebook-f"></i>');
		} else if ($(this).text() == 'twitter') {
			$(this).html('<i class="fab fa-twitter"></i>');
		} else if ($(this).text() == 'youtube') {
			$(this).html('<i class="fab fa-youtube"></i>');
		} else if ($(this).text() == 'instagram') {
			$(this).html('<i class="fab fa-instagram"></i>');
		} else if ($(this).text() == 'googleplus') {
			$(this).html('<i class="fab fa-google-plus-g"></i>');
		} else if ($(this).text() == 'linkedin') {
			$(this).html('<i class="fab fa-linkedin-in"></i>');
		} else if ($(this).text() == 'pinterest') {
			$(this).html('<i class="fab fa-pinterest"></i>');
		} else if ($(this).text() == 'snapchat') {
			$(this).html('<i class="fab fa-snapchat-ghost"></i>');
		}
	});
	if($(window).width() < 1024) {
		$('.page_footer').find('.columns').addClass('accordion_footer');
		$('.page_footer').find('.columns').attr('id', 'accordion_footer');
		//Column 1
		$('.page_footer__columns__one').find('h6').wrap('<a href="#page_footer__columns__one_menu" class="footer_trigger" data-action="collapse"></a>');
		$('.page_footer__columns__one').find('.menu').wrap('<div id="page_footer__columns__one_menu" class="is-collapsible" data-parent="accordion_footer" data-allow-multiple="false"></div>');
		// Find DOM node from ID
		var bulmaCollapsibleColOne = document.getElementById('page_footer__columns__one_menu');
		if (bulmaCollapsibleColOne) {
			// Instanciate bulmaCollapsible component on the node
			new bulmaCollapsible(bulmaCollapsibleColOne);
			// Call method directly on bulmaCollapsible instance registered on the node
			bulmaCollapsibleColOne.bulmaCollapsible('collapsed');
		}
		//Column 2
		$('.page_footer__columns__two').find('h6').wrap('<a href="#page_footer__columns__two_menu" class="footer_trigger" data-action="collapse"></a>');
		$('.page_footer__columns__two').find('.menu').wrap('<div id="page_footer__columns__two_menu" class="is-collapsible" data-parent="accordion_footer" data-allow-multiple="false"></div>');
		// Find DOM node from ID
		var bulmaCollapsibleColTwo = document.getElementById('page_footer__columns__two_menu');
		if (bulmaCollapsibleColTwo) {
			// Instanciate bulmaCollapsible component on the node
			new bulmaCollapsible(bulmaCollapsibleColTwo);
			// Call method directly on bulmaCollapsible instance registered on the node
			bulmaCollapsibleColTwo.bulmaCollapsible('collapsed');
		}
		//Column 3
		$('.page_footer__columns__three').find('h6').wrap('<a href="#page_footer__columns__three_menu" class="footer_trigger" data-action="collapse"></a>');
		$('.page_footer__columns__three').find('.menu').wrap('<div id="page_footer__columns__three_menu" class="is-collapsible" data-parent="accordion_footer" data-allow-multiple="false"></div>');
		// Find DOM node from ID
		var bulmaCollapsibleColThree = document.getElementById('page_footer__columns__three_menu');
		if (bulmaCollapsibleColThree) {
			// Instanciate bulmaCollapsible component on the node
			new bulmaCollapsible(bulmaCollapsibleColThree);
			// Call method directly on bulmaCollapsible instance registered on the node
			bulmaCollapsibleColThree.bulmaCollapsible('collapsed');
		}
		//Column 4
		$('.page_footer__columns__four').find('h6').wrap('<a href="#page_footer__columns__four_menu" class="footer_trigger" data-action="collapse"></a>');
		$('.page_footer__columns__four').find('ul.menu').wrap('<div id="page_footer__columns__four_menu" class="is-collapsible" data-parent="accordion_footer" data-allow-multiple="false"></div>');
		// Find DOM node from ID
		var bulmaCollapsibleColFour = document.getElementById('page_footer__columns__four_menu');
		if (bulmaCollapsibleColFour) {
			// Instanciate bulmaCollapsible component on the node
			new bulmaCollapsible(bulmaCollapsibleColFour);
			// Call method directly on bulmaCollapsible instance registered on the node
			bulmaCollapsibleColFour.bulmaCollapsible('collapsed');
		}
	}
	//Place the submenus correctly at the edge of the page
	$('#navbar_top .navbar-item').each(function(){
		var the_item = $(this).offset();
		var the_left = ( the_item.left * -1 )+"px";
		var the_before_width = $(this).width()/2;
		var the_before_left = the_before_width + the_item.left;
		$(this).find('.navbar-dropdown').css('left', the_left);
		$(this).find('.pointer').css('left', the_before_left);
	});

  $('.heading_b').wrapInner( "<span></span>" );

  // Profile pages tabs
  if( $('.profile__content_tabs').length ) {
    $('.profile__content_tabs').find('li').first().addClass('is-active');
    $('.profile__content_tabs_content').find('.profile__content_tabs_content_item').first().addClass('is-active');

    $('.profile__content_tabs li').each(function(){
      $(this).click(function() {
        var tab = $(this).data('tab');

        $('.profile__content_tabs').find('li').removeClass('is-active');
        $(this).addClass('is-active');

        $('.profile__content_tabs_content').find('.profile__content_tabs_content_item').removeClass('is-active');
        $('.profile__content_tabs_content_item[data-content="' + tab + '"]').addClass('is-active');
      });
    });
    $('.profile_trigger'). each(function(){
      $(this).click(function(e){
        e.preventDefault();
        //close everything
        $('.profile_trigger').removeClass('active');
        $('.profile_trigger').parent().siblings(".accordion-body").addClass('is-hidden');
        //open clicked
        $(this).addClass('active');
        $(this).parent().siblings(".accordion-body").removeClass('is-hidden');
      });
    });
  }
  if( $('.in-the-news-home').length ) {
    myh1 = $('.in-the-news-home').find('h2');
    myh1.replaceWith(function(){
      return $("<h1 />").append($(this).contents());
    });
  }
  //move H2 to form
  if( $('.search__page').length ) {
    var destination = $('.search__page').find('.search-form');
    var myH2 = $('.search__page').find('h2');
    if ( !$('.search__page').find('h2').length ) {
      myH2 = $('<h1/>').text("Search results");
    }
    myH2.prependTo(destination);
    myH2.replaceWith(function(){
      return $("<h1 />").append($(this).contents());
    });
  }
  //move image credit
  if( $('.article_image_credit').length ) {
    var c_destination = $('.article_image_description');
    var c_origin = $('.article_image_credit');
    c_origin.appendTo(c_destination);
  }
});
jQuery(window).resize(function() {
	if(jQuery(window).width() < 1024) {
		jQuery('.page_footer').find('.columns').addClass('accordion_footer');
		jQuery('.page_footer').find('.columns').attr('id', 'accordion_footer');
    //Column 1
		jQuery('.page_footer__columns__one').find('h6').wrap('<a href="#page_footer__columns__one_menu" class="footer_trigger" data-action="collapse"></a>');
    jQuery('.page_footer__columns__one').find('.menu').wrap('<div id="page_footer__columns__one_menu" class="is-collapsible" data-parent="accordion_footer" data-allow-multiple="false"></div>');
		// Find DOM node from ID
		var bulmaCollapsibleColOne = document.getElementById('page_footer__columns__one_menu');
		if (bulmaCollapsibleColOne) {
			// Instanciate bulmaCollapsible component on the node
			new bulmaCollapsible(bulmaCollapsibleColOne);
			// Call method directly on bulmaCollapsible instance registered on the node
			bulmaCollapsibleColOne.bulmaCollapsible('collapsed');
		}
		//Column 2
		jQuery('.page_footer__columns__two').find('h6').wrap('<a href="#page_footer__columns__two_menu" class="footer_trigger" data-action="collapse"></a>');
		jQuery('.page_footer__columns__two').find('.menu').wrap('<div id="page_footer__columns__two_menu" class="is-collapsible" data-parent="accordion_footer" data-allow-multiple="false"></div>');
		// Find DOM node from ID
		var bulmaCollapsibleColTwo = document.getElementById('page_footer__columns__two_menu');
		if (bulmaCollapsibleColTwo) {
			// Instanciate bulmaCollapsible component on the node
			new bulmaCollapsible(bulmaCollapsibleColTwo);
			// Call method directly on bulmaCollapsible instance registered on the node
			bulmaCollapsibleColTwo.bulmaCollapsible('collapsed');
		}
		//Column 3
		jQuery('.page_footer__columns__three').find('h6').wrap('<a href="#page_footer__columns__three_menu" class="footer_trigger" data-action="collapse"></a>');
		jQuery('.page_footer__columns__three').find('.menu').wrap('<div id="page_footer__columns__three_menu" class="is-collapsible" data-parent="accordion_footer" data-allow-multiple="false"></div>');
		// Find DOM node from ID
		var bulmaCollapsibleColThree = document.getElementById('page_footer__columns__three_menu');
		if (bulmaCollapsibleColThree) {
			// Instanciate bulmaCollapsible component on the node
			new bulmaCollapsible(bulmaCollapsibleColThree);
			// Call method directly on bulmaCollapsible instance registered on the node
			bulmaCollapsibleColThree.bulmaCollapsible('collapsed');
		}
		//Column 4
		jQuery('.page_footer__columns__four').find('h6').wrap('<a href="#page_footer__columns__four_menu" class="footer_trigger" data-action="collapse"></a>');
		jQuery('.page_footer__columns__four').find('ul.menu').wrap('<div id="page_footer__columns__four_menu" class="is-collapsible" data-parent="accordion_footer" data-allow-multiple="false"></div>');
		// Find DOM node from ID
		var bulmaCollapsibleColFour = document.getElementById('page_footer__columns__four_menu');
		if (bulmaCollapsibleColFour) {
			// Instanciate bulmaCollapsible component on the node
			new bulmaCollapsible(bulmaCollapsibleColFour);
			// Call method directly on bulmaCollapsible instance registered on the node
			bulmaCollapsibleColFour.bulmaCollapsible('collapsed');
		}
	} else {
    //remove elements for Footer Accordions
    jQuery('.page_footer').find('.columns').removeClass('accordion_footer');
		jQuery('.page_footer').find('.columns').attr('id', '');
    //Place the submenus correctly at the edge of the page
  	jQuery('#navbar_top .navbar-item').each(function(){
  		var the_item = jQuery(this).offset();
  		var the_left = ( the_item.left * -1 )+"px";
  		var the_before_width = jQuery(this).width()/2;
  		var the_before_left = the_before_width + the_item.left;
  		jQuery(this).find('.navbar-dropdown').css('left', the_left);
  		jQuery(this).find('.pointer').css('left', the_before_left);
  	});
  }
});

//Podcast Player
if( jQuery(".purdue_podcast_episode_player").length > 0 ) {
  (function(){
    var pcastPlayers = document.querySelectorAll('.purdue_podcast_episode_player');
    var speeds = [ 1, 1.5, 1.75, 2, 2.5 ]

    for(i=0;i<pcastPlayers.length;i++) {
      var player = pcastPlayers[i];
      var audio = player.querySelector('audio');
      var play = player.querySelector('#play');
      var progress = player.querySelector('.purdue_podcast_controls_black_timeline');
      var speed = player.querySelector('.pcast-speed');
      var mute = player.querySelector('.purdue_podcast_controls_black_volume');
      var currentTime = player.querySelector('.purdue_podcast_controls_black_elapsed');
      var duration = player.querySelector('.purdue_podcast_controls_black_total');

      var currentSpeedIdx = 0;

      var toHHMMSS = function ( totalsecs ) {
          var sec_num = parseInt(totalsecs, 10); // don't forget the second param
          var hours   = Math.floor(sec_num / 3600);
          var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
          var seconds = sec_num - (hours * 3600) - (minutes * 60);

          if (hours   < 10) {hours   = "0"+hours; }
          if (minutes < 10) {minutes = "0"+minutes;}
          if (seconds < 10) {seconds = "0"+seconds;}

          var time = hours+':'+minutes+':'+seconds;
          return time;
      }

      audio.addEventListener('loadedmetadata', function(){
        duration.textContent  = toHHMMSS(audio.duration);
      });

      audio.addEventListener('timeupdate', function(){
        progress.querySelector('.time_elapsed').style.width = ((audio.currentTime * 100)/audio.duration)+"%";
        currentTime.textContent  = toHHMMSS(audio.currentTime);
      });

      play.addEventListener('click', function(){
        if (audio.paused == false) {
          this.querySelector('.fa-pause').style.display = 'none';
          this.querySelector('.fa-play').style.display = 'block';
          audio.pause();
        } else {
          this.querySelector('.fa-play').style.display = 'none';
          this.querySelector('.fa-pause').style.display = 'block';
          audio.play();
        }
      }, false);

      progress.addEventListener('click', function(e){
        audio.currentTime = Math.floor(audio.duration) * (e.offsetX / progress.offsetWidth);
        this.querySelector('.time_elapsed').style.width = ((audio.currentTime * 100)/audio.duration)+"%";
      }, false);

      speed.addEventListener('click', function(){
        currentSpeedIdx = currentSpeedIdx + 1 < speeds.length ? currentSpeedIdx + 1 : 0;
        audio.playbackRate = speeds[currentSpeedIdx];
        this.textContent  = speeds[currentSpeedIdx] + 'x';
        return true;
      }, false);

      mute.addEventListener('click', function() {
        if(audio.muted) {
          audio.muted = false;
          this.querySelector('.fas').classList.remove('fa-volume-off');
          this.querySelector('.fas').classList.add('fa-volume-up');
        } else {
          audio.muted = true;
          this.querySelector('.fas').classList.remove('fa-volume-up');
          this.querySelector('.fas').classList.add('fa-volume-off');
        }
      }, false);
    }
  })(this);
}
//share buttons
function showModal(an_id) {
  var x = document.getElementById(an_id);
  x.style.display = "flex";
}
function closeModal(an_id) {
  var x = document.getElementById(an_id);
  x.style.display = "none";
}
