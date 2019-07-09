drawCanvas=document.getElementById("my-canvas");
cntxt=drawCanvas.getContext("2d");
lineBtn=document.getElementById("ab-line");
circBtn=document.getElementById("ab-circle");
rectBtn=document.getElementById("ab-rect");
handBtn=document.getElementById("ab-freehand");
fillBtn=document.getElementById("fill-color");
strokeBtn=document.getElementById("stroke-color")
eraswBtn=document.getElementById("ab-eraser");


var offsetX=drawCanvas.getBoundingClientRect().left;
var offsetY=drawCanvas.getBoundingClientRect().top;
var dragging=false;
var keepImage;
var fillFlag=0;
var strokeFlag=1;
var firstStroke=0;



drawCanvas.addEventListener("mousedown",mouseDownTriger);
drawCanvas.addEventListener("mouseup",mouseUpTriger);
drawCanvas.addEventListener("mousemove",moseMoveTriger);


lineBtn.addEventListener("click",changeState);
circBtn.addEventListener("click",changeState);
rectBtn.addEventListener("click",changeState);
handBtn.addEventListener("click",changeState);
eraswBtn.addEventListener("click",changeState);

fillBtn.addEventListener("click",changeFill);
strokeBtn.addEventListener("click",changeStroke);

var state={
    circle:0,rect:0,hand:0,line:0,erase:0
};

function changeFill(){
    if(fillFlag==1){
        fillFlag=0;
    }
    else {fillFlag=1;}
    
}

function changeStroke(){
    if(strokeFlag==1&&firstStroke!=0){
        strokeFlag=0;
    }
    else {
        strokeFlag=1;
        
    }
    firstStroke=1;
}

function changeState(e){
    for(var key in state) {
        state[key]=0;
      }
    cntxt.globalCompositeOperation="source-over";
      
    if(e.target.value=="Line")
    {
        state.line=1;
    }
    else if(e.target.value=="Circle")
    {
        state.circle=1;
    }
    else if(e.target.value=="Rect")
    {
        state.rect=1;
    }
    else if(e.target.value=="Free Hand")
    {
        state.hand=1;
    }
    else if(e.target.value=="Eraser")
    {
        state.erase=1;
    }
    

}

function keepImage(){
    
    keep=cntxt.getImageData(0,0,drawCanvas.width,drawCanvas.height);
}

function putImage(){
    cntxt.putImageData(keep,0,0);
}


function mouseDownTriger(event){       //start drag
   dragging=true;
    moveX=(event.pageX)-offsetX;
    moveY=(event.pageY)-offsetY;
    if(state.hand==0||state.erase==0){
        keepImage();  
    }
     
    
}

function mouseUpTriger(event){
    dragging=false;
  
    endX=(event.pageX)-offsetX;  
    endY=(event.pageY)-offsetY;  
    cntxt.beginPath();  ///////////
   
}

function moseMoveTriger(event){     //dragging
   
    endX=(event.pageX)-offsetX;
    endY=(event.pageY)-offsetY;
    if(dragging===true)
    {   
      
        if(state.hand==0||state.erase==0){
            putImage();
        }
       
        
        if(state.line==1){
            drawLine();
        }
        else if(state.circle==1)
        {
            drawCircle()
        }
        else if(state.rect==1)
        {
            
            drawRect()
        }
        else if(state.hand==1)
        {
            drawHand();
        }
        else if(state.erase==1)
        {
            drawErase();
        }
        
    }
   
}

function drawErase(){
   cntxt.lineCap="round";
   cntxt.lineWidth=5;
   cntxt.globalCompositeOperation="destination-out";
    cntxt.lineTo(endX, endY);
    cntxt.strokeStyle=strokeBtn.value;
    cntxt.stroke();
}

function drawLine(){
    cntxt.beginPath();
    cntxt.moveTo(moveX, moveY);
    cntxt.lineTo(endX, endY);
    cntxt.strokeStyle=strokeBtn.value;
    cntxt.stroke();
}

function drawCircle(){
    cntxt.beginPath();
    cntxt.arc(moveX, moveY, Math.sqrt(Math.pow((endX-moveX),2)+Math.pow((endY-moveY),2)), 0, 2 * Math.PI);
    //cntxt.stroke();
    if(strokeFlag==1)
    {
        cntxt.strokeStyle=strokeBtn.value;
        cntxt.stroke();
    }
    if(fillFlag==1){
        cntxt.fillStyle=fillBtn.value;
        cntxt.fill();
    }
}

function drawRect(){
    cntxt.beginPath();
    cntxt.rect(moveX, moveY,(endX-moveX),(endY-moveY));
    if(strokeFlag==1)
    {
        cntxt.strokeStyle=strokeBtn.value;
        cntxt.stroke();
    }
    
    if(fillFlag==1){
        cntxt.fillStyle=fillBtn.value;
        cntxt.fill();
    }
    
    
    
}

function drawHand(){
   //cntxt.beginPath();
   cntxt.lineCap="round";
   //cntxt.lineJoin="round";
   cntxt.lineWidth=5;
  // cntxt.moveTo(moveX, moveY);
    cntxt.lineTo(endX, endY);
    //cntxt.closePath();
    cntxt.strokeStyle=strokeBtn.value;
    cntxt.stroke();
    

}