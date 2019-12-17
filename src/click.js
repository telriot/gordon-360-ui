/*import React, { Component } from 'react';

let ClickButton
ClickButton = (
  <button class="clickButton" type="button" 
  onClick={ function clickEffect(e){
      var d=document.createElement("div");
      d.className="clickEffect";
      d.style.top=e.clientY+"px";d.style.left=e.clientX+"px";
      document.body.appendChild(d);
      d.addEventListener('animationend',function(){d.parentElement.removeChild(d);}.bind(this));
    }
    }>
    Click Effect</button>
);
  */
  
  
  function clickEffect(e){
    var d=document.createElement("div");
    d.className="clickEffect";
    d.style.top=e.clientY+"px";d.style.left=e.clientX+"px";
    document.body.appendChild(d);
    d.addEventListener('animationend',function(){d.parentElement.removeChild(d);}.bind(this));
  }
  
  //function start() { document.addEventListener('click',clickEffect);}

   //clicker effect functions 
   /*const clickEffect = function(e) {
    var d = document.createElement('div');
    d.className = 'clickEffect';
    d.style.top = e.clientY + 'px';
    d.style.left = e.clientX + 'px';
    document.body.appendChild(d);
    d.addEventListener(
      'animationend',
      function() {
        d.parentElement.removeChild(d);
      }
      //.bind(this),
    );
  }
  /*function start(){
              var swtch=document.getElementsByClassName("clickerSwitch");
              if(swtch.checked===true){
              document.addEventListener('click', clickEffect)*/
  //clicker effect button
  /*let ClickButton;
  var clickBut = document.getElementsByClassName("clickButton");
  var hasClickEff = clickBut.hasClickEff;
  if (hasClickEff === "yes"){
    ClickButton = (
      <button
        class="clickButton"
        type="button"
        onClick={function stop() {
        clickBut.hasClickEff = "no";
        document.removeEventListener('click', clickEffect);
        }}
      >
      Stop Click Effect
      </button>
    );  
  }
  else{
    ClickButton = (
      <button
         class="clickButton"
         type="button"
         onClick={function start() {
         clickBut.hasClickEff = "yes";
         document.addEventListener('click', clickEffect);
         }}
       >
       Start Click Effect
       </button>
     );
  }*/
  
  

 
  