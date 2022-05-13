/*console.log('this varby is: ' + varby); //varby has been declared, but not assigned, or whatever.  Thus, it comes back undefined.
var varby='cat';
console.log('later, this varby is: ' + varby); //varby now comes back as cat, because it has now been assigned, too ^_^

//console.log('barl is: ' + barl); //this will crash the JS, because it has not been declared  
let barl='dog';
console.log('later, barl is: ' + barl);*/

//let manifest = chrome; //.runtime.getManifest() //lolz, this idd not work ^_^
//console.log(chrome.runtime);
//alert(manifest.version);

//canvas controllers ^_^
let points =[
{pressedX: 0, pressedY: 0, releasedX: 0, releasedY: 0},
{pressedX: 0, pressedY: 0, releasedX: 0, releasedY: 0},
{pressedX: 0, pressedY: 0, releasedX: 0, releasedY: 0},
{pressedX: 0, pressedY: 0, releasedX: 0, releasedY: 0}
]
points.level=0; //holds how deep we are into the points ^_^

let paintArray = {colorValues: [], gradDivValues: [], fillIn: "", fillType: "outline"};
let mode=""; let mode1=""; let mode2=""; let drawTimer="";

const conSolo=document.getElementById("conSolo");
const myCanvas = document.getElementById("testCanvas");

let colorInput=[]; //holds the elements used for coloring
let invertedColorArray=[]; //holds inverted color array values ^_^

const shadowControl=document.getElementById("shadowControl");
const lineControl=document.getElementById("lineControl");
const textControl=document.getElementById("textControl");
const colorControl=document.getElementById("colorControl");
const colorSection=document.getElementById("colorSection");
const gradientControl=document.getElementById("gradientControl");
const otherControl=document.getElementById("otherControl");
const stampControl=document.getElementById("stampControl");
const paintGameControl=document.getElementById("paintGameControl");

//New!
const gradStyleControl=document.getElementById("gradientStyleFieldset");
const gradControl=document.getElementById("gradientFieldset");
const patternControl=document.getElementById("patternFieldset");
const gradControlControl=document.getElementById("gradientControlFieldset");
const gradDivControl=document.getElementById("gradientDivisions");
const controllerControl=document.getElementById("controllersFieldset");

const xGradient=document.getElementById("xGradient");
const yGradient=document.getElementById("yGradient");

let drawings=[];
let record=true; //whether to record "drawing info ^_^"

const colorGradOptions=document.getElementById("colorGradOptions");
const shadowOptions = document.getElementById("shadowOptions");
const lineOptions = document.getElementById("lineOptions");
const textOptions = document.getElementById("textOptions");
const otherOptions=document.getElementById("otherOptions");
const stampOptions=document.getElementById("stampOptions");
const paintGameOptions = document.getElementById("paintGameOptions");
const addColorButton = document.getElementById("addColor");
const removeColorButton = document.getElementById("removeColor");
const fileToUpload = document.getElementById("filetoupload");
const radioGradients=document.getElementsByName("gradient");


//default settings for menus ^_^
shadowControl.className="invisible";
lineControl.className="invisible";
textControl.className="invisible";
colorControl.className="controlMenu";
otherControl.className="invisible";
stampControl.className="invisible";
paintGameControl.className="invisible";

colorGradOptions.addEventListener("click", controlDisplay);
shadowOptions.addEventListener("click", controlDisplay);
lineOptions.addEventListener("click", controlDisplay);
textOptions.addEventListener("click", controlDisplay);
otherOptions.addEventListener("click", controlDisplay);
stampOptions.addEventListener("click", controlDisplay);
paintGameOptions.addEventListener("click", controlDisplay)
addColorButton.addEventListener("click", addColor);
removeColorButton.addEventListener("click", removeColor);
fileToUpload.addEventListener("change", updatePaintArray);

for (var r=0; r < radioGradients.length; r++){
	radioGradients[r].addEventListener("click", (event)=>{
		updateRadioColorGradientDisplay(event.target.value);
	});
}

//5/21/2020.  File uploader! PS:  Cut and paste, hehe :D
const handleImageUpload = event => { //this one crashes

  const files = event.target.files
  const formData = new FormData()
  formData.append('myFile', files[0])
  //thus far ^_^.  console.log('line 88 of main.js!')
  fetch('/fileupload', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log(data.path)
  })
  .catch(error => {
    console.error(error)
  })
}

function sendData( data ) {
  const XHR = new XMLHttpRequest(),
        FD  = new FormData();

  // Push our data into our FormData object
  for( name in data ) {
    FD.append( name, data[ name ] );
  }

  // Define what happens on successful data submission
  XHR.addEventListener( 'load', function( event ) {
    alert( 'Yeah! Data sent and response loaded.' );
  } );

  // Define what happens in case of error
  XHR.addEventListener(' error', function( event ) {
    alert( 'Oops! Something went wrong.' );
  } );

  // Set up our request
  XHR.open( 'POST', '/fileupload' ); //https://example.com/cors.php

  // Send our FormData object; HTTP headers are set automatically
  XHR.send( FD );
}

document.getElementById("formSubmit").addEventListener("submit", (event)=>{
	event.preventDefault();
	//let fileInput=document.getElementById("filetoupload").files[0];  //alert(fileInput.name); //good :)
	//sendData(fileInput); //result: using this way, we still don't get the path and my server crashes over it :/
	
	//handleImageUpload(event); //result: similar path crash???

	let form=document.getElementById("formSubmit");
	form.action='/fileupload';
	form.method="POST";
	let disFile=document.getElementById("filetoupload");
	alert('disFile.name is ' + disFile.name);
	form.submit(); //result: this still take me to a place I don't want to go. It's basically the same as a regular submit event :/
});

document.getElementById("filetoupload").addEventListener("change", (event)=>{
	//console.log(event.target.value);
	let fileInput=document.getElementById("filetoupload").files[0];
	let url = URL.createObjectURL(fileInput);
	let imageHolder=document.getElementById("secretImageHolder").setAttribute("src", url);
	let imageHolder1=document.getElementById("secretImageHolder1").setAttribute("src", url);
	//fileControl(fileInput, "url"); //this gets the picture, but the url was loooooong!
	//fileControl(fileInput, "text");
});

const sendPic= (event)=>{
}

function fileControl(input, action){
	let file=input;
	console.log(`file name is: ${file.name}`);
	console.log(`last modified: ${file.lastModified}`);

	const reader = new FileReader();
	if(action=="url"){
		let imageHolder=document.getElementById("secretImageHolder");//setAttribute("src", url);
		let imageHolder1=document.getElementById("secretImageHolder1");

		reader.addEventListener("load", function () {
		// convert image file to base64 string
		imageHolder.src=reader.result;
		imageHolder1.src=reader.result;
		return(reader.result);
		}, false);

		if (file) {
			reader.readAsDataURL(file);
		}
	}
	else if(action=="text"){
		reader.addEventListener("load", function () {
		console.log(reader.result);
		return(reader.result);
		}, false);

		if (file) {
			reader.readAsText(file);
		}
	}
	else if(action=="arrayBuffer"){
		reader.addEventListener("load", function () {
		console.log(reader.result);
		return(reader.result);
		}, false);

		if (file) {
			reader.readAsArrayBuffer(file);
		}
	}
}

/*document.querySelector('#fileUpload').addEventListener('change', event => {
  handleImageUpload(event)
});














*/
// ----------- File uploader end :D

function loadColorList(){
	let colorList = document.getElementsByName("colors");
	let colorGradientList = document.getElementsByName("colorDivisions");
	let info0, info1, info2, info3;
	for (var c=0; c < colorList.length; c++){

		if((typeof(colorList[c]!==undefined))&&(typeof(colorList[c])!==null)){
			info0=colorList[c].getAttribute("id");
			info1="colorLabel" + c.toString();
			info2=colorGradientList[c].getAttribute("id");
			info3="colorDivLabel" + c.toString();
			colorInput[c]=[info0, info1, info2, info3];
		}
	}
}
loadColorList();

function easierColorSelection(){
	let returnValue="#"; let deciNum=""; let display;
	const colorInputRanges = document.getElementsByName("colorInputRanges");
	for (var c=0; c < colorInputRanges.length; c++){
		deciNum=colorInputRanges[c].value;
		display=document.getElementById("colorOutputDisplay" + c.toString());
		returnValue+=base10To16(deciNum, "string", "string");
		if(deciNum.length==3){
			display.innerHTML=deciNum;
		}
		else if(deciNum.length==2){
			display.innerHTML="0" + deciNum;
		}
		else if(deciNum.length==1){
			display.innerHTML="00" + deciNum;
		}
	}

	let selectedElement=findColorInput();
	if(selectedElement!==undefined){
		selectedElement.value=returnValue;
	}
	//alert("returnValue is: " + returnValue);

	//draw color on the color canvas ^_^
	const colorCanvas = document.getElementById("colorCanvas");
	const cxt=colorCanvas.getContext("2d");

	cxt.beginPath();
	cxt.rect(0,0, colorCanvas.width, colorCanvas.height);
	cxt.fillStyle=returnValue;
	cxt.fill();

	updateDivisionDisplay();
}

function findColorInput(){
	const colors=document.getElementsByName("colors");
	//alert('colors.length is: ' + colors.length);
	for(var c=0; c < colors.length; c++){
		if(colors[c].className=="selected"){
			return(colors[c]);
		}
	}

	//if we got to here, it means we didn't find it in the standard place.  Check other places ^_^
	const otherColorInputs=document.getElementsByName("otherColorInputs");
	//alert('colors.length is: ' + colors.length);
	for(var c=0; c < otherColorInputs.length; c++){
		if(otherColorInputs[c].className=="selected"){
			return(otherColorInputs[c]);
		}
	}
}

document.getElementById("doesDivHaveFries").addEventListener("click", (event)=>{
	//alert(event.target.value);
	const myCanvas = document.getElementById("testCanvas"); //why can't I get the regular drawing to be so centered?
	const context=myCanvas.getContext("2d");
	//check 709 next?
	var x      = points[0].pressedX;
	var y      = points[0].pressedY;
	var width  = (points[0].releasedX-points[0].pressedX)/2;
	var height = (points[0].releasedY-points[0].pressedY)/2;
	var cx     = x + 0.5 * width;   // x of shape center
	var cy     = y + 0.5 * height;  // y of shape center

	context.fillStyle = "#ff0000";
	context.fillRect(x, y, width, height);  //draw normal shape

	context.translate(cx, cy);              //translate to center of shape
	context.rotate( (Math.PI / 180) * 45);  //rotate 45 degrees.
	context.translate(-cx, -cy);            //translate center back to 0,0

	context.fillStyle = "#0000ff";
	context.fillRect(x, y, width, height);
});

function base10To16(num, type, returnType){
	let stringNum=""; let realNum=0;
	
	if(type=="string"){
		realNum=parseInt(num, 10);
		stringNum=realNum.toString(16);
	}
	else if(type=="number"){
		stringNum=num.toString(16);
	}
	//realNum=parseInt(stringNum, 16); //lolz, this would convert from base 16 to 10 again ^_^

	if((returnType=="string")){
		if(stringNum.length<2){ //so the number coming back has 2 digits (helpful for colors ^_^)
			let newString="0"+stringNum;
			return(newString);
		}
		else{
			return(stringNum);	
		}
		
	}
	//else if (returnType=="number"){
	//	return(realNum);
	//}
}

function colorInputClickers (){
	const colorInputRanges = document.getElementsByName("colorInputRanges");
	for (var c=0; c < colorInputRanges.length; c++){
		colorInputRanges[c].addEventListener("mouseup", easierColorSelection)
	}	
}

colorInputClickers();



function findFreeColorIndex(){
	for (var c=0; c < colorInput.length; c++){
		if((typeof(colorInput[c][1]!==undefined))&&(typeof(colorInput[c][1])!==null)){
			if(colorInput[c][0]!==("colorInput" + c.toString())){ //if we found a gap...
				console.log("colorInput[c][0] is: " + colorInput[c][0] + "made id is: " + "colorInput" + c.toString())
				return(c);
			}			
		}
	}
	return(colorInput.length);
}

const addColorSelector = (event)=>{
	const colorInputs=document.getElementsByName("colors");
	let foundSelected=false;
	for(var i=0; i < colorInputs.length; i++){
		if(colorInputs[i]==event.target){
			colorInputs[i].className="selected";
			foundSelected=true;
		}
		else {
			colorInputs[i].className="";
		}
	}

	if(foundSelected==false){
		const otherColorInputs=document.getElementsByName("otherColorInputs");
		for(var i=0; i < otherColorInputs.length; i++){
			if(otherColorInputs[i]==event.target){
				otherColorInputs[i].className="selected";
			}
			else {
				otherColorInputs[i].className="";
			}
		}
	}
}

function addColor(){
	let colorLimit=10;
	if(colorInput.length<colorLimit){
		let freeIndex=findFreeColorIndex();
		const gradientDivisions = document.getElementById("gradientDivisions");
		//create label and color input thingy
		let eyeDee= "colorInput"+freeIndex.toString();
		let labelId="colorLabel" + freeIndex.toString();

		const colorLabel=document.createElement("LABEL");
		colorLabel.innerHTML="color" + freeIndex.toString() + ": ";
		colorLabel.setAttribute("for", eyeDee);
		colorLabel.setAttribute("id", labelId);
		colorSection.appendChild(colorLabel);

		const colorIE=document.createElement("INPUT");
		colorIE.addEventListener("click", addColorSelector);
		colorIE.setAttribute("id", eyeDee);
		colorIE.setAttribute("type", "text");
		colorIE.setAttribute("name", "colors");
		colorSection.appendChild(colorIE);

		//do the same thing, but for the color divisions ^_^
		let colorDivisionId= "gradientDiv"+freeIndex.toString();
		let colorDivisionLabelId="colorDivLabel" + freeIndex.toString();

		const colorDivisionLabel=document.createElement("LABEL");
		colorDivisionLabel.innerHTML=`divison${freeIndex} (color${freeIndex-1} & color${freeIndex}): `
		colorDivisionLabel.setAttribute("for", colorDivisionId);
		colorDivisionLabel.setAttribute("id", colorDivisionLabelId);
		gradientDivisions.appendChild(colorDivisionLabel);

		const colorGradientIE=document.createElement("INPUT");
		colorGradientIE.setAttribute("id", colorDivisionId);
		colorGradientIE.setAttribute("type", "text");
		colorGradientIE.setAttribute("name", "colorDivisions");
		gradientDivisions.appendChild(colorGradientIE);

		colorInput[freeIndex]=[eyeDee, labelId, colorDivisionId, colorDivisionLabelId];
		console.log(colorInput[freeIndex]);
		console.log(colorInput.length);
	}
}

