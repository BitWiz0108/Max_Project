/*	Player  */

import {
	$body,
	$window
} from "../utils/globals.js"
import { loadAjax } from "./ajax.js"
import { updatePopupsBtns } from './popups.js'
import { playListProgress } from './play-list-progress.js'
import {
	setContentSlider,
	moveSlider
} from './slider.js'
import {
	handleFiles
} from './audiovisualisierung.js';

let $player = $('.js-player-music');
let $playerContentArea = $player.find('.js-append-content');
let $playerBtnPrev = $player.find('.js-btn-p-prev');
let $playerBtnNext = $player.find('.js-btn-p-next');
let $playerSlides = $player.find('.player__scroll');
let $playerFooterMedia = $player.find('.widget__media img');
let $playerFooterContent = $player.find('.widget__content');
let $widgetProgress = $player.find('.widget__progress');
let $playerVolume = $player.find('.js-volume');
let $playerSliderHolder = $player.find('.player__single');
let $playerSlider = $player.find('.player__single');
let $toggleListView = $player.find('.js-toggle-list-view');
let $playerBtnPlay = $player.find('.btn-ico--play');
let $audioPlayer = $player.find('#audio-player');

if (!!$player.length) {
	$('#audio-player').equalizer({
		color: "#fff",
		bars: 150,
		barMargin: 0,
		components: 30,
		componentMargin: 0,
		frequency: 9,// rate of equalizer frequency - default is 9 (from 0 to 20)
		refreshTime: 100
	});

	let $eqBar = $('.equalizer');
	let $eqBars = $eqBar.find(".equalizer_bar");

	$eqBar.css('--rotate', 360 / $eqBars.length);

	$eqBars.each((index, bar) => {
		$(bar).css({
			'--rotate': 360 / $eqBars.length * index,
			'--height': getRandomIntInclusive(90, 100),
		});
	})

	function getRandomIntInclusive(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
	}

	let setTimeline;

	let timeline = (audio) => {
		setTimeline = setInterval(() => {
			$widgetProgress.css("--progress", (audio.currentTime / audio.duration) * 100)
		}, 100);
	}

	let playSong = (song) => {
		console.log("Play this song:", song);
		pauseSong();
		let $currentSlide = $player.find(`.slider .slider__media .slick-slide[data-slick-index=${song}] .article--music`);
		let audioPath = $currentSlide.attr('data-src');

		$audioPlayer.attr('src', audioPath);

		console.log("Play this audioPath:", audioPath);
		console.log("Pau a a asdlf as", $audioPlayer[0]);

		let promise = $audioPlayer[0].play();
		handleFiles(audioPath);

		if (promise !== undefined) {
			promise.then(_ => {
				$currentSlide.addClass('is-active');
				$currentSlide.parents('.slick-slide').siblings().find('.article').removeClass('is-active');
				$player.addClass('is-playing')

				clearInterval(setTimeline);
				timeline($audioPlayer[0]);

			}).catch(error => {
				$currentSlide.addClass('is-active');
				$currentSlide.parents('.slick-slide').siblings().find('.article').removeClass('is-active');
				$player.removeClass('is-playing')
			});
		}
	}

	let pauseSong = () => {
		$audioPlayer[0].pause();
	}

	let intplayPause = ($playerBtnPlayList) => {
		$playerBtnPlay
			.unbind('click')
			.on('click', (e) => {
				e.preventDefault();
				let $this = $(e.currentTarget);

				// noT only play/ pause => change Song
				if (!$this.parents('.article').hasClass('is-active') && !!$this.parents('.slider').length) {
					let index = $this.parents('.slick-slide').attr('data-slick-index')
					$player.find('.player__list .article.is-active').parent().siblings().find(`[data-index="${index}"]`).find('.article__media').trigger('click')
					return;
				}

				if ($player.hasClass('is-playing')) {
					$player.removeClass('is-playing')
					pauseSong();
				} else {
					let index = $player.find('.article.is-active').parents('.slick-slide').attr('data-slick-index')
					$player.addClass('is-playing');

					playSong(index);
				}
			})
	}

	$playerContentArea.each((index, area) => {
		let $area = $(area);
		let data = loadAjax($area.attr('data'));

		jQuery.each(data, function (i, item) {
			$area.append(`
				<div class="player__cell" >
					<article 
						class="article article--music"
						data-index="${i}"
						>
						<a href="#" class="article__media">
							<img src="${item.articleImagePath}" alt="article">
					
							<span class="btn-ico btn-ico--blue btn-ico--play btn-ico--big"><!-- is-played -->
								<svg 
									xmlns="http://www.w3.org/2000/svg"
									xmlns:xlink="http://www.w3.org/1999/xlink"
									width="18px" height="24px">
									<path fill-rule="evenodd" d="M16.639,10.388 L2.423,0.694 C2.203,0.545 1.958,0.470 1.713,0.470 C1.467,0.470 1.222,0.545 1.002,0.694 C0.562,0.995 0.291,1.549 0.291,2.149 L0.291,21.535 C0.291,22.136 	0.562,22.690 1.002,22.990 C1.222,23.139 1.467,23.215 1.713,23.215 C1.958,23.215 2.203,23.140 2.423,22.990 L16.639,13.297 C17.079,12.997 17.350,12.443 17.350,11.842 	C17.350,11.242 17.079,10.688 16.639,10.388 Z"/>
								</svg>
					
								<svg 
								 	xmlns="http://www.w3.org/2000/svg"
								 	xmlns:xlink="http://www.w3.org/1999/xlink"
								 	width="20px" height="24px">
									<path fill-rule="evenodd" d="M14.242,23.209 L14.242,0.464 L19.929,0.464 L19.929,23.209 L14.242,23.209 ZM0.026,0.464 L5.713,0.464 L5.713,23.209 L0.026,23.209 L0.026,0.464 Z"/>
								</svg>
							</span>
						</a><!-- /.article__media -->
					
						<div class="article__content">
							<h2>${item.title}</h2>
							<p>${item.autor}</p>
					
							<a href="${item.popupContent}" class="js-show-popup">
								<img src="assets/images/icos/ico-dots.svg" alt="icos">
							</a>
						</div><!-- /.article__content -->
					</article><!-- /.article -->
				</div><!-- /.player__cell -->
			`);

		})

		updatePopupsBtns();
		$playerBtnPlay = $player.find('.btn-ico--play')

	})

	let goToSlide;

	$player.find('.player__list .article .article__media').on('click', (e) => {
		e.preventDefault();
		let $article = $(e.currentTarget).parent();
		let $articleMedia = $(e.currentTarget);
		let articleIndex = $article.attr('data-index');
		let currentData = loadAjax($article.parents('.js-append-content').attr('data'));

		if ($articleMedia.parent().hasClass("is-active")) {
			return;
		}

		$player
			// .toggleClass('player--music player--music-single')
			.find('.article').removeClass('is-active');

		$article.addClass('is-active')

		playListProgress(+articleIndex + 1, currentData.length)


		// 	Footer Content Update 
		$playerFooterContent.find("h4").html(currentData[articleIndex].title)
		$playerFooterContent.find("h6").html(currentData[articleIndex].autor)
		$playerFooterMedia.attr('src', currentData[articleIndex].articleImagePath)

		setContentSlider(currentData);

		let startValue = $playerVolume.eq(0).parent('.progress-ico').css('--progress');
		$audioPlayer[0].volume = startValue / 100;
		$audioPlayer[0].muted = false;

		playSong(articleIndex);


		$playerBtnPlay = $player.find('.btn-ico--play');
		intplayPause($playerBtnPlay);

		clearTimeout(goToSlide);
		moveSlider(articleIndex);

		goToSlide = setTimeout(() => {
			moveSlider(articleIndex)
		}, 300);

	}).eq(0).trigger('click')

	$toggleListView.on('click', (e) => {
		e.preventDefault();
		$player.toggleClass('player--music player--music-single')
	})

	intplayPause($playerBtnPlay);

	$playerBtnPrev.on('click', (e) => {
		e.preventDefault();

		let $prevSlide = $playerSlides.find('.article.is-active').parent().prev()

		if (!!$prevSlide.length) {
			$playerSlides.find('.article.is-active').parent().prev().find('.article .article__media').trigger('click')
		}
	})

	$playerBtnNext.on('click', (e) => {
		e.preventDefault();
		let $nextSlide = $playerSlides.find('.article.is-active').parent().next()

		if (!!$nextSlide.length) {
			$playerSlides.find('.article.is-active').parent().next().find('.article .article__media').trigger('click')
		}
	})


	$playerVolume.each((index, volume) => {
		let $volume = $(volume);
		let startValue = $volume.parent('.progress-ico').css('--progress');

		$volume
			.toggleClass('muted', startValue < 1)
			.find('.volume__slider').slider({
				orientation: "vertical",
				value: startValue,
				slide: function (event, ui) {
					let value = ui.value;
					$playerVolume.parent('.progress-ico').css('--progress', value)
					$volume.toggleClass('muted', value < 1);

					$audioPlayer[0].muted = !value > 0;
					$audioPlayer[0].volume = value / 100;
				},
				change: function (event, ui) {
					let value = ui.value;
					$playerVolume.parent('.progress-ico').css('--progress', value)
					$volume.toggleClass('muted', value < 1);

					$audioPlayer[0].muted = !value > 0;
					$audioPlayer[0].volume = value / 100;
				},
				create: function (event, ui) {
					let value = ui.value;
					$window.on('load', () => {
						$audioPlayer[0].volume = startValue / 100;
						$audioPlayer[0].muted = false;
					})
				}
			});
	})
}
