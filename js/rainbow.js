class Rainbow {	
	constructor() {
		this.colors = ['#e6194B', '#f58231', '#ffe119', '#3cb44b', '#4363d8', '#911eb4'];
		this.colorIndex = 0;
		this.rainbowify();
	}
	
	config(configSettings) {
		this.colors = configSettings.colors;
		this.rainbowify();
	}
	
	rainbowify() {
		let textToRainbowify = document.querySelectorAll('.rainbow');

		for (let node of textToRainbowify) {
			this.processNode(node);
		}
	}
	
	processNode(rainbow) {
		for (let node of rainbow.childNodes) {
			
			// If the current node has child nodes, we must recursively process each
			// child node until we've reached the deepest one so every part of the 
			// text is appropriately colorized.
			
			if (node.childNodes.length > 0) {
				this.processNode(node);
			} else {
				
				// If node is a text node, it won't be wrapped in any HTML tags, so we
				// have to wrap it in a span tag in order to update the node's inner
				// HTML with appropriately styled text.
				
				if (node.nodeType === 3) { 
					let replacementNode = document.createElement('span');
					replacementNode.innerHTML = this.applyColorStyles(node);
					node.parentNode.insertBefore(replacementNode, node);
					node.parentNode.removeChild(node);
				} else {
					node.innerHTML = this.applyColorStyles(node);
				}
			}
		}
	}
	
	applyColorStyles(node){
		let rainbowified = '';

		for (let char of node.textContent) {
			
			// If the character has extra whitespace around it, like a line break, we
			// remove it so the white space does not count as a character to be colorized.
			
			char = char.trim();
			
			// If the character is now an empty string, we realize there should be a single
			// space inserted into the returned string at this position, otherwise we
			// should apply the color style.
			
			if (char == '') {
				rainbowified += ' ';
			} else {
				rainbowified += `<span style = "color:${this.colors[this.colorIndex]}">${char}</span>`;
				this.colorIndex = this.colorIndex == this.colors.length - 1 ? 0 : this.colorIndex + 1;
			}
		}
		
		return rainbowified;
	}
}


const rainbow = new Rainbow();