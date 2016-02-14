window.onload=function(){

	//move funciton
	var Div  = document.getElementById('js1');
	Div.onmouseover = function(event){
		event.stopPropagation();
		startMove(this,{'left':0});
	}
	Div.onmouseout = function(event){
		event.stopPropagation();
		startMove(this,{'left':-150});
	}

	//opacity change
	var Div_1 = document.getElementById('js2');
	Div_1.onmouseover = function(event){
		event.stopPropagation();
		startMove(this,{'height':500,'width':400},function(){
				startMove(Div_1,{'opacity':100});
			});	
	}
	
	Div_1.onmouseout = function(event){
		event.stopPropagation();
		startMove(this,{'opacity':50},function(){
			startMove(Div_1,{'width':200},function(){
				startMove(Div_1,{'height':200});
			})
		});
	}
}

//startMove(obj,{attr1:itarget1,attr2:itarget2},fn)
function startMove(obj,json,func){	
	clearInterval(obj.timer);
	
	obj.timer = setInterval(function(){
		var flag = true;
		//differnt attribute we use JSON for a loop.
		for(var attr in json){
			// get the current attribute value
			var curr = 0;
			if (attr == 'opacity'){
				curr =  Math.round(parseFloat(getStyle(obj,attr))*100);
			}else{
				curr = parseInt(getStyle(obj,attr));
			}
            
            // Buffer move, get the speed , make the speed change depending on its current value;
 			var speed = (json[attr]-curr)/20;
			speed = speed>0? Math.ceil(speed):Math.floor(speed);
			
			// test if all attribute reach the target value;
			if (curr!=json[attr]){
				flag=false;
				// object keep on moving
				if(attr=='opacity'){
					obj.style[attr] = (curr+speed)/100;
					obj.style.filter = 'alpha(opacity='+curr+speed+')';
					obj.innerHTML = curr+speed;
				}else{
					obj.style[attr] = curr+speed+"px";
				}

			}
		 	//test when it should stop.
			if(flag){
				clearInterval(obj.timer);
				//call back function;
				if(func){
					func();
				}

			}	
		}
	
	},10);
	   
}

function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return window.getComputedStyle(obj,false)[attr];
	}
}


//var json ={a:12, b:13};
//for(var i in json){

//}