function removeColor(){ //I think I'm just going to remove the last one, haha ^_^
	if(colorInput.length>2){ //don't let color0 and color1 be removed ^_^.
		let id=colorInput[colorInput.length-1][0];
		const gradientDivisions = document.getElementById("gradientDivisions");

		for (var c=0; c < colorInput.length; c++){
			if(colorInput[c][0]==id){
				console.log(colorInput[c][0])
				const inputE = document.getElementById(colorInput[c][0]);
				const labelE = document.getElementById(colorInput[c][1]);
				const gradientInputE = document.getElementById(colorInput[c][2]);
				const gradientLabelE = document.getElementById(colorInput[c][3]);
				colorSection.removeChild(inputE); //remove input ^_^
				colorSection.removeChild(labelE); //remove label
				gradientDivisions.removeChild(gradientInputE); //remove input ^_^
				gradientDivisions.removeChild(gradientLabelE); //remove label
				colorInput.splice(c, 1);
			}
		}		
	}	
}

function controlDisplay(){ //controls what buttons are shown ^_^
	//console.log('line 163!')
	let type0=this.id;
	//console.log('type0 is ' + type0)
	//gradientControl
	switch(type0){
		case "colorGradOptions":
			shadowControl.className="invisible";
			lineControl.className="invisible";
			textControl.className="invisible";
			colorControl.className="controlMenu";
			otherControl.className="invisible";
			stampControl.className="invisible";
			paintGameControl.className="invisible";
			updateDivisionDisplay(); //this will decide whether to make the gradient control visible, and how much of it to make visible ^_^
			var value=getRadioValue("fillStatus", "outline");
			var gradient=getRadioValue("gradient", "noGradient");
			//alert('line 442.  value is: ' + value + ", gradient is: " + gradient);
			if(value!="outline"){ //simulates of on of the fillstatus buttons was clicked ^_^
				gradientControl.className="controlMenu";
			}
			else {
				gradientControl.className="invisible";
			}
			updateRadioColorGradientDisplay(gradient);
		break;

		case "shadowOptions":
			shadowControl.className="controlMenu";
			lineControl.className="invisible";
			textControl.className="invisible";
			colorControl.className="invisible";
			gradientControl.className="invisible";
			otherControl.className="invisible";
			stampControl.className="invisible";
			paintGameControl.className="invisible";
		break;

		case "lineOptions":
			shadowControl.className="invisible";
			lineControl.className="controlMenu";
			textControl.className="invisible";
			colorControl.className="invisible";
			gradientControl.className="invisible";
			otherControl.className="invisible";
			paintGameControl.className="invisible";
		break;

		case "textOptions":
			shadowControl.className="invisible";
			lineControl.className="invisible";
			textControl.className="controlMenu";
			colorControl.className="invisible";
			gradientControl.className="invisible";
			otherControl.className="invisible";
			stampControl.className="invisible";
			paintGameControl.className="invisible";
		break;		

		case "otherOptions":
			shadowControl.className="invisible";
			lineControl.className="invisible";
			textControl.className="invisible";
			colorControl.className="invisible";
			gradientControl.className="invisible";
			otherControl.className="controlMenu";
			stampControl.className="invisible";
			paintGameControl.className="invisible";
		break;

		case "stampOptions":
			shadowControl.className="invisible";
			lineControl.className="invisible";
			textControl.className="invisible";
			colorControl.className="invisible";
			gradientControl.className="invisible";
			otherControl.className="invisible";
			stampControl.className="controlMenu";
			paintGameControl.className="invisible";
		break;

		case "paintGameOptions":
			shadowControl.className="invisible";
			lineControl.className="invisible";
			textControl.className="invisible";
			colorControl.className="invisible";
			gradientControl.className="invisible";
			otherControl.className="invisible";
			stampControl.className="invisible";
			paintGameControl.className="controlMenu";
		break;
	}
}

function updateDivisionDisplay() {
	console.log('running updateDivisionDisplay');
	let division=-1; let input=-1;
	for (let c=0; c <colorInput.length; c++){
		division=document.getElementById(colorInput[c][2]);
		input=document.getElementById(colorInput[c][0]);
		if((input.value.length!=4)&&(input.value.length!=7)){
			division.className="invisible";
		}
		else {
			division.className="";
		}
	}
}

function updateRadioColorGradientDisplay(selected) {
	//gradStyleControl.className="invisible";//=document.getElementById("gradientStyleFieldset");
	//gradControl.className="invisible";//=document.getElementById("gradientFieldset");
	patternControl.className="invisible";//=document.getElementById("patternFieldset");
	gradControlControl.className="invisible";//=document.getElementById("gradientControlFieldset");
	gradDivControl.className="invisible";//=document.getElementById("gradientDivisions");
	//controllerControl.className="invisible";//=document.getElementById("controllersFieldset");

	/*document.getElementById("gradientControlTitle").className="invisible";

	document.getElementById("gradientX").className="invisible";
	document.getElementById("gradientY").className="invisible";
	document.getElementById("gradientX2").className="invisible";
	document.getElementById("gradientY2").className="invisible";
	document.getElementById("gradientRadius").className="invisible";
	document.getElementById("gradientRadius2").className="invisible";
	document.getElementById("gradientAngle").className="invisible";

	document.getElementById("gradientXLabel").className="invisible";
	document.getElementById("gradientYLabel").className="invisible";
	document.getElementById("gradientX2Label").className="invisible";
	document.getElementById("gradientY2Label").className="invisible";
	document.getElementById("gradientRadiusLabel").className="invisible";
	document.getElementById("gradientRadius2Label").className="invisible";
	document.getElementById("gradientAngleLabel").className="invisible";

	document.getElementById("gradientDivisions").className="invisible";
	document.getElementById("formSubmit").className="invisible";*/
	//document.getElementById("filetouploadLabel").className="invisible";

	/*const patternStyleLabel=document.getElementsByName("patternStyleLabel");
	const patternStyle=document.getElementsByName("patternStyle");
	for (var p=0; p < patternStyle.length; p++){
		patternStyle[p].className="invisible";
		patternStyleLabel[p].className="invisible";
	}*/

	if(selected=="noGradient"){
	}
	else if(selected=="linearGradient"){
		//document.getElementById("gradientAngle").className="";
		//document.getElementById("gradientAngleLabel").className="";
		gradDivControl.className="";
		//document.getElementById("gradientDivisions").className="";
	}
	else if(selected=="radialGradient"){
		gradControlControl.className="";
		/*document.getElementById("gradientControlTitle").className="";
		document.getElementById("gradientX").className="";
		document.getElementById("gradientY").className="";
		document.getElementById("gradientX2").className="";
		document.getElementById("gradientY2").className="";
		document.getElementById("gradientRadius").className="";
		document.getElementById("gradientRadius2").className="";
		document.getElementById("gradientAngle").className="";

		document.getElementById("gradientXLabel").className="";
		document.getElementById("gradientYLabel").className="";
		document.getElementById("gradientX2Label").className="";
		document.getElementById("gradientY2Label").className="";
		document.getElementById("gradientRadiusLabel").className="";
		document.getElementById("gradientRadius2Label").className="";
		document.getElementById("gradientAngleLabel").className="";*/

		//document.getElementById("gradientDivisions").className="";
		gradDivControl.className="";
	}
	else if(selected=="pattern"){
		patternControl.className="";
		document.getElementById("formSubmit").className="";
		//document.getElementById("filetouploadLabel").className="";
/*
		for (var p=0; p < patternStyle.length; p++){
			patternStyle[p].className="";
			patternStyleLabel[p].className="";
		}*/
	}
};

let drawButton=document.getElementsByClassName("canvasController");
drawButton[0].addEventListener("click", ()=>{
	mode="";
});
drawButton[1].addEventListener("click", ()=>{
	mode="Draw Line";
});
drawButton[2].addEventListener("click", ()=>{
	mode="Draw Quadratic Curve";
});
drawButton[3].addEventListener("click", ()=>{
	mode="Draw Bezier Curve";
});
drawButton[4].addEventListener("click", ()=>{
	mode="Draw Arc";
});
drawButton[5].addEventListener("click", ()=>{
	mode="Draw Circle";
});
drawButton[6].addEventListener("click", ()=>{
	mode="Draw Rectangle";
});
drawButton[7].addEventListener("click", ()=>{
	mode="Erasing Rect";
});
drawButton[8].addEventListener("click", ()=>{  //okay.
	//mode="Undo Last";

	//this has to do with the old system of saving each drawn shape, and recreating all but the last to simulate an "undo".  
	//I did not figure out how to do that with "free drawing".  I think this way takes up less memory as the list of saves gets bigger.  
	
	//deleteLastRecord();
	//let clearAllObj=[{pressedX: 0, pressedY: 0, releasedX: 0+myCanvas.width, releasedY: 0+myCanvas.height}];
	//clearCanvas(clearAllObj, paintArray, false);
	//redrawCanvas();
});
drawButton[9].addEventListener("click", ()=>{ //no mode change.  Actually clears canvas right now, so to speak!
	//mode="Clear Canvas";

	deleteAllRecords();
	let clearAllObj=[{pressedX: 0, pressedY: 0, releasedX: 0+myCanvas.width, releasedY: 0+myCanvas.height}];
	clearCanvas(clearAllObj, paintArray, true); //Important:  In the old undoing system, this was false!!!
});
drawButton[10].addEventListener("click", ()=>{ //no mode change.  Copy!
	//mode="Clear Canvas";
	copy();

});
drawButton[11].addEventListener("click", ()=>{ //Paste
	mode="Paste";
	//paste(); //this did not work.  At all, due to permissions issue :/
});
drawButton[12].addEventListener("click", ()=>{ //Select
	mode="Select";

});
drawButton[13].addEventListener("click", ()=>{ //Select
	mode="Use Pen";
});

drawButton[14].addEventListener("click", ()=>{ //Select
	mode="Use Stamp";
});

drawButton[15].addEventListener("click", ()=>{ //Select
	mode="Write Text";
});
drawButton[16].addEventListener("click", ()=>{ //Select
	mode="Grid Block";
});
drawButton[17].addEventListener("click", ()=>{ //New Undo
	//mode="New Undo";
	canvasArray("undo");
});
drawButton[18].addEventListener("click", ()=>{ //New Redo
	//mode="New Redo";
	canvasArray("redo");
});
drawButton[19].addEventListener("click", ()=>{ //Mark Savepoint
	//mode="Mark SavePoint";
	canvasArray("saveNew");
});

document.getElementById("picAlter0_Button").addEventListener("click", ()=>{
	picAlter(points, paintArray);
});

//change display for "brightening colors ^_^"
for (let i=0; i < document.getElementsByName("colorBD").length; i++){
	document.getElementsByName("colorBD")[i].addEventListener("change", (event)=>{
		document.getElementById("bDDisplay" + i.toString()).innerHTML=event.target.value;
	});
}

document.getElementById("picAlter0").addEventListener("change", picAlterMenu); //change what is displayed for the picture alter menu, so to speak.
document.getElementById("imageReset").addEventListener("click", ()=>{ //revert picture back to original for secretImageHolder1
	document.getElementById("secretImageHolder1").setAttribute("src", document.getElementById("secretImageHolder").src);
});

for (var e=0; e < document.getElementsByName("otherColorInputs").length; e++){
	document.getElementsByName("otherColorInputs")[e].addEventListener("click", addColorSelector);
}


function picAlterMenu(){
	let brightDark = document.getElementById("brightenDarken");
	let changeToColorMenu = document.getElementById("changeToColorMenu");
	let blendToMenu = document.getElementById("blendToMenu");
	
	brightDark.className="invisible";
	changeToColorMenu.className="invisible";
	blendToMenu.className="invisible";

	switch(this.value){
		case "invertColors":
		break;

		case "brightenDarken":
			brightDark.className="";
		break;

		case "blendTo":
			blendToMenu.className="";
		break;

		case "changeToColor":
			changeToColorMenu.className="";
		break;
	}
}

function picAlter(pointArray, colorArray) {
	updatePaintArray();

	//function activated for each select value.  So far so good ^_^
	let selectValue=document.getElementById("picAlter0").value;
	let hiddenImage=document.getElementById("secretImageHolder"); //start from the unaltered version???  So far doing nothing with this, so to speak.

	switch(selectValue){
		case "invertColors":
			var imageObj = new Image();
			imageObj.src = colorArray.pattern.src; //'images/Family.jpg'; //
			imageObj.onload = function() {
				picAlterAssist(pointArray, colorArray, this, "invert", "", -1);
			};
		break;

		case "brightenDarken": //update brightDark display!!
			let redChange=parseInt(document.getElementById("redBD").value, 10);
			let greenChange=parseInt(document.getElementById("greenBD").value, 10);
			let blueChange=parseInt(document.getElementById("blueBD").value, 10);
			var imageObj = new Image();
			imageObj.src = colorArray.pattern.src;
			imageObj.onload = function() {
				picAlterAssist(pointArray, colorArray, this, "brightenBy", "", [redChange, greenChange, blueChange]);
			};
		break;

		case "blendTo":
			let color=document.getElementById("colorInput0").value;
			let blendRange=document.getElementById("blendRange").value;

			var imageObj = new Image();
			imageObj.src = colorArray.pattern.src;
			imageObj.onload = function() {
				picAlterAssist(pointArray, colorArray, this, "blendTo", "", {color: color, blendRange: blendRange});
			};
		break;

		case "changeToColor":
			//note: these values will need to be changed ^_^
			let fromColor=document.getElementById("fromColor").value;
			let toColor=document.getElementById("toColor").value;
			let fromColorRange=parseInt(document.getElementById("fromColorRange").value, 10);

			var imageObj = new Image();
			imageObj.src = colorArray.pattern.src;
			imageObj.onload = function() {
				picAlterAssist(pointArray, colorArray, this, "changeToColor", "", {fromColor: fromColor, toColor: toColor, fromColorRange: fromColorRange});
			};

		break;

		default:
			alert('please select a value!')
		break;
	}
}

