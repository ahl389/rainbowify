# Rainbowify

Turn all your HTML text into rainbows 🌈

### Install

Download the script and drop a link at the bottom of your HTML file.

```html
<script src = "js/rainbow.js"></script>
```

In your HTML, add the class `rainbow` to any element whose contents you want to be rendered in rainbow when the script executes. This script won't change the actual contents of your HTML file.

That's it! Want to use colors that differ from the default?

Add some config info:

```javascript
rainbow.config({
	colors: [<your hex code here>, <your hex code here>, <your hex code here>, <your hex code here>]
});
```

There's no limit on the number of colors you can add to the array. Must use hex codes.


