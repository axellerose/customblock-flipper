require('../node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css');

var SDK = require('blocksdk');
var sdk = new SDK(null, null, true); // 3rd argument true bypassing https requirement: not prod worthy

let contentBlockFront, contentBlockBack, flipDirection, flipAnimationDuration ;

const getSettings = () => {
  document.getElementById("form-element-contentBlockFront").value = contentBlockFront;
  document.getElementById("form-element-contentBlockBack").value = contentBlockBack;
//   document.getElementById("form-element-flipAnimationDuration").value = flipAnimationDuration;
  if(document.querySelector('input[id="radio-hor"]:checked')) {
	  flipDirection = 'horizontal'
  } else{ 
	flipDirection = 'vertical'
  }

};

const paintFlipper = () => {
	contentBlockFront = document.getElementById("form-element-contentBlockFront").value;
	contentBlockBack = document.getElementById("form-element-contentBlockBack").value;
	// flipAnimationDuration = document.getElementById("form-element-flipAnimationDuration").value;
	if(document.querySelector('input[id="radio-hor"]:checked')) {
		flipDirection = 'horizontal'
	} else{ 
	  flipDirection = 'vertical'
	}

  sdk.setContent(/*html*/ `
  <div class="flipper__wrapper">
  <style type="text/css">
    .flipper__wrapper {
      font-size: 50px;
      color: #222;
    }

    label {
      -webkit-transform-style: preserve-3d;
      transform-style: preserve-3d;
      display: block;
      width: 300px;
      height: 200px;
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

    /* "backface-visibility" used to Hide the back face of two rotated <div> elements. */
    .card div {
      position: absolute;
      height: 100%;
      width: 100%;
      background: #fff;
      text-align: center;
      line-height: 200px;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      border-radius: 2px;
    }

    /* Only back card remains rotated (hidden) by default */
    .card .back {
      background: #222;
      color: #fff;
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
      <div class="front">I'm front</div>
      <div class="back">I'm back</div>
    </div>
  </label>
</div>


`);
  sdk.setData({
	contentBlockFront: contentBlockFront,
	contentBlockBack : contentBlockBack,
	flipDirection: flipDirection,
	flipAnimationDuration: flipAnimationDuration 
  });
};

sdk.getData((data) => {
	contentBlockFront = data.contentBlockFront,
	contentBlockBack = data.contentBlockBack,
	flipDirection = data.flipDirection,
	flipAnimationDuration = data.flipAnimationDuration
	getSettings();
	paintFlipper();
});

document
  .getElementById("workspace")
  .addEventListener("input", function () {
	paintFlipper();
  });