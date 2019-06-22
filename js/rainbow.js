class Rainbow {	
    constructor() {
    	this.colors = ['#e6194B', '#f58231', '#ffe119', '#3cb44b', '#4363d8', '#911eb4'];
    	this.colorIndex = 0;
    	this.rainbowify();
    }
	
    /** 
     * Overrides default colors with the user's provided colors
     * @param  {obj}     configSettings - A user provided value that should be an object
     */
    config(configSettings) {
        if (this.validateConfig(configSettings)) {
        	this.colors = configSettings.colors;
        	this.rainbowify();
        }
    }
    
    /**
     * Validates that config settings object exists, has property 'colors' and that the provided hex values are valid
     * @param  {obj}    configSettings - An object with one property (colors), an array of hex colors
     */
    validateConfig(configSettings) {
        if (configSettings) {
            if (configSettings.hasOwnProperty('colors')) {
                for (let color of configSettings.colors) {
                    
                    // this regex verifies that the provided color value is a hex code:
                    // it should have 3 or 6 characters, preceded by a # symbol. The
                    // valid letter range is A-F or a-f.
                    
                    const hexRegex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
                    
                    if (!hexRegex.test(color)) {
                        console.warn(`${color} is an invalid hex code. Using defaults!`);
                        return false;
                    }
                }
            } else {
                console.warn('Whoops, looks like there isn\'t a color property on the config settings object. Using defaults!');
                return false;
            }
        } else {
            console.warn('Whoops, looks like you forgot to pass the config settings object. Using defaults!');
            return false;
        }
        
        console.log('Custom Rainbowifying!')
    	return true;
    }
	
    /** 
     * Indentifies the HTML nodes to be colorized, and initializes the colorizing
     * process for the each node
     */
    rainbowify() {
    	let textToRainbowify = document.querySelectorAll('.rainbow');

    	for (let node of textToRainbowify) {
    		this.processNode(node);
    	}
    }
	
    /** 
     * Processes each node by identifying any childnodes and sending them to be
     * colorized
     * @param  {node}     node - the node to be processed
     */
    processNode(node) {
    	for (let child of node.childNodes) {
		
    		// If the current child node has child nodes, we must recursively process
    		// each child node until we've reached the deepest one so every part of the 
    		// text is appropriately colorized.
		
    		if (child.childNodes.length > 0) {
    			this.processNode(child);
    		} else {
			
    			// If node is a text node, it won't be wrapped in any HTML tags, so we
    			// have to wrap it in a span tag in order to update the node's inner
    			// HTML with appropriately styled text.
			
    			if (child.nodeType === 3) { 
    				let replacementNode = document.createElement('span');
    				replacementNode.innerHTML = this.applyColorStyles(child);
    				child.parentNode.insertBefore(replacementNode, child);
    				child.parentNode.removeChild(child);
    			} else {
    				child.innerHTML = this.applyColorStyles(child);
    			}
    		}
    	}  
    }
	
    /** 
     * Applies correct color to passed node
     * @param  {node}     node - the node to be colorized
     * @return {string}	  rainbowified - the string of colorized text to be inserted into the node
     */
    applyColorStyles(node){
    	let rainbowified = '';

    	for (let char of node.textContent) {
		
    		// If the character has extra whitespace around it, like a line break, we
    		// remove it so the white space does not count as a character to be colorized.
		
    		char = char.trim();
		
    		// If the character is now an empty string, we realize there should be a single
    		// space inserted into the returned string at this position, otherwise we
    		// should apply the color style.
		
    		if (char === '') {
    			rainbowified += ' ';
    		} else {
    			rainbowified += `<span style = "color:${this.colors[this.colorIndex]}">${char}</span>`;
    			this.colorIndex = this.colorIndex === this.colors.length - 1 ? 0 : this.colorIndex + 1;
    		}
    	}
	
    	return rainbowified;
    }
}


const rainbow = new Rainbow();
