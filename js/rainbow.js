class Rainbow {	
	constructor(colors) {
		this.defaultColors = ['#e6194B', '#f58231', '#ffe119', '#3cb44b', '#4363d8', '#911eb4'];
		this.colors = colors ? colors : this.defaultColors;
		this.index = 0;
		this.rainbowified();
	}
	
	config(config) {
		this.colors = config.colors;
		this.rainbowified();
	}
	
	rainbowified() {
		var rainbows = document.querySelectorAll('.rainbow');

		for (let rainbow of rainbows) {
			this.loop(rainbow)
		}
	}
	
	loop(rainbow) {
		var paint = this.paint;
		
		for (let node of rainbow.childNodes) {
			if (node.childNodes.length > 0) {
				this.loop(node);
			} else {
				if (node.nodeType === 3) { 
					var replacementNode = document.createElement('span');
					replacementNode.innerHTML = this.paint(node);
					node.parentNode.insertBefore(replacementNode, node);
					node.parentNode.removeChild(node);
				} else {
					node.innerHTML = this.paint(node);
				}
			}
		}
	}
	
	paint(text){
		var rainbowified = '';

		for (let letter of text.textContent) {
			letter = letter.trim();
			
			if (letter == '') {
				rainbowified += ' ';
			} else {
				rainbowified += `<span style = "color:${this.colors[this.index]}">${letter}</span>`;
				this.index = this.index == this.colors.length - 1 ? 0 : this.index + 1
			}
		}
		
		return rainbowified;
	}
}


const rainbow = new Rainbow();