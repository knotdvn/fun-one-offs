//Javascript


//a .fit div is set to width: 100%;
// its interior h1 is position absolute
//we increase the font size until it breaks the fit div
//then we step back
//this function takes every .fit div
//grabs the h1 inside it,
jQuery(document).ready(function($){


	function fit(){
		alert('on!');
		$('.fit').each(function(){
			var target = $(this).width();
			var obj = $(this).children('h1');
			var fontSize = parseInt($(obj).css('font-size'));
		
			while( $(obj).width() <= target){
				
				fontSize = fontSize + 12;
				$(obj).css('font-size', (fontSize + 'px'));
				
			}//end while less than target
				fontSize = fontSize - 12;
				$(obj).css('font-size', (fontSize + 'px'));


		});//end each fit
	}//end fit
	$(window).on('resize', fit());
});//end doc ready