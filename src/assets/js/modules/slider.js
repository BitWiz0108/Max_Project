/* Slider Gallery */

import 'slick-carousel';
import { loadAjax } from "./ajax.js"
import { updatePopupsBtns } from './popups.js'
import { deepEqual } from './check-obj-equal.js'

let $slider = $('.js-slider');
let $sliderMedia = $slider.find('.slider__media-slides')
let $sliderContent = $slider.find('.slider__content-slides')
let lastUsedData;

export let setContentSlider = (data) => {
	if (deepEqual(lastUsedData, data)) {
		return
	}

	if ($sliderMedia.hasClass('slick-initialized')) {
        $sliderMedia.slick('unslick');
        $sliderContent.slick('unslick');
    }

	lastUsedData = data;
	$sliderMedia.html('');
	$sliderContent.html('');

	jQuery.each( data, function( i, item ) {
		$sliderMedia.append(`
			<div class="slider__media-slide">
				<div
					class="article article--music"
					data-src="${item.song}"
					>
					<div class="article__media">
						<img src="${item.articleImagePath}" alt="image">

						<a href="#" class="btn-ico btn-ico--blue btn-ico--play btn-ico--big js-btn-play"><!-- is-played -->
							<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18px" height="24px">
								<path fill-rule="evenodd" d="M16.639,10.388 L2.423,0.694 C2.203,0.545 1.958,0.470 1.713,0.470 C1.467,0.470 1.222,0.545 1.002,0.694 C0.562,0.995 0.291,1.549 0.291,2.149 L0.291,21.535 C0.291,22.136 	0.562,22.690 1.002,22.990 C1.222,23.139 1.467,23.215 1.713,23.215 C1.958,23.215 2.203,23.140 2.423,22.990 L16.639,13.297 C17.079,12.997 17.350,12.443 17.350,11.842 	C17.350,11.242 17.079,10.688 16.639,10.388 Z"></path>
							</svg>

							<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="24px">
								<path fill-rule="evenodd" d="M14.242,23.209 L14.242,0.464 L19.929,0.464 L19.929,23.209 L14.242,23.209 ZM0.026,0.464 L5.713,0.464 L5.713,23.209 L0.026,23.209 L0.026,0.464 Z"></path>
							</svg>
						</a>
					</div><!-- /.article__media -->
				</div><!-- /.article -->
			</div><!-- /.slider__slide -->
		`)

		$sliderContent.append(`
			<div class="slider__content-slide">
				<div class="article">
					<div class="article__content">
						<h2>${item.title}</h2>
						<h6>${item.autor}</h6>
						<p>${item.content}</p>

						<a href="${item.popupContent}" class="js-show-popup">
							<img src="assets/images/icos/ico-dots.svg" alt="icos">
						</a>
					</div>
				</div><!-- /.article -->
			</div><!-- /.slider__slide -->
		`)
	})

	updatePopupsBtns();
	intSlider()
}

let intSlider = () => {
	$slider.each((index, slider) => {
		let $slider = $(slider)
		let $sliderMedia = $slider.find('.slider__media-slides')
		let $sliderContent = $slider.find('.slider__content-slides')

		$sliderMedia.on('init', function(event, slick){
		}).slick({
			infinite: false,
		  	slidesToShow: 5,
		  	centerPadding: '0',
		  	slidesToScroll: 1,
		  	arrows: false,
		  	centerMode: true,
		  	dots: true,
		  	fade: false,
		  	asNavFor: $sliderContent,
		  	focusOnSelect: true,
		  	responsive: [
		  	    {
		  	      	breakpoint: 1024,
		  	      	settings: {
		  				slidesToShow: 3,
		  	      	}
		  	    },
		  	    {
		  	      	breakpoint: 480,
		  	      	settings: {
		  	        	slidesToShow: 1,
		  	        	centerPadding: '80px',
		  	      	}
		  	    }
		  	]
		}).on('beforeChange', function(event, slick, currentSlide, nextSlide){
			let $activeSlide = $(slick.$slides[nextSlide])
			$activeSlide.prev().addClass('slick-slide--prev').siblings().removeClass('slick-slide--prev')
		});
		
		$sliderContent.slick({
			infinite: false,
		  	fade: true,
		  	slidesToShow: 1,
		  	slidesToScroll: 1,
		  	asNavFor: $sliderMedia,
		  	dots: false,
		  	arrows: false,
		});
	})
}

export let updateSlider = () => {
	$sliderMedia.slick('refresh');
	$sliderContent.slick('refresh');
}

export let moveSlider = (index) => {
	$sliderMedia.slick('slickGoTo', index);
}


