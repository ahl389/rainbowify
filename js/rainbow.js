class Rainbow {
	var default = ['#e6194B', '#f58231', '#ffe119', '#3cb44b', '#4363d8', '#911eb4']
	
	constructor(colors = default) {
		this.colors = colors;
		this.rainbowified();
	}
	
	rainbowified() {
		$('.rainbow').each(function(){
			var tc = $(this).text()
			var rainbowified = '';
			var index = 0;

			for (letter of tc) {
				rainbowified += `<span style = "color:${rainbow[index]}">${letter}</span>`;
				index = index == rainbow.length - 1 ? 0 : index + 1
				if (index == rainbow.length - 1) { index = 0 } else { index++ }
			}

			$(this).html(rainbowified);
		});
		
	}
}