CanvasURLArray=[];
CanvasURLArrayIndex=-1;
function canvasArray(action){
	//instead of redrawing everything, so to speak, we save a list of canvas "images", and "paste" the version we want ^_^
	let myCanvas=document.getElementById("testCanvas");
	let canvasMax=10; //the max number of images allowed on the list ^_^
	switch(action){
		case "undo":
		case "redo":
			let resetIsGo=false;
			if((action=="redo")&&(CanvasURLArrayIndex+1<CanvasURLArray.length)){
				CanvasURLArrayIndex++;
				resetIsGo=true;
			}
			if((action=="undo")&&(CanvasURLArrayIndex>0)){
				CanvasURLArrayIndex--;
				resetIsGo=true;
			}
			if(resetIsGo){
				deleteAllRecords();
				let clearAllObj=[{pressedX: 0, pressedY: 0, releasedX: 0+myCanvas.width, releasedY: 0+myCanvas.height}];
				clearCanvas(clearAllObj, paintArray, false);
				//document.getElementById("secretImageHolder1").setAttribute("src", CanvasURLArray[CanvasURLArrayIndex]); //myCanvas
				
				var imageObj = new Image();
				imageObj.src = CanvasURLArray[CanvasURLArrayIndex];
				imageObj.onload = function() {
					console.log(action + '-ing.  CanvasURLArrayIndex is: ' + CanvasURLArrayIndex)
					let context=myCanvas.getContext("2d");
					context.drawImage(imageObj, 0, 0);
				};
			}
		break;

		case "clearAll":
			CanvasURLArray=[];
			CanvasURLArrayIndex=0;
		break;

		case "saveNew": //save a new snapshot to the end of the list ^_^
			console.log('saving');
			if(CanvasURLArray.length>canvasMax){
				CanvasURLArray.shift(); //deletes the first (oldest) canvas shapshot from the list ^_^
			}
			CanvasURLArrayIndex++;
			CanvasURLArray.push(myCanvas.toDataURL()); //adds a new canvas shapshot to the end of the list ^_^
		break;

	}
}
canvasArray("saveNew"); //set a baseline, so to speak ^_^

function picAlterAssist(pointArray, colorArray, imageObj, action, action1, brightenBy){
	let secretCanvas=document.getElementById("secretTestCanvas");	
	let secretContext=secretCanvas.getContext('2d');	
	let originalSecretCanvasWidth=secretCanvas.width;
	let originalSecretCanvasHeight=secretCanvas.height;
		
	let xScale=colorArray.drawScaleX;
	let yScale=colorArray.drawScaleY;
	let x=pointArray[0].pressedX; //x and y don't come out right.
	let y=pointArray[0].pressedY;

	/*
		Shrinking the photo so it would be preshrunk to fit in secretImageHolder1 was seriously decreasing image quality.  By the 6th alteration, 
		it didn't even show up as a phoo.  I'm using bexScale and buyScale as placeholders for xScale and yScale, in case I want to turn 
		this back later ^_^.  Also, this is why I'm commenting out otherDrawingAlterations, as it could change the scale.
		All this fancy rotating and whatnot can be affected in the pattern ^_^.  I'll try to shrink the scale for the pattern???

	*/
	let bexScale=1; let buyScale=1;
	secretCanvas.setAttribute("width", imageObj.width*bexScale); //change size so that photo will fit the canvas "exactly" ^_^
	secretCanvas.setAttribute("height", imageObj.height*buyScale);
	//otherDrawingAlterations(pointArray, colorArray, secretContext, "set"); //It failed to scale... because the width/height attribute was set after?

	secretContext.drawImage(imageObj, x, y);

	let imageData = secretContext.getImageData(x, y, imageObj.width, imageObj.height);
	let data = imageData.data;
	let cArray=[];
	let fromArray=[]; let toArray=[]; let range=0;

	if(action=="blendTo"){
		cArray=colorTranslator("hexToDeci", brightenBy.color);
	}
	else if(action=="changeToColor"){	
		fromArray=colorTranslator("hexToDeci", brightenBy.fromColor);
		alert(fromArray)
		toArray=colorTranslator("hexToDeci", brightenBy.toColor);
		range=parseInt(brightenBy.fromColorRange,10);
	}
	for(let i = 0; i < data.length; i += 4) { 
		//if((i % 256)<128){ //makes it only a section ^_^
			if(action=="brightenBy"){
	    		for(let a=0; a < 3; a++){
	        		if((data[i+a]+brightenBy[a])<255){
	        			data[i+a]+=brightenBy[a];
	        		}
	        		else {
	        			data[i+a]=255;
	        		}
	    		}
	    	}
	    	else if (action=="invert"){
	  			data[i] = 255 - data[i]; // red
	  			data[i + 1] = 255 - data[i + 1]; // green
	  			data[i + 2] = 255 - data[i + 2]; // blue
	    	}
	    	else if (action=="blendTo"){
	    		for (let c=0; c < cArray.length; c++){
		    		if(Math.abs(data[i+c]-cArray[c])<=brightenBy.blendRange){
		    			data[i+c]=cArray[c];
		    		}
		    		else {
		    			if(data[i+c]<cArray[c]){
		    				data[i+c]+=brightenBy.blendRange;
		    				if(data[i+c]>255){
		    					data[i+c]=255;
		    				}
		    			}
		    			else {
		    				data[i+c]-=brightenBy.blendRange;
		    				if(data[i+c]<0){
		    					data[i+c]=0;
		    				}
		    			}
		    		}
	    		}
	    	}
	    	else if(action=="changeToColor"){
	    		if((Math.abs(data[i]-fromArray[0])<range)&&(Math.abs(data[i+1]-fromArray[1])<range)
	    			&&(Math.abs(data[i+2]-fromArray[2])<range)){
	    			data[i]=toArray[0];
	    			data[i+1]=toArray[1];
	    			data[i+2]=toArray[2];
	    		}
	    	}
		//}         
	}


	// overwrite original image

	//I'm trying to save the pattern to memory, not necessarily display it on the canvas at this time.  ^_^
	secretContext.putImageData(imageData, x*bexScale, y*buyScale); //context 
	document.getElementById("secretImageHolder1").setAttribute("src", secretCanvas.toDataURL()); //this grabs the whole canvas, lolz

	//reset values ^_^
	//otherDrawingAlterations(pointArray, colorArray, secretContext, "reverse");
	secretCanvas.setAttribute("width", originalSecretCanvasWidth); //change size so that photo will fit the canvas "exactly" ^_^
	secretCanvas.setAttribute("height", originalSecretCanvasHeight);
	//alert('secretCanvas.width is: ' + secretCanvas.width + ", secretCanvas.height is: " + secretCanvas.height);
}

function colorTranslator(action, input){
	let red, green, blue; 
	switch(action){
		case "deciToHex":		
			let newString=""; 
			red=base10To16(input[0], "number", "string");  //change back into a string.
			green=base10To16(input[1], "number", "string");
			blue=base10To16(input[2], "number", "string");
			newString="#"+red+green+blue; //combine into "new" inverted color ^_^
			return(newString);
			//console.log('at line 981, newString is ' + newString);
		break;

		case "hexToDeci":
			let withoutHashtag; 
			let redBase10, greenBase10, blueBase10;
			withoutHashtag=input.replace("#",""); //the current color, now without a hashag
			console.log(withoutHashtag);
			red=withoutHashtag.slice(0,2); //grab the red, green, and blue "strings"
			green=withoutHashtag.slice(2,4);
			blue=withoutHashtag.slice(4,6);

			redBase10=parseInt(red, 16); //get the base 10 values ^_^
			greenBase10=parseInt(green, 16);
			blueBase10=parseInt(blue, 16);

			return([redBase10, greenBase10, blueBase10]); //return the color object ^_^
		break;
	}
}

function copy(){
	var text=document.getElementById("colorInput0");
	text.select(); //select the next
	document.execCommand("copy");
}

function paste(){
  var pasteText = document.getElementById("deepInTheHeartOfTextUs");
  pasteText.focus();
  document.execCommand("paste");
  alert(pasteText.textContent);
}

for (var d=0; d < drawButton.length; d++){
	drawButton[d].addEventListener("click", ()=>{
		conSolo.innerHTML=mode;
	});
}


const fillStatusRadio=document.getElementsByName("fillStatus");
for (var f=0; f < fillStatusRadio.length; f++){
	fillStatusRadio[f].addEventListener("click", (event)=>{
		//const radioVal = getRadioValue("fillStatus","outline"); //this works, but I thought to practice something else ^_^
		if((event.target.checked)&&(event.target.value!="outline")){
			gradientControl.className="controlMenu";
		}
		else {
			gradientControl.className="invisible";
		}

		var gradient=getRadioValue("gradient", "noGradient");
		updateRadioColorGradientDisplay(gradient);
	});
}

const colors = document.getElementsByName("colors");
for (var c=0; c < colors.length; c++){
	colors[c].addEventListener("click", addColorSelector);
	colors[c].addEventListener("input", 
		updateDivisionDisplay
	);
}

function updatePaintArray(){
	//get the gradient values!
	let fillIn=getRadioValue("gradient", "noGradient");
	let colorValues=[];
	let colorDivisionValues=[];
	let color=""; let division="";
	for (var c=0; c <colorInput.length; c++){
		color=document.getElementById(colorInput[c][0]).value;
		//console.log('color is ' + color + ' at line 311!');
		colorValues.push(color);

		division=document.getElementById(colorInput[c][2]).value;
		if(isNaN(division)){
			alert(`division ${c} is NaN.  changing to 0`);
			division=0;
		}
		//console.log('division is ' + division + ' at line 319!');
		colorDivisionValues.push(division);
	}
	//let pattern = document.getElementById("patternFile").value;
	//alert(pattern);
	//let processed = extractFilename(pattern); //this function is useful for getting rid of the "fakepath" path ^_^
	//alert(processed);
	let hiddenImage=document.getElementById("secretImageHolder1"); //secretImageHolder.
	//hiddenImage.setAttribute("src", "images/" + processed);
	//alert(pattern);
	const patternStyle=getRadioValue("patternStyle", "no-repeat");

	let gradientAngle = parseInt(document.getElementById("gradientAngle").value, 10); //this may end up as NaN

	//get the shadow values ^_^
	let drawShadow=document.getElementById("drawShadowBoolean");
	let shadowObj={};
	if(drawShadow.checked){
		shadowObj={
			drawShadowBoolean : drawShadow.checked,
			shadowColor: document.getElementById("shadowColorInput").value,
			shadowBlur: document.getElementById("shadowBlurInput").value,
			shadowOffsetX: document.getElementById("shadowOffsetXInput").value,
			shadowOffsetY: document.getElementById("shadowOffsetYInput").value
		}
	}
	//console.log('shadowObj is: ');
	//console.log(shadowObj);

	//get the line info
	let lineCap = getRadioValue("lineCap", "defaultLineCap");
	let lineJoin = getRadioValue("lineJoin", "bevelJoin");
	//alert('lineCap is: ' + lineCap + ', lineJoin is: ' + lineJoin);
	let lineWidthInput = document.getElementById("lineWidthInput").value;
	let miterLimitInput = document.getElementById("miterLimitInput").value;

	//get the "other" info ^_^
	let angle=parseInt(document.getElementById("drawAngle").value, 10);
	let invertBool=document.getElementById("invertBool").checked;
	let alpha=parseFloat(document.getElementById("alpha").value);
	const drawScaleX=parseFloat(document.getElementById("drawScaleX").value);
	const drawScaleY=parseFloat(document.getElementById("drawScaleY").value);
	//alert('angle is: ' + angle + ", invertBool is: " + invertBool + ", drawScaleX is: " + drawScaleX + "drawScaleY is: " + drawScaleY + ", alpha is: " + alpha);
	
	//Make a brightenBy object with these categories (?):			blendRange, color, changeToColorRange, fromColor, toColor
	let patternOffsetX=parseInt(document.getElementById("patternOffsetX").value, 10);
	let patternOffsetY=parseInt(document.getElementById("patternOffsetY").value, 10);
	let patternOffsetBoolean=document.getElementById("patternOffsetBoolean").checked;

	//get the text info
	let fillTextBoolean=document.getElementById("fillTextBoolean").value;
	let font=document.getElementById("fontInput").value;
	let fontSize=document.getElementById("fontSize").value;
	let fontWeight=parseInt(document.getElementById("fontWeight").value, 10);
	let fontVarient=document.getElementById("fontVarient").value;
	let fontStyle=document.getElementById("fontStyle").value;
	let textAlign=document.getElementById("textAlign").value;

	paintArray={
		colorValues: colorValues,
		gradDivValues: colorDivisionValues,
		fillIn: fillIn,
		fillType: getRadioValue("fillStatus", "outline"),
		pattern: hiddenImage, //if fillType is pattern? The hiddenImage is an element, so to speak ^_^
		patternStyle: patternStyle,
		patternObj : {
			patternOffsetX: patternOffsetX,
			patternOffsetY: patternOffsetY,
			patternOffsetBoolean: patternOffsetBoolean
		},
		angle: angle,
		invertBool: invertBool,
		alpha: alpha,
		drawScaleX: drawScaleX,
		drawScaleY: drawScaleY, 
		gradientAngle: gradientAngle, //for linear gradients only ^_^
		drawShadow: drawShadow.checked, //only try to do shadow if this is true ^_^
		shadowObj: shadowObj,
		lineObj: {
			lineCap: lineCap, 
			lineJoin: lineJoin,
			lineWidthInput: lineWidthInput,
			miterLimitInput: miterLimitInput
		},
		textObj:{
			fillTextBoolean: fillTextBoolean,
			font: font,
			fontSize: fontSize,
			fontWeight: fontWeight,
			fontVarient: fontVarient,
			fontStyle: fontStyle,
			textAlign: textAlign
		}
	};

	//console.log('paintArray is: ');
	//console.log(paintArray);
	return(paintArray); //in case, so to speak ^_^
}

