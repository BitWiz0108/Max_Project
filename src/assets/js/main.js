import "./modules/click-events.js"
import "./modules/popups.js"
import "./modules/player-streams.js"
import "./modules/player-music.js"
import "./modules/slider.js"
import "./modules/custom-scroll.js"
import "./modules/form-validation.js"
import "./modules/nav.js"
import {
	$window,
	$body
} from "./utils/globals.js"

import "./modules/id3-minimized.js"
import "./modules/audiovisualisierung.js"
import "./modules/bufferloader.js"
/*
 * Modules
 */

$('.js-bg-video').each((index, video) => {
	video.play()
})


let $player = $('.player');
if (!!$player.length) {
	let $playerFoot = $player.find('.player__foot')

	$player.css('--player-foot-height', $playerFoot.outerHeight()+"px");

	$(window).on('load resize', () =>{
		$player.css('--player-foot-height', $playerFoot.outerHeight()+"px");
	})
}


if ($window.outerWidth() < 768) {
	$body.addClass('min-aside');
}