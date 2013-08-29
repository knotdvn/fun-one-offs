	$('#ohdevens').on('click', function(){
		var palettes = [
			//http://www.colourlovers.com/palette/2845222/Now_its_Our_Turn
			["#e5b800","#fc3d73","#ff8c2E","#f4ff29","#594257"],
			//ohttp://www.colourlovers.com/palette/2845224/Outdoor_Fun
			["#af0410","#85cc19","#5f6a6f","#21272e","#bo9d8d"],
			//http://www.colourlovers.com/palette/2845249/027
			["#7cfc00","#3fe669","#00ced1","#467dda","#8a2be2"],
			//http://www.colourlovers.com/palette/2845392/Olympus
			["#929f43","#ebd080","#9fa87b","#975159","#e7c02c"]

		];
		var choiceP = palettes[Math.floor( Math.random()*(palettes.length ) )];
		var crux = Math.floor( Math.random()*(choiceP.length) );
		var background = choiceP[crux];
		choiceP.splice(crux,1);
		var cost=choiceP.length ;//small optimization
		$('#headline').css('background-color',background);
		$('#headline').css('border-color',choiceP[ Math.floor( Math.random()*(cost) )]);
		var dock = '';
		for(var i = 0; i <= 09; i++){
			dock = dock + '<span class="gross" style="color:' + choiceP[ Math.floor( Math.random()*(cost) )] + ';" >OhDeven</span>'
		}
		var canuck = (Math.floor( Math.random() * 11)) + 5 +'px';

		$('#headline').css('border-width', (Math.floor( Math.random() * 11)) + 10 +'px');
		$('#headline').html(dock);
	});