function controlThatLine(colorArray, context){
	context.lineCap=colorArray.lineObj.lineCap;
	context.lineJoin=colorArray.lineObj.lineJoin;
	context.lineWidth=colorArray.lineObj.lineWidthInput;
	context.miterLimit=colorArray.lineObj.miterLimitInput;
	//console.log(colorArray.lineObj);
}


function getRadioValue(name, defaultValue){
	const nameGroup = document.getElementsByName(name);
	for (var n=0; n < nameGroup.length; n++){
		if(nameGroup[n].checked){
			return(nameGroup[n].value);
		}
	}
	return(defaultValue);
}

function addDrawing(pointArray, colorArray, type){ //adds drawings to a list
	let drawingObj={
		type: type, 
		pointsStored: JSON.parse(JSON.stringify(pointArray)), //this makes a new array, not a new reference, so to speak ^_^
		colorArray: JSON.parse(JSON.stringify(colorArray))
	}
	drawings.push(drawingObj);
}

function deleteAllRecords(){
	console.log('drawings.length was ' + drawings.length + ' at deleteAllRecords()')
	points = [
	{pressedX: 0, pressedY: 0, releasedX: 0, releasedY: 0},
	{pressedX: 0, pressedY: 0, releasedX: 0, releasedY: 0},
	{pressedX: 0, pressedY: 0, releasedX: 0, releasedY: 0},
	{pressedX: 0, pressedY: 0, releasedX: 0, releasedY: 0}
	]
	points.level=0;
	drawings=[];
	console.log('drawings.length is ' + drawings.length);
}

function deleteLastRecord(){
	console.log('got to the "deleteLastRecord" function, on line 219.  drawings.length was ' + drawings.length);
	points = [
	{pressedX: 0, pressedY: 0, releasedX: 0, releasedY: 0},
	{pressedX: 0, pressedY: 0, releasedX: 0, releasedY: 0},
	{pressedX: 0, pressedY: 0, releasedX: 0, releasedY: 0},
	{pressedX: 0, pressedY: 0, releasedX: 0, releasedY: 0}
	]
	points.level=0;
	drawings.pop();
	console.log('drawings.length is ' + drawings.length + ' after pop.')
}

function redrawCanvas(){ //clears canvas and redraws from record ^_^
	console.log("got to 'redrawCanvas', line 231.")
	var storedRecord=record;
	record=false;
	for (var d=0; d < drawings.length; d++){
		//console.log('d is: ' + d + ".  drawings[d] is: ");
		console.log(drawings[d].type);
		console.log(drawings[d].pointsStored);
		console.log(drawings[d].colorArray);
		console.log(drawings[d].colorArray.fillType);
		switch(drawings[d].type){
			//case "":
				
			//break;

			case "Line":
				console.log('went to redraw line on redrawCanvas function')
				//console.log('fillIn is: ' + drawings[d].colorArray.fillIn);
				//updatePaintArray(drawings[d].colorArray.fillIn); //um, why are we "updating" this here?  Aren't we getting the info from stored memory???
				drawLine(drawings[d].pointsStored, drawings[d].colorArray, drawings[d].type);
			break;

			case "Draw Quadratic Curve":
				
			break;

			case "Draw Bezier Curve":

			break;

			case "Draw Arc":
				
			break;

			case "Circle":
				console.log('went to redraw circle on redrawCanvas function')
				drawCircle(drawings[d].pointsStored, drawings[d].colorArray);
			break;

			case "Rectangle":
				console.log('went to redraw rectangle on redrawCanvas function');
				drawRect(drawings[d].pointsStored, drawings[d].colorArray);
			break;

			case "Erasing Rect":
				clearCanvas(drawings[d].pointsStored, drawings[d].colorArray, false);
			break;

			case "Use Pen":

			break;

			case "Use Stamp":

			break;

			//case "Write Text":
				//this one never made to work with redrawCanvas
			//break;

			case "Grid Block":

			break;
		}
	}
	record=storedRecord;
}

myCanvas.addEventListener("dragstart", (event)=>{
	event.preventDefault(); //yippie!  This prevents the canvas from being dragged :D
});

let mouseButton=0; //keeps track of which mousebutton was pressed ^_^
myCanvas.addEventListener("mousedown", (event)=>{
	mouseButton=event.button;
	points[0].pressedX=event.offsetX;
	points[0].pressedY=event.offsetY;
	conSolo.innerHTML=("downX: " + points[0].pressedX + ", downY: " + points[0].pressedY + "upX: " + points[0].releasedX + 
		", upY: " + points[0].releasedY+ ", mouseButton is: " + mouseButton);
	if(mode=="Use Pen"){
		updatePaintArray();
		//drawTime=setInterval(function(){ console.log("Hello"); }, 1000);
		drawPoint2("start", paintArray);
	}
	if(mode=="Use Stamp"){
		updatePaintArray();
	}

});
myCanvas.addEventListener("mouseup", (event)=>{
	//conSolo.innerHTML=(event.offsetX + ', ' + event.offsetY);
	points[0].releasedX=event.offsetX;
	points[0].releasedY=event.offsetY;
	conSolo.innerHTML="downX: " + points[0].pressedX + ", downY: " + points[0].pressedY + "upX: " + points[0].releasedX + ", upY: " + points[0].releasedY;
	if(mode==""){
	}
	else if(mode=="Draw Line"){
		updatePaintArray();
		drawLine(points, paintArray, type);
	}
	else if(mode=="Draw Quadratic Curve"){
	}
	else if(mode=="Draw Bezier Curve"){
	}
	else if(mode=="Draw Arc"){
	}
	else if(mode=="Draw Circle"){
		updatePaintArray();
		drawCircle(points, paintArray);
	}
	else if(mode=="Draw Rectangle"){
		updatePaintArray();
		drawRect(points, paintArray);			
	}

	else if(mode=="Erasing Rect"){
		//const width=Math.abs(points[0].pressedX-points[0].releasedX);//*2;
		//const height=Math.abs(points[0].pressedY-points[0].releasedY);//*2;
		updatePaintArray();
		clearCanvas(points, paintArray, true);
	}
	else if(mode=="Paste"){
		updatePaintArray();
		var imageObj = new Image();
		imageObj.src = paintArray.pattern.src; //'images/Family.jpg'; //
		imageObj.onload = function() {
			drawImage(points, paintArray, this, "brightenBy", "", 50);
		};
	}
	else if(mode=="Write Text"){
		updatePaintArray();
		let text=document.getElementById("deepInTheHeartOfTextUs").value;
		alert(text);
		drawText(points, paintArray);
	}
	else if(mode=="Use Stamp"){
		updatePaintArray();
		drawStamp(paintArray, event.offsetX, event.offsetY);
	}
	else if(mode=="Grid Block"){
		//thus far ^_^
		let color=document.getElementById("blockColor").value;
		let drawColor=gridGame0("color", color);
		//drawColor appears to be correct ^_^
		let width=parseInt(document.getElementById("gridWidth").value, 10);
		let height=parseInt(document.getElementById("gridHeight").value, 10);
		//console.log('at line 1399, button was still ' + mouseButton); //I believe this still holds the corret value ^_^
		//Note:  Mouse button is now released :)
		if(mouseButton==0){ //if the left button was pressed.			
			let colorExisting=analyzeAGrid({mission: "sampleColor", color: drawColor}, -1, width, height, event.offsetX, event.offsetY);
			//alert('at line 1403, colorExisting is: ' + colorExisting); //answer: #000000
			let cost=gridGame0("cost", document.getElementById("blockColor").value);
			if(gridFunds>=cost){
				if((colorExisting.color=="#FFFFFF")||(colorExisting.color=="#ffffff")||((colorExisting.color=="#000000")&&(colorExisting.alpha==0))){
					analyzeAGrid({mission: "turnToColor", color: drawColor}, -1, width, height, event.offsetX, event.offsetY);
					gridFunds-=cost;
					document.getElementById("gridFunds").innerHTML="Grid Funds: " + gridFunds.toString();
				}				
			}

		}
		else if(mouseButton==1){  //change alpha later ^_^.
			let returnValue=analyzeAGrid({mission: "colorProximity", color: drawColor, alpha: 255}, -1, width, height, event.offsetX, event.offsetY);
			//alert(returnValue);
			console.log(returnValue)
		}
		else if(mouseButton==2){ //if the right button was pressed
			//for sampleColor doesn't matter here, except that the variable exists.
			analyzeAGrid({mission: "checkForExactMatch", x: 0, y:0}, -1, width, height, event.offsetX, event.offsetY);
			//analyzeAGrid({mission: "sampleColor", color: drawColor}, -1, width, height, event.offsetX, event.offsetY);
		}
		
	}


	//else if(mode=="Undo Last"){
	//}

	//else if(mode=="Clear Canvas"){
	//}
});


document.addEventListener("mouseup", (event)=>{ //"global" mouse up ^_^
	if(mode=="Use Pen"){
		drawPoint2("end", paintArray);
		//clearInterval(drawTime);
	}
});

let oldOffset=[]; let thisContext=-1;
myCanvas.addEventListener("mousemove", (event)=>{
	if((mode=="Use Pen")&&(mode1=="Draw")){
		//console.log(event.button);
		drawPoint2("middle", paintArray);
	}
});

function drawPoint2(action, colorArray){ 
	if(action=="end"){
		mode1=""; //reset variables ^_^
		record=true;
		oldOffset=[]; 
		thisContext=-1;
		
		canvasArray("saveNew");
		console.log('line 1361.  mode1 is ' + mode1);
	}
	if(action=="middle"){
		let x=event.offsetX; let y=event.offsetY;

		if(oldOffset.length>1){

			thisContext.moveTo(oldOffset[0], oldOffset[1]);
			thisContext.lineTo(x, y);
			
			thisContext.stroke();		
		}		
	}

	oldOffset[0]=event.offsetX;
	oldOffset[1]=event.offsetY;
	if(action=="start"){ //because I want to set the oldOffset array, as well as return cxt, I put the start action at the end :)
		mode1="Draw";
		record=false; //so it won't resave at every single step, so to speak.
		thisContext = myCanvas.getContext("2d");
		if((colorArray.fillIn!="pattern")&&(colorArray.invertBool)){ //invert colors
			thisContext.strokeStyle = invertedColorArray[0];
		}
		else {
			thisContext.strokeStyle=colorArray.colorValues[0];
		}
		thisContext.beginPath();
		controlThatLine(colorArray, thisContext);
	}
}

function drawPoint1(colorArray){ //a group of lines that makes drawings without gaps even going "fast"
	let cxt = myCanvas.getContext("2d");
	if((colorArray.fillIn!="pattern")&&(colorArray.invertBool)){ //invert colors
		cxt.strokeStyle = invertedColorArray[0];
	}
	else {
		cxt.strokeStyle=colorArray.colorValues[0];
	}

	let x=event.offsetX; let y=event.offsetY;
	//let alpha = Math.round((colorArray.alpha)*255);

	if(oldOffset.length>1){
		cxt.beginPath();
		cxt.moveTo(oldOffset[0], oldOffset[1]);
		cxt.lineTo(x, y);
		controlThatLine(colorArray, cxt);
		cxt.stroke();		
	}

	//for next time ^_^
	oldOffset[0]=event.offsetX;
	oldOffset[1]=event.offsetY;
}

function drawPoint(x,y , colorArray){ //this version skips spots.
	let cxt = myCanvas.getContext("2d");
	let imageData = cxt.createImageData(1,1);
	let alpha = Math.round((colorArray.alpha)*255);
	let hexiColor=colorArray.colorValues[0]; //the first color ^_^
	let colors=colorTranslator("hexToDeci", hexiColor);

	for (let i=0; i < imageData.data.length; i+=4){
	  imageData.data[i+0] = colors[0];
	  imageData.data[i+1] = colors[1];
	  imageData.data[i+2] = colors[2];
	  imageData.data[i+3] = alpha;
	}
	cxt.putImageData(imageData, x, y);
}

function getXYFactor(angle, searchFor){
	let returnValue=0;
	let oldAngle = angle;
	angle*=(Math.PI/180); //should be in radians, lolz ^_^
	if(searchFor=="x"){
		returnValue=Math.cos(angle);
		if((oldAngle==90)||(oldAngle==270)){ //to prevent division by zero ^_^
			returnValue=0;
		}
		//alert('line 546: oldAngle was: ' + oldAngle + ", angle is: " + angle + ', returnValue is: ' + returnValue);
	}
	else if(searchFor=="y"){
		returnValue=Math.sin(angle);
		if ((oldAngle==0)||(oldAngle==180)){ //to prevent division by zero ^_^
			returnValue=0; 
		}
		//alert('line 550: oldAngle was: ' + oldAngle + ", angle is: " + angle + ', returnValue is: ' + returnValue);
	}
	else if (searchFor=="tan"){
		returnValue=Math.tan(angle);
		//alert('line 554: oldAngle was: ' + oldAngle + ", angle is: " + angle + ', returnValue is: ' + returnValue);
	}
	return(returnValue);
}

