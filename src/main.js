require('../node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css');

var SDK = require('blocksdk');
var sdk = new SDK(null, null, true); // 3rd argument true bypassing https requirement: not prod worthy

let contentBlockFront, contentBlockBack, flipDirection, flipAnimationDuration ;

const getSettings = () => {
  document.getElementById("form-element-contentBlockFront").value = contentBlockFront;
  document.getElementById("form-element-contentBlockBack").value = contentBlockBack;
  document.getElementById("form-element-flipAnimationDuration").value = flipAnimationDuration;
  if(document.querySelector('input[id="radio-hor"]:checked').value) {
	  flipDirection = 'horizontal'
  } else{ 
	flipDirection = 'vertical'
  }

};

const paintFlipper = () => {
	contentBlockFront = document.getElementById("form-element-contentBlockFront").value;
	contentBlockBack = document.getElementById("form-element-contentBlockBack").value;
	flipAnimationDuration = document.getElementById("form-element-flipAnimationDuration").value;
	if(document.querySelector('input[id="radio-hor"]:checked').value) {
		flipDirection = 'horizontal'
	} else{ 
	  flipDirection = 'vertical'
	}

  sdk.setContent(/*html*/ `
	%%[
		/* Variables for user */
		var @blockOneID, @blockTwoID, @flipAnimationDuration, @contentBlockFront, @contentBlockBack, @flipDirection, @rotate
		
		/* Paste "Content Block ID" as a value in quotes "123456" */
		set @blockOneID = ${contentBlockFront}
		set @blockTwoID = ${contentBlockBack}
		
		/* Change animation duration in milliseconds. 1sec = 1000. Default value 600 */
		
		set @flipAnimationDuration = ${flipAnimationDuration}
		
		/* Choose flip direction: "horizontal" or "vertical". Default value is "vertical" */
		
		set @flipDirection = ${flipDirection}
		
		
		
		/* ============================================================================= */
		
		/* Settings */
		
		set @contentBlockFront = ContentBlockByID(@blockOneID)
		set @contentBlockBack = ContentBlockByID(@blockTwoID)
		
		if @flipDirection == "vertical" then
		set @rotate = "rotateX"
		else
		set @rotate = "rotateY"
		endif
		
	]%%

	<div class="flipper__wrapper">
  <style type="text/css">
    .flipper__wrapper {
      color: #222;
    }

    label {
      -webkit-transform-style: preserve-3d;
      transform-style: preserve-3d;
      display: block;
      width: 100%;
      height: 200px;
      cursor: pointer;
    }

    .card {
      height: 100%;
      width: 100%;
      -webkit-transform-style: preserve-3d;
      transform-style: preserve-3d;
      -webkit-transition-property: all;
      -webkit-transition-duration: %%=v(@flipAnimationDuration)=%%ms;
      transition-property: all;
      transition-duration: %%=v(@flipAnimationDuration)=%%ms;
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
      -webkit-transform: %%=v(@rotate)=%%(180deg);
      transform: %%=v(@rotate)=%%(180deg);
    }

    label:hover .card {
      -webkit-transform: %%=v(@rotate)=%%(20deg);
      transform: %%=v(@rotate)=%%(20deg);
      box-shadow: 0 20px 20px rgba(50, 50, 50, 0.2);
    }

    input {
      display: none;
    }

    /* Since we hide only rotated div, we use :checked property to swap front and back. */
   
    :checked + .card {
      transform: %%=v(@rotate)=%%(180deg);
      -webkit-transform: %%=v(@rotate)=%%(180deg);
    }
        

    label:hover :checked + .card {
      transform: %%=v(@rotate)=%%(160deg);
      -webkit-transform: %%=v(@rotate)=%%(160deg);
      box-shadow: 0 20px 20px rgba(255, 255, 255, 0.2);
    }
  </style>
  
  <!-- Use label > input combination to controll state -->
  <label>
    <input type="checkbox">
    <div class="card">
      <div class="front">front %%=v(@contentBlockFront)=%%</div>
      <div class="back">back %%=v(@contentBlockBack)=%%</div></div></label></div>


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
  paintFlipper();
});

document
  .getElementById("workspace")
  .addEventListener("input", function () {
	paintFlipper();
  });