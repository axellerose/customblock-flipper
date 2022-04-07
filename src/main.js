require('../node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css');

var SDK = require('blocksdk');
var sdk = new SDK(null, null, true); // 3rd argument true bypassing https requirement: not prod worthy

var address, width, height, zoom, link, mapsKey;

function debounce (func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

let fontColor, text;

const getSettings = () => {
  document.getElementById("form-element-color").value = fontColor;
  document.getElementById("form-element-text").value = text;
};

const showText = () => {
  fontColor = document.getElementById("form-element-color").value;
  text = document.getElementById("form-element-text").value;

  sdk.setContent(/*html*/ `

	  <div  style="color: ${fontColor}">
	  <h1>${text}</h1>
  </div>


`);
  sdk.setData({
	fontColor: fontColor,
	text: text,
  });
};

sdk.getData((data) => {
  fontColor = data.fontColor;
  text = data.text;
  getSettings();
  showText();
});

document
  .getElementById("workspace")
  .addEventListener("input", function () {
	showText();
  });