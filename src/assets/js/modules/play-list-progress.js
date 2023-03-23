/* Slider Gallery */

export let playListProgress = (active, length) => {
	$('.js-play-list').css('--progress', active/length*100 )
}