function angle(cx, cy, ex, ey) {
  var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  //if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}

let theseAngles=[0,90,180,270]; let message=""; 
for (var a=0; a < theseAngles.length; a++){
	let ex; let why;
	ex=getXYFactor(theseAngles[a], "x");
	why=getXYFactor(theseAngles[a], "y");
	//alert('ex is: ' + ex + ", why is: " + why);
	message="";
	message += (`at ${theseAngles[a]} degrees, x is: ${ex}, `);
	message += (`at ${theseAngles[a]} degrees, y is: ${why}, `);
	//console.log(message);
}

function setFill(pointArray, colorArray, context){
	let x; let y; let x2; let y2; let xGrad; let yGrad; let radius; let xGrad2; let yGrad2; let radius2;
	let gradient;

	let thePaints=colorArray.colorValues;
	if((colorArray.fillIn!="pattern")&&(colorArray.invertBool)){ //invert colors
		thePaints = invertedColorArray;
	}
	//updatePaintArray(getGradientValue()); //is this why updatePaintArray() is being run twice every time I draw a rectangle/circle???

	if((colorArray.fillType=="fill")||(colorArray.fillType=="both")){
		let fillBucket="#000000"; //default return value ^_^
		let gradientVal = colorArray.fillIn;//getGradientValue();
		if(gradientVal=="noGradient"){
			fillBucket=thePaints[1]; //colorArray.color1;
		}
		else if(gradientVal == "linearGradient"){
			x= pointArray[0].pressedX;
			y= pointArray[0].pressedY;
			x2= pointArray[0].releasedX;
			y2= pointArray[0].releasedY;

			let centerX=(x+x2)/2;
			let centerY=(y+y2)/2;
			let xDist = Math.abs(x2-x);
			let yDist = Math.abs(y2-y);
			//alert('x: ' + x + ', y: ' + y + 'x2: ' + x2 + ', y2: ' + y2 + 'centerX: ' + centerX + ', centerY: ' + centerY);
			let xGradPerc = parseInt(document.getElementById("gradientX").value, 10); 
			let yGradPerc = parseInt(document.getElementById("gradientY").value, 10);
			let xGradPerc2 = parseInt(document.getElementById("gradientX2").value, 10);
			let yGradPerc2 = parseInt(document.getElementById("gradientY2").value, 10);

			//xGrad= x + xDist*xGradPerc/100;
			//yGrad= y + yDist*yGradPerc/100;
			//xGrad2= x2 + xDist*xGradPerc2/100;
			//yGrad2= y2 + yDist*yGradPerc2/100;

			//xGrad= x;
			//yGrad= y;
			//xGrad2= x + xDist*xGradPerc2/100;
			//yGrad2= y + yDist*yGradPerc2/100;

			//lolz, this is the opposite of what I want to do ^_^.  Also, someone else made this ^_^.
			let gradientAngle=colorArray.gradientAngle;
			let xFactor; let yFactor;
			if(!isNaN(gradientAngle)){
				xFactor=getXYFactor(gradientAngle, "x");
				yFactor=getXYFactor(gradientAngle, "y");
				//alert("xFactor is: " + xFactor + ", yFactor is: " + yFactor);
			}

			if((typeof(xFactor)=="number")&&(typeof(yFactor)=="number")){
				xGrad= x/colorArray.drawScaleX;	
				yGrad= y/colorArray.drawScaleY;

				xGrad2= x/colorArray.drawScaleX + xDist*xFactor/colorArray.drawScaleX;
				yGrad2= y/colorArray.drawScaleY + yDist*yFactor/colorArray.drawScaleY;
				if(mode=="Write Text"){
					xGrad=x/colorArray.drawScaleX; 
					yGrad=y/colorArray.drawScaleY; 
					xGrad2=x/colorArray.drawScaleX+colorArray.textObj.width*xFactor;
					yGrad2=y/colorArray.drawScaleY+parseFloat(colorArray.textObj.fontSize)*yFactor;
				}
			}
			else { //default ^_^
				alert("default.  Not doing by special angle, because gradientAngle is not a number!");
				xGrad= x/colorArray.drawScaleX;	
				yGrad= y/colorArray.drawScaleY;
				xGrad2= x2/colorArray.drawScaleX + xDist;
				yGrad2= y2/colorArray.drawScaleY + yDist;
				if(mode=="Write Text"){
					xGrad=x/colorArray.drawScaleX; 
					yGrad=y/colorArray.drawScaleY; 
					xGrad2=x/colorArray.drawScaleX+colorArray.textObj.width*xFactor;
					yGrad2=y/colorArray.drawScaleY+parseFloat(colorArray.textObj.fontSize)*yFactor;
				}
			}
			//alert('xGradPerc: ' + xGradPerc + ', yGradPerc: ' + yGradPerc + 'xGradPerc2: ' + xGradPerc2 + ', yGradPerc2: ' + yGradPerc2);
			//alert('xGrad: ' + xGrad + ', yGrad: ' + yGrad + 'xGrad2: ' + xGrad2 + ', yGrad2: ' + yGrad2);

			gradient=context.createLinearGradient(xGrad, yGrad, xGrad2, yGrad2);

			if(colorArray.shadowObj.drawShadowBoolean){
				context.shadowBlur = colorArray.shadowObj.shadowBlur;
				context.shadowOffsetX = colorArray.shadowObj.shadowOffsetX;
				context.shadowOffsetY = colorArray.shadowObj.shadowOffsetY;
				context.shadowColor = colorArray.shadowObj.shadowColor;
			}

			for (let c=0; c < thePaints.length; c++){
				if((thePaints[c]!="")&&(colorArray.gradDivValues[c]!=0)&&(acceptableColor(thePaints[c]))){
					gradient.addColorStop(colorArray.gradDivValues[c], thePaints[c]);
				}
			}
			fillBucket=gradient;
		}
		else if(gradientVal == "radialGradient"){
			x= pointArray[0].pressedX;
			y= pointArray[0].pressedY;
			x2= pointArray[0].releasedX;
			y2= pointArray[0].releasedY;

			let centerX=(x+x2)/2; 
			let centerY=(y+y2)/2;
			const r=getRadius(pointArray[0].pressedX, pointArray[0].pressedY, pointArray[0].releasedX, pointArray[0].releasedY);
			//okay ^_^ alert('x: ' + x + ', y: ' + y + 'x2: ' + x2 + ', y2: ' + y2 + 'centerX: ' + centerX + ', centerY: ' + centerY + 'r: ' + r);

			let xGradPerc = parseInt(document.getElementById("gradientX").value, 10); 
			let yGradPerc = parseInt(document.getElementById("gradientY").value, 10);
			let radiusPerc = parseInt(document.getElementById("gradientRadius").value, 10);
			let xGradPerc2 = parseInt(document.getElementById("gradientX2").value, 10);
			let yGradPerc2 = parseInt(document.getElementById("gradientY2").value, 10);
			let radiusPerc2 = parseInt(document.getElementById("gradientRadius2").value, 10);

			xGrad= Math.abs(x-centerX)*xGradPerc/100;
			yGrad=  Math.abs(y-centerY)*yGradPerc/100;
			radius= r*radiusPerc/200;
			xGrad2= Math.abs(x2-centerX)*xGradPerc2/100;
			yGrad2=  Math.abs(y2-centerY)*yGradPerc2/100;
			radius2= r*radiusPerc2/200;

			//alert('xGradPerc: ' + xGradPerc + ', yGradPerc: ' + yGradPerc + 'xGradPerc2: ' + xGradPerc2 + ', yGradPerc2: ' + yGradPerc2);
			//alert('centerX is: ' + centerX + ' centerY is: ' + centerY + 'xGrad: ' + xGrad + ', yGrad: ' + yGrad + 'xGrad2: ' + xGrad2 + ', yGrad2: ' + yGrad2 + ', radius: ' + radius + ', radius2: ' + radius2);

			//create gradient ^_^
			gradient = context.createRadialGradient(centerX+xGrad, centerY+yGrad, radius, centerX + xGrad2, centerY + yGrad2, radius2);

			if(colorArray.shadowObj.drawShadowBoolean){
				context.shadowBlur = colorArray.shadowObj.shadowBlur;
				context.shadowOffsetX = colorArray.shadowObj.shadowOffsetX;
				context.shadowOffsetY = colorArray.shadowObj.shadowOffsetY;
				context.shadowColor = colorArray.shadowObj.shadowColor;
			}

			for (let c=0; c < thePaints.length; c++){
				if((thePaints[c]!="")&&(colorArray.gradDivValues[c]!=0)&&(acceptableColor(thePaints[c]))){
					gradient.addColorStop(colorArray.gradDivValues[c], thePaints[c]);
				}
			}
			fillBucket=gradient;
		}
		else if (gradientVal=="pattern"){
			//alert(colorArray.pattern);
			//let processed = extractFilename(colorArray.pattern);
			//alert(processed);
			//let hiddenImage=document.getElementById("secretImageHolder");
			//hiddenImage.setAttribute("src", "images/" + processed);
			context.scale(.1,.1);
			let pat = context.createPattern(colorArray.pattern, colorArray.patternStyle);
			context.scale(10,10); //resets size???
			//NOTE: what if patternOffsetX/Y is null/undefined?
			if((colorArray.patternObj.patternOffsetX!=0)||(colorArray.patternObj.patternOffsetY!=0)||(colorArray.patternObj.patternOffsetBoolean)){
				let moveX=colorArray.patternObj.patternOffsetX;
				let moveY=colorArray.patternObj.patternOffsetY;
				if(colorArray.patternObj.patternOffsetBoolean){
					moveX+=pointArray[0].pressedX;
					moveY+=pointArray[0].pressedY;
				}
				context.translate(moveX, moveY);	
			}
			fillBucket=pat;
		}
		context.fillStyle=fillBucket;
		return(fillBucket);
	}
}

//just cut and paste from: https://html.spec.whatwg.org/multipage/input.html#fakepath-srsly :D
function extractFilename(path) {
  if (path.substr(0, 12) == "C:\\fakepath\\")
    return path.substr(12); // modern browser
  var x;
  x = path.lastIndexOf('/');
  if (x >= 0) // Unix-based path
    return path.substr(x+1);
  x = path.lastIndexOf('\\');
  if (x >= 0) // Windows-based path
    return path.substr(x+1);
  return path; // just the file name
}

function isHex(h) {
	var a = parseInt(h,16);
	return (a.toString(16) === h.toLowerCase());
}

function acceptableColor(color){
	let acceptableColor=true;
	if((color.length!=4)&&(color.length!=7)){
		acceptableColor=false;
		console.log('color.length was ' + color.length);	
	}
	else {
		if(color[0]!="#"){
			console.log('color[0] was ' + color[0]);
			acceptableColor=false;
		}
		else {
			for (var c=1; c < color.length; c++){
				if(isHex(color[c])){
				}
				else {
					acceptableColor=false;
				}
			}
		}
	}
	return(acceptableColor);
}

function getRadius(x1, y1, x2, y2){
	return(Math.sqrt(Math.pow((x1-x2),2)+Math.pow((y1-y2),2)));
}

function otherDrawingAlterations(pointArray, colorArray, contexto, action){
	let ex=pointArray[0].pressedX;
	let why=pointArray[0].pressedY;

	let width=(pointArray[0].releasedX-pointArray[0].pressedX);
	let height=(pointArray[0].releasedY-pointArray[0].pressedY);
	let cx=pointArray[0].pressedX+(width/2);
	let cy=pointArray[0].pressedY+(height/2);
	let specialInfo={};

	if(action=="set"){
		contexto.translate(cx, cy);	 //translate to center of shape
		contexto.rotate((Math.PI /180) *colorArray.angle); //angle
		contexto.translate(-cx, -cy);

		contexto.scale(colorArray.drawScaleX, colorArray.drawScaleY);
	}
	else {
		contexto.scale(1/colorArray.drawScaleX, 1/colorArray.drawScaleY);

		contexto.translate(cx, cy);	 //translate to center of shape
		contexto.rotate((Math.PI /180)*(-colorArray.angle)); //angle
		contexto.translate(-cx, -cy);
	}

	if(colorArray.invertBool){ //invert the picture/drawing.  This one will take more time.  ^_^
		//I got here... for some reason ^_^''
		//let fillIn=getRadioValue("gradient", "noGradient");
		if((colorArray.fillIn!="pattern")){
			let thisArray=[]; let withoutHashtag; let red, green, blue; let redBase10, greenBase10, blueBase10;
			let newString="";
			for (var v=0; v < colorArray.colorValues.length; v++){
				withoutHashtag=colorArray.colorValues[v].replace("#",""); //the current color, now without a hashag
				console.log(withoutHashtag);
				red=withoutHashtag.slice(0,2); //grab the red, green, and blue "strings"
				green=withoutHashtag.slice(2,4);
				blue=withoutHashtag.slice(4,6);

				redBase10=parseInt(red, 16); //get the base 10 values ^_^
				greenBase10=parseInt(green, 16);
				blueBase10=parseInt(blue, 16);

				red=255-redBase10; //invert colors ^_^
				green=255-greenBase10;
				blue=255-blueBase10;

				
				red=base10To16(red, "number", "string");  //change back into a string.
				green=base10To16(green, "number", "string");
				blue=base10To16(blue, "number", "string");
				newString="#"+red+green+blue; //combine into "new" inverted color ^_^
				thisArray.push(newString);
				//console.log('at line 981, newString is ' + newString);
			}
			invertedColorArray=thisArray;
			//console.log(invertedColorArray);
		}
	}

	//alpha
	let alpha = colorArray.alpha;
	if(alpha<0){
		alpha=0;
	}
	if(alpha>1){
		alpha=1;
	}
	contexto.globalAlpha=alpha;

	return(specialInfo);

	/*pattern: hiddenImage, //if fillType is pattern? The hiddenImage is an element, so to speak ^_^
	patternStyle: patternStyle,
	*/
}

function dataImageCreator(height, width, red, green, blue, alpha){ //doesn't work, so to speak.
	let data = new Uint8ClampedArray(height*width);
	for (var u=0; u < data.length; u+=4){
		data[u]=red;
		data[u+1]=green;
		data[u+2]=blue;
		data[u+3]=alpha;
	}
	let thisObj={height: height, width: width, data: data}
	return(thisObj);
}
function drawImage(pointArray, colorArray, imageObj, action, action1, brightenBy) {
	var canvas = document.getElementById('testCanvas');
	var context = canvas.getContext('2d');
	otherDrawingAlterations(pointArray, colorArray, context, "set");

	let xScale=colorArray.drawScaleX;
	let yScale=colorArray.drawScaleY;
	let x=pointArray[0].pressedX; //x and y don't come out right.
	let y=pointArray[0].pressedY;

	alert('xScale is: ' + xScale + ", yScale is: " + yScale + ", x " + x + ', y ' + y);
	
	//context.scale(xScale,yScale);
	context.drawImage(imageObj, x, y);

	var imageData = context.getImageData(x, y, imageObj.width, imageObj.height);
	var data = imageData.data;
	//invert colors, lolz ^_^
	//let brightenBy=150;
	for(var i = 0; i < data.length; i += 4) { 
		//if((i % 256)<128){ //makes it only a section ^_^
			if(action=="brightenBy"){
	    		for(var a=0; a < 3; a++){
	        		if((data[i+a]+brightenBy)<"255"){
	        			data[i+a]+=brightenBy;
	        		}
	        		else {
	        			data[i+a]=255;
	        		}
	    		}
	    	}
	    	else if (action=="invert"){
	    		//thus far ^_^
	  			data[i] = 0; //255 - data[i]; // red 
	  			data[i + 1] = 0; //255 - data[i + 1]; // green
	  			data[i + 2] = 0; //255 - data[i + 2]; // blue  	        		
	    	}
			
		//}         
	}

	// overwrite original image
	context.putImageData(imageData, x*xScale, y*yScale);
	//context.scale(1/xScale,1/yScale);

	otherDrawingAlterations(pointArray, colorArray, context, "reverse");

	//"cxt" does NOT support addEventListener
	//if(record){
	//	addDrawing(pointArray, colorArray, "Circle"); //um...paste???
	//}
}

let gridFunds=1000; let storedGridSection;
//mission types (tested): "checkForExactMatch", "turnToColor", "sampleColor"
//mission types (untested): "checkForColorPercentage", "colorProximity"
//mission types (in progress): "createPicture"//use an already made script instead???
function analyzeAGrid(actionObj, imageObj, sectionWidth, sectionHeight, x, y){
	let xInSection=x % sectionWidth; //the x coordinate within the section
	let yInSection=y % sectionHeight; //the y coordinate within the section
	let xBlockStart = Math.floor(x/sectionWidth)*sectionWidth;
	let yBlockStart = Math.floor(y/sectionHeight)*sectionHeight;

	var canvas = document.getElementById('testCanvas');
	var gridText = canvas.getContext('2d');
	//var imageData=gridText.createImageData(sectionWidth, sectionHeight);
	var imageData= gridText.getImageData(xBlockStart, yBlockStart, sectionWidth, sectionHeight); //section from the canvas ^_^
	let percentage=0;
	let count=0;

	if(actionObj.mission=="checkForExactMatch"){ //{x: x, y: y, mission: "checkForExactMatch"}
		let secretTestCanvas = document.getElementById("secretTestCanvas");
		let secretText=secretTestCanvas.getContext("2d");
		secretText.drawImage(document.getElementById("secretImageHolder1"), 0, 0); //successfully draws picture, unscaled ^_^
		let secretImageData=secretText.getImageData(xBlockStart, yBlockStart, sectionWidth, sectionHeight); //actionObj.x, actionObj.y,
		if(secretImageData.data.length==imageData.data.length){
			let matchCount=0;
			for(var i = 0; i < imageData.data.length; i += 4) { 
				if(actionObj.mission=="checkForExactMatch"){ //currently the only one now ^_^
					if((imageData.data[i]==secretImageData.data[i])&&(imageData.data[i+1]==secretImageData.data[i+1])&&(imageData.data[i+2]==secretImageData.data[i+2])){
						matchCount++;
					}
		    	}
			}
			let lengthy=imageData.data.length/4;
			percentage=(matchCount*100)/lengthy;
			alert("matchCount is: " + matchCount + ".  imageData.data.length/4 is " + lengthy + ".  Percentage match is: " + percentage + "%.")
		}
		else {
			alert('secretImageData.data.length was ' + secretImageData.data.length + ", while imageData.data.length was " + imageData.data.length);
		}
	}
	else if(actionObj.mission=="createPicture"){
		let secretTestCanvas = document.getElementById("secretTestCanvas");
		let secretText=secretTestCanvas.getContext("2d");
		secretText.drawImage(imageObj, 0, 0); 
		let secretImageData=secretText.getImageData(0,0,sectionWidth, sectionHeight);
		gridText.putImageData(secretImageData, xBlockStart, yBlockStart);
	}
	else if(actionObj.mission=="storeGridSection"){
		storedGridSection=gridText.getImageData(xBlockStart, yBlockStart, sectionWidth, sectionHeight);
	}
	else if(actionObj.mission=="releaseStoredGrid"){
		gridText.putImageData(storedGridSection, xBlockStart, yBlockStart);
	}
	else {
		if((actionObj.mission=="eatColors")||(actionObj.mission=="deleteColors")||(actionObj.mission=="purgeWeakness")||(actionObj.mission=="calculateColorDiet")){
			var strongColorAdd=0; //let not working here.
			var weakColorAdd=0; //let not working here.

			var strongColorIndex=0;
			var weakColorIndex=0;
			var neutralColorIndex=0;
			//alert("rgbGame.strengthColor is: " + rgbGame.strengthColor + "rgbGame.weaknessColor is: " + rgbGame.weaknessColor);
			if((rgbGame.strengthColor=="#00FF00")||(rgbGame.strengthColor=="green")){
				strongColorIndex=1;
			}
			else if((rgbGame.strengthColor=="#0000FF")||(rgbGame.strengthColor=="blue")){
				strongColorIndex=2;
			}
			if((rgbGame.weaknessColor=="#00FF00")||(rgbGame.weaknessColor=="green")){
				weakColorIndex=1;
			}
			else if((rgbGame.weaknessColor=="#0000FF")||(rgbGame.weaknessColor=="blue")){
				weakColorIndex=2;
			}

			if((weakColorIndex==0)||(strongColorIndex==0)){
				neutralColorIndex++;
			}
			if((weakColorIndex==1)||(strongColorIndex==1)){
				neutralColorIndex++;
			}
			//alert("strongColorIndex is: " + strongColorIndex + ", neutralColorIndex is " + neutralColorIndex + ", weakColorIndex is " + weakColorIndex);
		}

		let color=colorTranslator("hexToDeci", actionObj.color); //returns a base 10 color array, so to speak ^_^

		//alert('color is: ' + color + ", imageData.data.length is: " + imageData.data.length);
		for(var i = 0; i < imageData.data.length; i += 4) { 
			//console.log(data[i] + ", " + data[i+1] + ", " + data[i+2] + ", " + data[i+3]);
			if(actionObj.mission=="turnToColor"){ //change everything in this section to a specific color				
	    		imageData.data[i]=color[0];
	    		imageData.data[i+1]=color[1];
	    		imageData.data[i+2]=color[2];
	    		imageData.data[i+3]=255; //make sure the alpha is maxed out ^_^

	    	}
	    	else if(actionObj.mission=="checkForColorPercentage"){ //check percentage color match within a grid ^_^
	    		if((imageData.data[i]==color[0])&&(imageData.data[i+1]==color[1])&&(imageData.data[i+2]==color[2])){
	    			count++;
	    		}
	    	}
	    	else if((actionObj.mission=="eatColors")||(actionObj.mission=="deleteColors")||(actionObj.mission=="calculateColorDiet")){	    		
	    		weakColorAdd+=imageData.data[i+weakColorIndex];
	    		imageData.data[i+weakColorIndex]=0;
	    		if(rgbGame.twentyBool){
	    			if(imageData.data[i+strongColorIndex]>50){
	    				strongColorAdd+=(imageData.data[i+strongColorIndex]-50);
	    				imageData.data[i+strongColorIndex]=50;
	    			}
	    		}
	    		else {
	    			strongColorAdd+=imageData.data[i+strongColorIndex];
	    			imageData.data[i+strongColorIndex]=0;
	    		}
	    		imageData.data[i+neutralColorIndex]=0;
	    		imageData.data[i+3]=255;
	    	}
	    	else if(actionObj.mission=="purgeWeakness"){
	    		imageData.data[i+weakColorIndex]=0;
	    	}
		}

		if((actionObj.mission=="eatColors")||(actionObj.mission=="deleteColors")||(actionObj.mission=="purgeWeakness")){
			gridText.putImageData(imageData, xBlockStart, yBlockStart); //xBlockStart, yBlockStart

			if(actionObj.mission=="eatColors"){
				let gW=parseInt(document.getElementById("gridWidth").value, 10);
				let gH=parseInt(document.getElementById("gridHeight").value, 10);
				let ratio=(gW*gH)/256;
				let mana=Math.round(strongColorAdd/(1000*ratio));
				let healthLoss=Math.round(weakColorAdd/(1000*ratio));
				rgbGame.mana+=mana;
				rgbGame.health-=healthLoss;
				//reset display ^_^
				document.getElementById("RGB_Health").innerHTML="Health: " + rgbGame.health.toString();
				document.getElementById("RGB_Mana").innerHTML="Mana: " + rgbGame.mana.toString();
				document.getElementById("RGB_Console").innerHTML="mana " + mana + ", health -" + healthLoss;
			}
			//alert("mana is: " + mana + ", healthLoss is: " + healthLoss + ", weakColorIndex is: " + weakColorIndex + ", neutralColorIndex is: " + neutralColorIndex + ", strongColorIndex is: " + strongColorIndex);
		}
		if(actionObj.mission=="calculateColorDiet"){
			let gW=parseInt(document.getElementById("gridWidth").value, 10);
			let gH=parseInt(document.getElementById("gridHeight").value, 10);
			let ratio=(gW*gH)/256;
			let mana=Math.round(strongColorAdd/(1000*ratio));
			let healthLoss=Math.round(weakColorAdd/(1000*ratio));

			document.getElementById("RGB_Console").innerHTML="mana gain would be " + mana + ", health loss would be -" + healthLoss;
		}
		if(actionObj.mission=="turnToColor"){
			//alert("xBlockStart is " + xBlockStart + ", yBlockStart is " + yBlockStart + ", count is " + count);
			gridText.putImageData(imageData, xBlockStart, yBlockStart); //xBlockStart, yBlockStart
		}
	    if((actionObj.mission=="sampleColor")||(actionObj.mission=="colorProximity")){ //returns color sample from this section
	    	let val0=Math.floor(imageData.data.length/2);
	    	let val1=val0 % 4; //make sure this is evenly divisible by 4 ^_^
	    	let val2=val0-val1; //find about halfway through the grid.

	    	let sW=sectionWidth*2; //similar process to find the middle of the "x" line ^_^
	    	let sW1=sW % 4;
	    	let sW2=sW-sW1;

			let point=val2+sW2;	//roughly the center of the section ^_^
			let colorA=[imageData.data[point], imageData.data[point+1], imageData.data[point+2]];

			if(actionObj.mission=="sampleColor"){
				let disCol=colorTranslator("deciToHex", colorA);
				return({color: disCol, alpha: imageData.data[point+3]});  //return color and alpha at center of square ^_^	
			}
			else if(actionObj.mission=="colorProximity"){ //mission, color (in hex), alpha.
				let redSim=Math.abs(imageData.data[point]-color[0]);
				let greenSim=Math.abs(imageData.data[point+1]-color[1]);
				let blueSim=Math.abs(imageData.data[point+2]-color[2]);
				let averageSim=Math.abs((redSim+greenSim+blueSim)/3);
				let alphaSim=Math.abs(imageData.data[point+3]-actionObj.alpha);
				return({colorSim: [redSim, greenSim, blueSim], colorAverage: averageSim, alphaSim: alphaSim});  //return color and alpha at center of square ^_^	
			}
		}

		if(actionObj.mission=="checkForColorPercentage"){ //analyze and return percentage ^_^
			return(count/(sectionWidth*sectionHeight));
		}		
	}
}

let rgbGame={}; let treasureMap=new Map(); rbgCycler=-1; let keyMap = new Map();
let gameBackground=-1;

function RGBGame(action) {	
	if(action=="start"){
		//these may change throughout game
		let twentyBool=document.getElementById("twentyBool").checked;
		let manaAbility=document.getElementById("manaAbility").value;

		//these don't (well, shouldn't) change throughout game ^_^.
		let strengthColor=document.getElementById("strengthColor").value;
		let neutralColor=document.getElementById("neutralColor").value;
		let weaknessColor=document.getElementById("weaknessColor").value;

		//gets some basic info for the game and puts it in an object ^_^
		let sectionWidth=parseFloat(document.getElementById("gridWidth").value);
		let sectionHeight=parseFloat(document.getElementById("gridHeight").value);
		let width = Math.floor(myCanvas.width/sectionWidth)*sectionWidth;
		let height = Math.floor(myCanvas.height/sectionHeight)*sectionHeight;

		rgbGame={
			health: 100,
			mana: 0, 
			twentyBool: twentyBool,
			manaAbility: manaAbility,
			strengthColor: strengthColor,
			neutralColor: neutralColor,
			weaknessColor: weaknessColor,
			sectionHeight: sectionHeight,
			sectionWidth: sectionWidth,
			width: width, 
			height: height,
			moves: 0,
			piece: {}
		}
		//rgbGame.cycler
		rbgCycler=setInterval(function(){
			RGBGame("step");
		}, 500); //set the step cycler //

		//reset the display ^_^.
		document.getElementById("RGB_Health").innerHTML="Health: " + rgbGame.health.toString();
		document.getElementById("RGB_Mana").innerHTML="Mana: " + rgbGame.mana.toString();
		document.getElementById("RGB_Console").innerHTML="";

		//decide where treasure and player start out ^_^
		let roll=Math.floor(Math.random()*4);
		if(roll==0){
			rgbGame.piece.x=2*rgbGame.sectionWidth;
			rgbGame.piece.y=2*rgbGame.sectionHeight;

			treasureMap.set(treasureMap.size, {
				x: rgbGame.width-2*rgbGame.sectionWidth,
				y: rgbGame.height-2*rgbGame.sectionHeight
			});
		}
		else if(roll==1){
			rgbGame.piece.x=rgbGame.width-2*rgbGame.sectionWidth;
			rgbGame.piece.y=2*rgbGame.sectionHeight;

			treasureMap.set(treasureMap.size, {
				x: 2*rgbGame.sectionWidth,
				y: rgbGame.height-2*rgbGame.sectionHeight
			});
		}
		else if(roll==2){
			rgbGame.piece.x=rgbGame.width-2*rgbGame.sectionWidth;
			rgbGame.piece.y=rgbGame.height-2*rgbGame.sectionHeight;	

			treasureMap.set(treasureMap.size, {
				x: 2*rgbGame.sectionWidth,
				y: 2*rgbGame.sectionHeight
			});
		}
		else if(roll==3){
			rgbGame.piece.x=2*rgbGame.sectionWidth;
			rgbGame.piece.y=rgbGame.height-2*rgbGame.sectionHeight;	

			treasureMap.set(treasureMap.size, {
				x: rgbGame.width-2*rgbGame.sectionWidth,
				y: 2*rgbGame.sectionHeight
			});
		}
		console.log(treasureMap.get(treasureMap.size-1));
		
		//create/draw stuff ^_^
		let actionObj={
			mission: "turnToColor",
			color: "#FFD700" //gold ^_^
		}

		console.log(actionObj);
		console.log(rgbGame);
		

		//draw treasure ^_^
		treasureMap.forEach((value, key, map) =>{
			//console.log(key + ": " + value);
			//console.log(value.x + ", " + value.y);
			analyzeAGrid(actionObj, -1, rgbGame.sectionWidth, rgbGame.sectionHeight, value.x, value.y)
		});

		//draw character ^_^
		analyzeAGrid({mission: "storeGridSection", color: "#000000"}, -1, rgbGame.sectionWidth, rgbGame.sectionHeight, rgbGame.piece.x, rgbGame.piece.y)
		actionObj={
			mission: "createPicture",
			color: "#000000" //it could be any, so to speak ^_^
		}
		analyzeAGrid(actionObj, document.getElementById("character"), rgbGame.sectionWidth, rgbGame.sectionHeight, rgbGame.piece.x, rgbGame.piece.y);

		//canvases do not display their children or their contents, so to speak.
		//let playerElement=document.createElement("DIV"); 
		//playerElement.className+=" piece";
		//let sprite="images/Cousins0.jpg";
		//playerElement.style.backgroundImage ="url(" + sprite + ")"; 
		//shadowControl.appendChild(playerElement); 

		document.addEventListener('keydown', rgbControls);
		document.addEventListener('keyup', deleteKeys);
		document.getElementById("RGB_Console").innerHTML="Game Started!";
	}
	else if(action=="end"){
		if(gameBackground!=-1){
			var imageObj = new Image();
			imageObj.src = gameBackground;
			imageObj.onload = function() {
				//console.log(action + '-ing.  CanvasURLArrayIndex is: ' + CanvasURLArrayIndex)
				let context=myCanvas.getContext("2d");
				context.drawImage(imageObj, 0, 0);
			};		
		}
		document.removeEventListener("keydown", rgbControls);
		document.removeEventListener("keydown", deleteKeys);

		clearInterval(rbgCycler);
		rgbGame={};
		document.getElementById("RGB_Console").innerHTML="Game Ended!";
	}
	else if(action=="step"){ //have player fall if square below it is black :D

	}
}
document.getElementById("RGB_StartGame").addEventListener("click", (event)=>{
	let strengthColor=document.getElementById("strengthColor").value;
	let neutralColor=document.getElementById("neutralColor").value;
	let weaknessColor=document.getElementById("weaknessColor").value;

	gameBackground=myCanvas.toDataURL();

	if((weaknessColor!=neutralColor)&&(weaknessColor!=strengthColor)
		&&(neutralColor!=strengthColor)){
		RGBGame("start");
	}
	else {
		alert("weaknessColor, neutralColor, and strengthColor must not overlap.")
	}

});
document.getElementById("RGB_EndGame").addEventListener("click", (event)=>{
	RGBGame("end");
});

document.getElementById("twentyBool").addEventListener("change", (event)=>{
	rgbGame.twentyBool=event.target.checked;
	//alert("rgbGame.twentyBool is: " + rgbGame.twentyBool);
});
document.getElementById("manaAbility").addEventListener("change", (event)=>{
	rgbGame.manaAbility=event.target.value;
	//alert("rgbGame.manaAbility is: " + rgbGame.manaAbility);
});

const deleteKeys = (event)=>{
	console.log(event.keyCode);
	keyMap.delete(event.keyCode); 
	//keyMap.clear//clears the map of values
}

function keyDir(key){
	let obj={
		dirKey: false,
		ex: 0, 
		why: 0
	};

	if((key==37)||(key==38)||(key==39)||(key==40)||(key==98)||(key==100)||(key==102)||(key==104)){
		obj.dirKey=true;
		if((key==37)||(key==100)){ //left arrow		
			obj.ex=-1;
			obj.why=0;
		}
		if((key==38)||(key==104)){ //up arrow
			obj.ex=0;
			obj.why=-1;
		}
		if((key==39)||(key==102)){ //right arrow
			obj.ex=1;
			obj.why=0;
		}
		if((key==40)||(key==98)){ //down arrow
			obj.ex=0;
			obj.why=1;
		}
	}
	return(obj);
};

const rgbControls = (event)=>{ //this worked, suprisingy, even though I don't actively pass in the event, so to speak ^_^
	//this also keeps new input for sectionHeight and sectionWidth from being put in.  Accidental, but seems fine ^_^.
	//After all, once the game starts, maybe we shouldn't be changing it anywayz.  :)
	event.preventDefault(); 
	var key = event.which || event.keyCode; //to be more cross compatible with browsers ^_^
	keyMap.set(event.keyCode, 'pressed');
	
	let dirKey=keyDir(key);

	if(dirKey.dirKey){ //if a directional key has been pressed
		if(keyMap.get(32)=='pressed'){ //in case the spacebar is pressed.  of course an arrow key is pressed.  That's how we got here ^_^
			arrowSpace(dirKey.ex, dirKey.why);
		}
		else if(keyMap.get(18)=="pressed"){ //in case the alt key is pressed ^_^
			let x=rgbGame.piece.x//+xChange*width;
			let y=rgbGame.piece.y//+yChange*height;
			//x+xChange*width, y+yChange*height
			analyzeAGrid({mission: "calculateColorDiet", color: "#000000"}, -1, rgbGame.sectionWidth, rgbGame.sectionHeight, x+dirKey.ex*rgbGame.sectionWidth, y+ dirKey.why*rgbGame.sectionHeight)
		}
		else {
			move(dirKey.ex, dirKey.why); //store, cover, replace
		}
	}
	
	if(key==32){ //spacebar
		//rgbGame.manaAbility;
		//console.log('spacebar key');
		if(rgbGame.manaAbility=="healCharacter"){
			if(rgbGame.mana>=12){
				rgbGame.health+=10;
				rgbGame.mana-=12;

				document.getElementById("RGB_Health").innerHTML="Health: " + rgbGame.health.toString();
				document.getElementById("RGB_Mana").innerHTML="Mana: " + rgbGame.mana.toString();
				document.getElementById("RGB_Console").innerHTML="";
			}
		}
	}
	if(key==16){ //shift key
		console.log('shift key');
	}
	if(key==17){ //ctrl key
		console.log('ctrl key');
	}
	if(key==18){ //alt key
		console.log('alt key');
	}

	if(rgbGame.health<=0){
		RGBGame("end");
	}
}

function arrowSpace(xChange, yChange){
	let width=rgbGame.sectionWidth;
	let height=rgbGame.sectionHeight;
	let x=rgbGame.piece.x//+xChange*width;
	let y=rgbGame.piece.y//+yChange*height;

	if(rgbGame.manaAbility=="purgeWeakness"){
		if(rgbGame.mana>=30){
			analyzeAGrid({mission: "purgeWeakness", color: "#000000"}, -1, width, height, x+xChange*width, y+yChange*height);
			rgbGame.mana-=30;
		}
	}
	else if(rgbGame.manaAbility=="deleteSquare"){
		if(rgbGame.mana>=5){
			analyzeAGrid({mission: "deleteColors", color: "#000000"}, -1, width, height, x+xChange*width, y+yChange*height);
			rgbGame.mana-=5;
		}
	}

	document.getElementById("RGB_Health").innerHTML="Health: " + rgbGame.health.toString();
	document.getElementById("RGB_Mana").innerHTML="Mana: " + rgbGame.mana.toString();
	document.getElementById("RGB_Console").innerHTML="";
}

function move(xChange, yChange){
	let width=rgbGame.sectionWidth;
	let height=rgbGame.sectionHeight;
	let x=rgbGame.piece.x//+xChange*width;
	let y=rgbGame.piece.y//+yChange*height;

	if(((x+xChange*width)>=0)&&((x+xChange*width)<myCanvas.width)&&((y+yChange*height)>=0)&&((y+yChange*height)<myCanvas.height)){
		rgbGame.moves++;

		analyzeAGrid({mission: "releaseStoredGrid", color: "#000000"}, -1, width, height, x, y);

		analyzeAGrid({mission: "eatColors", color: "#000000"}, -1, width, height, x+xChange*width, y+yChange*height);
		analyzeAGrid({mission: "storeGridSection", color: "#000000"}, -1, width, height, x+xChange*width, y+yChange*height);
		analyzeAGrid({mission: "createPicture",color: "#000000"}, document.getElementById("character"), width, height, x+xChange*width, y+yChange*height);
		rgbGame.piece.x+=(xChange*width);
		rgbGame.piece.y+=(yChange*height);		
	}
}
/*	
	PictureWorld.  
	So I'm thinking that: 

	Section 0: 
	a) there will be a system that can compare the picture stored to the picture in that grid.
	b)  This image will probably NOT be able to be stored in the actionObj.  
	I think I may need another parameter, or can I get an 8bitClampedArray (?) ?
	c) check a place and figure out what the picture is :)
	d) figure out how much it costs to build certain things?

	e) we should be able to save pictures.  
	f) we should be able to sample a grid to check for color :D

	z") create a (separate?) script that can tell what part of a grid I've clicked (?), 
	and plug that value into the analyzeGrid script (?)

	Section 1:
	There should be a limited number of colors that can be chosen from?
	
	aqua, black, blue, fuchsia
	gray, green, lime, maroon
	navy, olive, purple, red,
	silver, teal, white, yellow

	white - blank space
	yellow - coins.  (or farm space)
	teal - the player.
	silver - energy capsules.

	red - fireball
	purple - block that the character can create.
	olive - 
	navy - 

	maroon - lava.  Will kill character.
	lime - another falling dangerous projectile.
	green - 
	black - platform.  Character won't fall through this.
	
	
	fuchsia - blast that the character creates.
	blue - water.  
	black - platform
	aqua - ice.  player will slide.





	a) the red color is for fire blocks

*/

function gridGame0(action, value){
	switch(value){
		case "aqua":
			if(action=="color"){
				return("#00FFFF");
			}
			else if (action=="cost"){
				return(20);
			}
			else if(action=="type"){
				return("ice");
			}
		break;

		case "black":
			if(action=="color"){
				return("#000000");
			}
			else if (action=="cost"){
				return(20);
			}
			else if(action=="type"){
				return("");
			}
		break;

		case "blue":
			if(action=="color"){
				return("#0000FF");
			}
			else if (action=="cost"){
				return(20);
			}
			else if(action=="type"){
				return("water");
			}
		break;

		case "fuchsia":
			if(action=="color"){
				return("#FF00FF");
			}
			else if (action=="cost"){
				return(20);
			}
			else if(action=="type"){
				return("");
			}
		break;	

		case "gray":
			if(action=="color"){
				return("#808080");
			}
			else if (action=="cost"){
				return(20);
			}
			else if(action=="type"){
				return("");
			}
		break;

		case "green":
			if(action=="color"){
				return("#008000");
			}
			else if (action=="cost"){
				return(20);
			}
			else if(action=="type"){
				return("jungle");
			}
		break;

		case "lime":
			if(action=="color"){
				return("#00FF00");
			}
			else if (action=="cost"){
				return(20);
			}
			else if(action=="type"){
				return("");
			}
		break;

		case "maroon":
			if(action=="color"){
				return("#800000");
			}
			else if (action=="cost"){
				return(20);
			}
			else if(action=="type"){
				return("");
			}
		break;	

		case "navy":
			if(action=="color"){
				return("#000080");
			}
			else if (action=="cost"){
				return(20);
			}
			else if(action=="type"){
				return("");
			}
		break;

		case "olive":
			if(action=="color"){
				return("#808000");
			}
			else if (action=="cost"){
				return(20);
			}
			else if(action=="type"){
				return("");
			}
		break;

		case "purple":
			if(action=="color"){
				return("#800080");
			}
			else if (action=="cost"){
				return(20);
			}
			else if(action=="type"){
				return("quantum");
			}
		break;

		case "red":
			if(action=="color"){
				return("#FF0000");
			}
			else if (action=="cost"){
				return(20);
			}
			else if(action=="type"){
				return("fire");
			}
		break;	

		case "silver":
			if(action=="color"){
				return("#C0C0C0");
			}
			else if (action=="cost"){
				return(20);
			}
			else if(action=="type"){
				return("metal");
			}
		break;

		case "teal":
			if(action=="color"){
				return("#008080");
			}
			else if (action=="cost"){
				return(20);
			}
			else if(action=="type"){
				return("player");
			}
		break;

		case "white":
			if(action=="color"){
				return("#FFFFFF");
			}
			else if (action=="cost"){
				return(0);
			}
			else if(action=="type"){
				return("blank");
			}
		break;

		case "yellow":
			if(action=="color"){
				return("#FFFF00");
			}
			else if (action=="cost"){
				return(50);
			}
			else if(action=="type"){
				return("money");
			}
		break;				
	}
};

let gridColor="#000000";
document.getElementById("blockColor").addEventListener("change", (event)=>{
	gridColor=event.target.value;
	document.getElementById("gridCost").innerHTML="cost: " + gridGame0("cost", gridColor);
});

function drawCircle(pointArray, colorArray){
	const radius=getRadius(pointArray[0].pressedX, pointArray[0].pressedY, pointArray[0].releasedX, pointArray[0].releasedY);
	const x= pointArray[0].pressedX;
	const y= pointArray[0].pressedY;

	const centerX= (pointArray[0].pressedX + pointArray[0].releasedX)/2;
	const centerY= (pointArray[0].pressedY + pointArray[0].releasedY)/2;

	let xScale=colorArray.drawScaleX;
	let yScale=colorArray.drawScaleY;

	pointArray.level=0;
	let cxt = myCanvas.getContext("2d");
	cxt.beginPath();
	otherDrawingAlterations(pointArray, colorArray, cxt, "set");
	let offsetPatX=0; let offsetPatY=0; let moveX=0; let moveY=0;
	if(colorArray.fillIn=="pattern"){
		offsetPatX=colorArray.patternObj.patternOffsetX;
		offsetPatY=colorArray.patternObj.patternOffsetY;
		moveX=offsetPatX;
		moveY=offsetPatY;
		if(colorArray.patternObj.patternOffsetBoolean){
			moveX+=pointArray[0].pressedX*xScale;
			moveY+=pointArray[0].pressedY*yScale;
		}
	}
	
	//((colorArray.fillIn!="pattern")&&(colorArray.invertBool))
	if((colorArray.fillType=="fill")||(colorArray.fillType=="both")){ //draw filled
		setFill(pointArray, colorArray, cxt);
		if((cxt.fillStyle=="")||(cxt.fillStyle===undefined)){
			cxt.fillStyle="#FF0000"; //red ^_^
		}	
		cxt.arc(centerX/xScale-moveX,centerY/yScale-moveY, radius/(2*xScale), 0, 2 * Math.PI); //offsetPatX, offsetPatY
		cxt.fill();
	}
	else {
		cxt.arc(centerX/xScale-moveX,centerY/yScale-moveY, radius/(2*xScale), 0, 2 * Math.PI);
	}	

	if(colorArray.fillIn=="pattern"){
		cxt.translate(-moveX, -moveY)	
	}
	if((colorArray.fillType=="outline")||(colorArray.fillType=="both")){ //draw filled
		if((colorArray.fillIn!="pattern")&&(colorArray.invertBool)){ //invert colors
			cxt.strokeStyle = invertedColorArray[0];
		}
		else { //default
			cxt.strokeStyle = colorArray.colorValues[0];	
		}
		if(cxt.strokeStyle==""){
			cxt.strokeStyle="#000"; //black ^_^
		}
		controlThatLine(colorArray, cxt);
		cxt.stroke();
	}
	otherDrawingAlterations(pointArray, colorArray, cxt, "reverse"); //keep the changes in "set" from being permenant

	//"cxt" does NOT support addEventListener
	if(record){
		//addDrawing(pointArray, colorArray, "Circle");
		canvasArray("saveNew");
	}
}

function clearCanvas(pointArray, colorArray, save){ //clears specified part of canvas in a rectangular shape ^_^
	console.log('got to "clearCanvas", line 296.')
	const x=pointArray[0].pressedX;
	const y=pointArray[0].pressedY;
	const x2=pointArray[0].releasedX;
	const y2=pointArray[0].releasedY;
	const width=Math.abs(x2-x);
	const height=Math.abs(y2-y);
	
	pointArray.level=0;
	
	let cxt=myCanvas.getContext("2d");
	let xScale=colorArray.drawScaleX;
	let yScale=colorArray.drawScaleY;

	otherDrawingAlterations(pointArray, colorArray, cxt, "set");
	//cxt.clearRect(x,y, width, height);
	cxt.clearRect(x/xScale, y/yScale, width/xScale, height/yScale);
	otherDrawingAlterations(pointArray, colorArray, cxt, "reverse");

	if(save){
		//addDrawing(pointArray, paintArray, "Erasing Rect"); //the paintArray doesn't matter here, because it is never used for clearCanvas, so to speak ^_^
		canvasArray("saveNew");
	}
}

function drawStamp(colorArray, x, y){ //basically, points are controlled as we draw a rectangle/circle :D
	//created to match the points object array for our intensive purposes, so to speak ^_^ :)
	let width=parseFloat(document.getElementById("stampWidth").value);
	let height=parseFloat(document.getElementById("stampHeight").value);
	let action=document.getElementById("stampAction").value;//getRadioValue("gradient", "noGradient");

	let pointObj=[{
 		pressedX: x-width/2, 
 		pressedY: y-height/2,
 		releasedX: x+width/2,
 		releasedY: y+height/2
 	}];

 	if(action=="circle"){
 		drawCircle(pointObj, colorArray);
 	}
 	else if(action=="rectangle"){
 		drawRect(pointObj, colorArray);
 	}
}

function drawRect(pointArray, colorArray){
	let x=pointArray[0].pressedX;
	let y=pointArray[0].pressedY;

	let width=(pointArray[0].releasedX-pointArray[0].pressedX);
	let height=(pointArray[0].releasedY-pointArray[0].pressedY);

	//console.log('drawRectangle, line 1056.')

	pointArray.level=0;
	let cxt = myCanvas.getContext("2d");
	let xScale=colorArray.drawScaleX;
	let yScale=colorArray.drawScaleY;
	//alert('xScale is: ' + xScale + ", yScale is " + yScale);

	cxt.beginPath();
	otherDrawingAlterations(pointArray, colorArray, cxt, "set");
	let offsetPatX=0; let offsetPatY=0; let moveX=0; let moveY=0;
	if(colorArray.fillIn=="pattern"){
		offsetPatX=colorArray.patternObj.patternOffsetX; //+pointArray[0].pressedX
		offsetPatY=colorArray.patternObj.patternOffsetY; //+pointArray[0].pressedY
		moveX=offsetPatX;
		moveY=offsetPatY;
		if(colorArray.patternObj.patternOffsetBoolean){
			moveX+=pointArray[0].pressedX*xScale;
			moveY+=pointArray[0].pressedY*yScale;
		}
	}
	if((colorArray.fillType=="fill")||(colorArray.fillType=="both")){ //fill in drawing
		setFill(pointArray, colorArray, cxt);
		if((cxt.fillStyle=="")||(cxt.fillStyle===undefined)){
			cxt.fillStyle="#FF0000"; //red ^_^
		}
		cxt.rect(x/xScale -moveX,y/yScale -moveY, width/xScale, height/yScale); //to keep the shape from growing/shrinking ^_^
		cxt.fill();
	}
	else {
		cxt.rect(x/xScale-moveX,y/yScale-moveY, width/xScale, height/yScale); //offsetPatX, offsetPatY
	}	

	if(colorArray.fillIn=="pattern"){ //let's turn it back to normal, as the pattern doesn't affect the outline, so to speak ^_^
		cxt.translate(-moveX, -moveY);	
	}
	if((colorArray.fillType=="outline")||(colorArray.fillType=="both")){ //draw filled
		if((colorArray.fillIn!="pattern")&&(colorArray.invertBool)){ //invert colors
			cxt.strokeStyle = invertedColorArray[0];
		}
		else {
			cxt.strokeStyle = colorArray.colorValues[0];
		}
		
		if(cxt.strokeStyle==""){
			cxt.strokeStyle="#000"; //black ^_^
		}
		controlThatLine(colorArray, cxt);
		cxt.stroke();
	}
	otherDrawingAlterations(pointArray, colorArray, cxt, "reverse");
	
	if(record){
		//addDrawing(pointArray, colorArray, "Rectangle");
		canvasArray("saveNew");
	}
}

function drawText(pointArray, colorArray){
	pointArray.level=0;

	let x1=pointArray[pointArray.level].pressedX;
	let y1=pointArray[pointArray.level].pressedY;
	let x2=pointArray[pointArray.level].releasedX;
	let y2=pointArray[pointArray.level].releasedY;	

	let xScale=colorArray.drawScaleX;
	let yScale=colorArray.drawScaleY;

	let text=document.getElementById("deepInTheHeartOfTextUs").value;
	let tO=colorArray.textObj;
	//alert(text);
	console.log(tO);

	let cxt = myCanvas.getContext("2d");
	cxt.moveTo(0,0); //um, good to do each time???
	otherDrawingAlterations(pointArray, colorArray, cxt, "set");

	//special for text ^_^
	cxt.font=tO.fontStyle + " " + tO.fontVarient + " " + tO.fontWeight + " " + tO.fontSize + "px " + tO.font;
	cxt.textAlign = tO.textAlign;
	colorArray.textObj.width=cxt.measureText(text).width;
	//console.log(tO.fontStyle + " " + tO.fontVarient + " " + tO.fontWeight + " " + tO.fontSize + "px " + tO.font);
	//console.log(tO.textAlign);
	//console.log(typeof(colorArray.textObj.width));
	//console.log(typeof(colorArray.textObj.fontSize));
	//console.log(colorArray.textObj.width);
	//console.log(colorArray.textObj.fontSize);
	//console.log('--------end---------')

	let offsetPatX=0; let offsetPatY=0; let moveX=0; let moveY=0;
	if(colorArray.fillIn=="pattern"){
		offsetPatX=colorArray.patternObj.patternOffsetX;
		offsetPatY=colorArray.patternObj.patternOffsetY;
		moveX=offsetPatX;
		moveY=offsetPatY;
		if(colorArray.patternObj.patternOffsetBoolean){
			moveX+=pointArray[0].pressedX;
			moveY+=pointArray[0].pressedY;
		}
	}

	//if(tO.fillTextBoolean){
	if((colorArray.fillType=="fill")||(colorArray.fillType=="both")){ //fill in drawing
		setFill(pointArray, colorArray, cxt);
		if((cxt.fillStyle=="")||(cxt.fillStyle===undefined)){
			cxt.fillStyle="#FF0000"; //red ^_^
		}
		cxt.fillText(text, x1/xScale-moveX, y1/yScale-moveY);
		//cxt.rect(x/xScale -offsetPatX,y/yScale -offsetPatY, width/xScale, height/yScale); //to keep the shape from growing/shrinking ^_^
		//cxt.fill();
	}
	else {
		//cxt.strokeText(text, x1-offsetPatX, y1-offsetPatY);
		//cxt.rect(x/xScale-offsetPatX,y/yScale-offsetPatY, width/xScale, height/yScale);
	}	

	if(colorArray.fillIn=="pattern"){ //let's turn it back to normal, as the pattern doesn't affect the outline, so to speak ^_^
		cxt.translate(-moveX, -moveY);
	}

	//if(tO.fillTextBoolean==false){
	//if((colorArray.fillType=="outline")||(colorArray.fillType=="both")){ //draw filled
	if((colorArray.fillType=="outline")){
		if((colorArray.fillIn!="pattern")&&(colorArray.invertBool)){ //invert colors
			cxt.strokeStyle = invertedColorArray[0];
		}
		else {
			cxt.strokeStyle = colorArray.colorValues[0];
		}
		
		if(cxt.strokeStyle==""){
			cxt.strokeStyle="#000"; //black ^_^
		}
		//controlThatLine(colorArray, cxt);
		//cxt.stroke();
		cxt.strokeText(text, x1/xScale-moveX, y1/yScale-moveY); //offsetPatX, offsetPatY
	}
	otherDrawingAlterations(pointArray, colorArray, cxt, "reverse");
	
	if(record){
		//addDrawing(pointArray, colorArray, "Rectangle");
		canvasArray("saveNew");
	}
}

function drawLine(pointArray, colorArray){
	let x1=pointArray[0].pressedX;
	let y1=pointArray[0].pressedY;
	let x2=pointArray[0].releasedX;
	let y2=pointArray[0].releasedY;	

	let xScale=colorArray.drawScaleX;
	let yScale=colorArray.drawScaleY;

	pointArray.level=0;
	let cxt = myCanvas.getContext("2d");
	cxt.beginPath(); //new ^_^
	if((colorArray.fillIn!="pattern")&&(colorArray.invertBool)){ //invert colors
		cxt.strokeStyle = invertedColorArray[0];
	}
	else {
		cxt.strokeStyle=colorArray.colorValues[0];
	}
	
	cxt.lineWidth=1; //default ^_^
	otherDrawingAlterations(pointArray, colorArray, cxt, "set");
	cxt.moveTo(x1/xScale,y1/yScale);
	cxt.lineTo(x2/xScale,y2/yScale);
	controlThatLine(colorArray, cxt);
	cxt.stroke();
	otherDrawingAlterations(pointArray, colorArray, cxt, "reverse");
	if(record){
		//addDrawing(pointArray, colorArray, "Line");
		canvasArray("saveNew");
	}
}


/*function drawQuadraticCurve(pointArray, type){
	let level=pointArray.level;
	if(level==0){
		let cxt= myCanvas.getContext("2d");
		cxt.beginPath();
		cxt.moveTo(pointArray[0].pressedX, pointArray[0].pressedY);
	}

}*/

//tests for hexidecimal.  DOes it work???
/*var re = /[0-9A-Fa-f]{6}/g;
for (var c=1; c < color.length; c++){
	if(re.test(color[c])){
		alert('valid match!');
	}
	else {
		alert('invalid!')
	}
}*/

/* from manifest.json
  
  "icons": {
    "128": "icon_128.png"
  },
  "app": {
    "urls": [
      "file:///C:/Users/Daniel/IkonneProject/thoughts.html/"
    ],
    "launch": {
      "web_url": "file:///C:/Users/Daniel/IkonneProject/thoughts.html/"
    }
  }
  */