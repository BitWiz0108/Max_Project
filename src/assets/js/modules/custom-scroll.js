/*	Custom Scroll */
import 'jquery-mousewheel';
import 'malihu-custom-scrollbar-plugin';


$(window).on('load', () =>{
	$(".js-scroll-hor").mCustomScrollbar({
		axis:"x",
		autoExpandScrollbar: true,
		advanced:{
			autoExpandHorizontalScroll:true
		},
		// mouseWheel:{
			// axis: "x"
		// }
	});
})		