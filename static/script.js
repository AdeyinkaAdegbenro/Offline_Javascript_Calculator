$(document).ready(function(){
   function evaluate(str){
     str = str.replace('x','*');
     str = str.replace(/([*/+-])\1/g,'$1');
    
     var ans = eval(str);
    if (ans =='Infinity'){
       ans = 'Error';
     }
     else{
       //ans = Math.round(ans *100)/100;
       ans = parseFloat(ans).toPrecision(3);
     }
     return ans;
}
  

function display(value){
      
  $('#info-box').text(value);
}
  
function display2(value){
   
  $('#info-box1').text(value);
}
 

function decimalExists(value){
  //to prevent two decimals from being in the equation
  return /\./.test(value);
}
  
  var operators = ['+','-','x','/'],
  operatorPressed = false,
  btns = $('button'),
   answer = 0,
  inputStr = '', rawInput = '';
 btns.on('click',function(){
   var value = $(this).attr('value');
   switch(value){
     case 'AC':
       inputStr = '0';
       rawInput = '';
       answer = '';
       display(inputStr);
       display2(rawInput);
       break;
      case 'CE':
       inputStr = '';
       rawInput='';
       answer = '';
       display(inputStr);
       display2(rawInput);
      // answer = '';
       break;
     case '.':
       if (!decimalExists(inputStr) ){
        if (inputStr.length < 17) {
          inputStr += value;
          rawInput += value;
        } 
         display(inputStr);
         display2(rawInput);
       }

       break;
     case '=':
       
       answer = evaluate(rawInput);
       display(answer);
       display2(rawInput);
       inputStr = '';
       rawInput = '';
       break;
     default:
       if (operators.indexOf(value)>-1){
         var r = /[+-/x][/x]|[/x][/x]/;
         if (!r.test(rawInput+value)){
         if (answer && !rawInput){
           rawInput += answer;
           inputStr = answer;
         }
         rawInput += value;
         display(inputStr);
         display2(rawInput);
         inputStr = '';
       }
       }
       else if (inputStr==='0'){
        if (inputStr.length < 17){ 
          inputStr = value;
          rawInput = value;
        }
         display(inputStr);
         display2(rawInput);
       }
       else{
        if (inputStr.length < 17) {
         inputStr += value;
         rawInput += value;
        }
         display(inputStr);
         display2(rawInput);
       }
       break;
       
               }
   
 });
  
if ('serviceWorker' in navigator) {
   // we are checking here to see if the browser supports the service worker api
	window.addEventListener('load', function() {
	    navigator.serviceWorker.register('../sw.js').then(function(registration) {
	      // Registration was successful
	      console.log('Service Worker registration was successful with scope: ', registration.scope);
	    }, function(err) {
	      // registration failed :(
	      console.log('ServiceWorker registration failed: ', err);
	    });
	  });
}
  
 
  
});