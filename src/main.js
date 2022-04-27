require('../node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css');

var SDK = require('blocksdk');
var sdk = new SDK(null, null, true); // 3rd argument true bypassing https requirement: not prod worthy


var imageFrontUrl, imageBackUrl, blockHeight, blockWidth

// function debounce (func, wait, immediate) {
// 	var timeout;
// 	return function() {
// 		var context = this, args = arguments;
// 		var later = function() {
// 			timeout = null;
// 			if (!immediate) func.apply(context, args);
// 		};
// 		var callNow = immediate && !timeout;
// 		clearTimeout(timeout);
// 		timeout = setTimeout(later, wait);
// 		if (callNow) func.apply(context, args);
// 	};
// }


function paintFlipper () {
	blockHeight = document.getElementById('input-0').value
	imageFrontUrl = document.getElementById('input-1').value
	imageBackUrl = document.getElementById('input-2').value
	blockWidth = document.getElementById('input-4').value

	console.log('front', imageFrontUrl, 'back', imageBackUrl)
	sdk.setContent(`
	<div class="flipper__wrapper">
	<style type="text/css">
	  .flipper__wrapper {
	  }
  
	  label {
		-webkit-transform-style: preserve-3d;
		transform-style: preserve-3d;
		display: block;
		height: ${blockHeight}px;
		width: ${blockWidth}px;
		cursor: pointer;
	  }
  
	  .card {
		height: 100%;
		width: 100%;
		-webkit-transform-style: preserve-3d;
		transform-style: preserve-3d;
		-webkit-transition-property: all;
		-webkit-transition-duration: 600ms;
		transition-property: all;
		transition-duration: 600ms;
	  }

	  .card img {
		height: ${blockHeight}px;
		width: ${blockWidth}px;
		object-fit: contain;
	  }
  
	  /* "backface-visibility" used to Hide the back face of two rotated <div> elements. */
	  .card div {
		position: absolute;
		height: 100%;
		width: 100%;
		text-align: center;
		line-height: 200px;
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		border-radius: 2px;
	  }
  
	  /* Only back card remains rotated (hidden) by default */
	  .card .back {
		-webkit-transform: rotateY(180deg);
		transform: rotateY(180deg);
	  }
  
	  label:hover .card {
		-webkit-transform: rotateY(20deg);
		transform: rotateY(20deg);
		box-shadow: 0 20px 20px rgba(50, 50, 50, 0.2);
	  }
  
	  input {
		display: none;
	  }
  
	  /* Since we hide only rotated div, we use :checked property to swap front and back. */
	  :checked + .card {
		transform: rotateX(180deg);
		-webkit-transform: rotateY(180deg);
	  }
  
	  label:hover :checked + .card {
		transform: rotateY(160deg);
		-webkit-transform: rotateY(160deg);
		box-shadow: 0 20px 20px rgba(255, 255, 255, 0.2);
	  }
	</style>
	<!-- Use label > input combination to controll state -->
	<label>
	  <input type="checkbox" />
	  <div class="card">
		<div class="front">
	  		<img src=${imageFrontUrl} />
		</div>
		<div class="back">
	  		<img src=${imageBackUrl} />
		</div>
	  </div>
	</label>

  </div>

	`)

	sdk.setData({
		blockHeight: blockHeight,
		blockWidth: blockWidth,
		imageFrontUrl: imageFrontUrl,
		imageBackUrl: imageBackUrl

	})
}

sdk.getData(function(data) {
	console.log('data',data)
	blockHeight = data.blockHeight
	blockWidth = data.blockWidth
	imageFrontUrl = data.imageFrontUrl 
	imageBackUrl = data.imageBackUrl 

	paintFlipper()
})


document.getElementById('workspace').addEventListener("input", function () {
	paintFlipper()
});
