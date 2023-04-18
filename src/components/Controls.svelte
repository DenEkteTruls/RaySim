<script>
    let val1Max = 1000;
    let val2Max = 5000;
    let val1 = 0;
    let val2 = 0;
    document.addEventListener("DOMContentLoaded", function() {
      let dialNumber = 0;
      let mouseX;
      let mouseY;
      let dial1 = document.getElementById("dial1");
      let dial2 = document.getElementById("dial2");
      let dial1Box = dial1.getBoundingClientRect();
      let dial2Box = dial2.getBoundingClientRect();
      let dial1CenterPoint = window.getComputedStyle(dial1).transformOrigin;
      let dial2CenterPoint = window.getComputedStyle(dial2).transformOrigin;
      let dial1Centers = dial1CenterPoint.split(" ");
      let dial2Centers = dial2CenterPoint.split(" ");
  
      function rotateDial(e) {
        let pointerEvent = e;
      if (e.targetTouches && e.targetTouches[0]) {
        e.preventDefault(); 
        pointerEvent = e.targetTouches[0];
        mouseX = pointerEvent.pageX;
        mouseY = pointerEvent.pageY;
      } else {
        mouseX = e.clientX,
        mouseY = e.clientY;
      }
  
      if (dialNumber == 1) {
          let centerY = dial1Box.top + parseInt(dial1Centers[1]) - window.pageYOffset;
      let centerX = dial1Box.left + parseInt(dial1Centers[0]) - window.pageXOffset;
      let radians = Math.atan2(mouseX - centerX, mouseY - centerY);
      let degrees = (radians * (180 / Math.PI) * -1) + 180;
      if (degrees > 240 || degrees < 120){
        dial1.style.transform = 'rotate('+degrees+'deg)';
        if (degrees < 240) degrees += 360;
        val1 = Math.round(map(degrees, 240, 360+120, 0, val1Max));
      }
      }
  
      if (dialNumber == 2) {
      let centerY = dial2Box.top + parseInt(dial2Centers[1]) - window.pageYOffset;
      let centerX = dial2Box.left + parseInt(dial2Centers[0]) - window.pageXOffset;
      let radians = Math.atan2(mouseX - centerX, mouseY - centerY);
      let degrees = (radians * (180 / Math.PI) * -1) + 180; 
      if (degrees > 240 || degrees < 120){
        if (degrees < 240) degrees += 360;
        dial2.style.transform = 'rotate('+degrees+'deg)';
        val2 = Math.round(map(degrees, 240, 360+120, 0, val2Max));
      }
    }
  }
  function map(value, from_low, from_high, to_low, to_high) {
    return (((value - from_low) / (from_high - from_low)) * (to_high - to_low)) + to_low;
  }
  
    function distance(dial, e) {
      let mouseX = e.clientX;
      let mouseY = e.clientY;
      let dialBox = dial.getBoundingClientRect();
      let centerX = dialBox.left + dialBox.width / 2;
      let centerY = dialBox.top + dialBox.height / 2;
      let distance = Math.sqrt(Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2));
      return distance;
  }
      window.addEventListener('mousedown', function(e) {
        let dial1Distance = distance(dial1, e);
        let dial2Distance = distance(dial2, e);
        if (dial1Distance < dial2Distance){
          dialNumber = 1;
        }
        else{
          dialNumber = 2;
        }
      });
  
      window.addEventListener('mouseup', function() {
        dialNumber = 0;
      });
      window.addEventListener('mousemove', rotateDial);
      window.addEventListener('touchmove', rotateDial);
      });
  </script>
  
  <div class="container">
    <div class="display">
      <h1 class="displayText">{val1}</h1>
    </div>
    <figure id="pointer-container">
      <img src="pointer.svg" alt id="dial1" class="pointer">
    </figure>
    <div class="display">
      <h1 class="displayText">{val2}</h1>
    </div>
    <div id="pointer-container">
      <img src="pointer.svg" alt id="dial2" class="pointer">
    </div>
  </div>
  
  <style>
    .container {
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 500px;
    }

    #pointer-container{
      width: 100px;
      margin: 3rem;
      margin-bottom: 5rem;
    }
  
    h1{
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  
    .display{
      background-color: black;
      border-radius: 10px;
      border: 4px solid rgb(173, 169, 169);
      height: 70px;
      width: 200px;
      display: flex;
      align-items: center;
      justify-content: right;
      padding-right: 1rem;
    }
    .displayText{
      font-family: "Digital7";
      color: rgb(53, 151, 57);
      font-weight: 100;
      font-size: 40px;
    }
    .pointer{
      transform: rotate(-120deg);
      height: auto;
      position: relative;
      transform-origin: center 59%;
      display: block;
      margin: 0 auto;
      touch-action: none;
      filter: grayscale(100%);
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
      -webkit-user-drag: none;
      -khtml-user-drag: none;
      -moz-user-drag: none;
      -o-user-drag: none;
    }
  </style>