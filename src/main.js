require('../node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css');

var SDK = require('blocksdk');
var sdk = new SDK(null, null, true); // 3rd argument true bypassing https requirement: not prod worthy


var imageFrontUrl, imageBackUrl, blockHeight, blockWidth, flipDirection, alignContent, flipTimerInput, enableTimerCheckbox

function paintFlipper () {
	blockHeight = document.getElementById('input-0').value
	imageFrontUrl = document.getElementById('input-1').value
	imageBackUrl = document.getElementById('input-2').value
	blockWidth = document.getElementById('input-3').value
	flipTimerInput = document.getElementById('input-4')
	enableTimerCheckbox = document.getElementById('input-5')

	// Set direction
	if (document.getElementById('radio-1').checked) {
		flipDirection = 'rotateY'
	} else if(document.getElementById('radio-2').checked) {
		flipDirection = 'rotateX'
	}

	// Set position

	if (document.getElementById('radio-3').checked) {
		alignContent = 'flex-start'
	} else if(document.getElementById('radio-4').checked) {
		alignContent = 'center'
	} else if(document.getElementById('radio-5').checked) {
		alignContent = 'flex-end'
	}

	// Set timer

	if (enableTimerCheckbox.checked) {
		flipTimerInput.disabled = false
		document.getElementById('flipper-checkbox').disabled = true
		setTimeout(() => {document.getElementById('flipper-checkbox').checked = true}, flipTimerInput.value)
	} else {
		flipTimerInput.disabled = true
		transitionDelay = 0
	}


	sdk.setContent(`
	<div class="flipper__wrapper">
	<style type="text/css">
	  .flipper__wrapper {
		display: flex;
		justify-content: ${alignContent};
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
		-webkit-transform: ${flipDirection}(180deg);
		transform: ${flipDirection}(180deg);
	  }
  
	  label:hover .card {
		-webkit-transform: ${flipDirection}(20deg);
		transform: ${flipDirection}(20deg);
		box-shadow: 0 20px 20px rgba(50, 50, 50, 0.2);
	  }
  
	  input {
		display: none;
	  }
  
	  /* Since we hide only rotated div, we use :checked property to swap front and back. */
	  :checked + .card {
		transform: ${flipDirection}(180deg);
		-webkit-transform: ${flipDirection}(180deg);
	  }
  
	  label:hover :checked + .card {
		transform: ${flipDirection}(160deg);
		-webkit-transform: ${flipDirection}(160deg);
		box-shadow: 0 20px 20px rgba(255, 255, 255, 0.2);
	  }
	</style>
	<!-- Use label > input combination to controll state -->
	<label>
	  <input type="checkbox" id="flipper-checkbox" name="flipper-checkbox"/>
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
		imageBackUrl: imageBackUrl,
		flipTimerInput: flipTimerInput,
		enableTimerCheckbox: enableTimerCheckbox

	})
}

sdk.getData(function(data) {
	console.log('data',data)
	blockHeight = data.blockHeight
	blockWidth = data.blockWidth
	imageFrontUrl = data.imageFrontUrl 
	imageBackUrl = data.imageBackUrl
	flipTimerInput = flipTimerInput 
	enableTimerCheckbox = enableTimerCheckbox

	paintFlipper()
})


document.getElementById('workspace').addEventListener("input", function () {
	paintFlipper()
});
