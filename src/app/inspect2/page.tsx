"use client";
import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./imageAnnotation.css";
import { Helmet } from "react-helmet";
import Image from "next/image";

export default function ImageAnnotation() {
  const [jscript, setJavaScript] = useState("");
  useEffect(() => {
    var script = `
    toolBtns = document.querySelectorAll(".tool"),
    fillColor = document.querySelector("#fill-color"),
    sizeSlider = document.querySelector(".size-slider"),
    colorBtns = document.querySelectorAll(".colors .option"),
    colorPicker = document.querySelector("#color-picker"),
    clearCanvas = document.querySelector(".clear-canvas"),
    saveImg = document.querySelector(".save-img"),
    uploadImg = document.querySelector(".upload-img"),
    createAnnotation = document.querySelector(".create-annotation"),
    deleteAnnotation = document.querySelector(".delete-annotation"),
    DrawTextbox = document.querySelector(".draw-textbox")
    saveAnnotation = document.querySelector(".save-annotation"),
    previewContainer = document.querySelector("previewContainer");
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");
    // document.body.appendChild(canvas);
    
    input = document.querySelector(".fileUpload");
    // input.type = "file";
    // input.multiple = true;
    // input.classNameName = "fileUpload"
    // global variables with default value
    var _prevMouseX, prevMouseY, snapshot,
    isDrawing = false,
    selectedTool = "brush",
    brushWidth = 5,
    selectedColor = "#000";
    
    
    var x = 0;
    var y = 0;
    var width = 100;
    var height = 50;
    var shape = "";
    rectDictList = [];
    imagePath = "canvas.png";
    var x_coord_start = 0;
    var y_coord_start = 0;
    var x_coord_end = 0;
    var y_coord_end = 0;
    image = new Image();
    setCanvasBackground = () => {
        // setting whole canvas background to white, so the downloaded img background will be white
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = selectedColor; // setting fillstyle back to the selectedColor, it'll be the brush color
    }
    
    window.addEventListener("load", () => {
        // setting canvas width/height.. offsetwidth/height returns viewable width/height of an element
        canvas.width = 850;
        canvas.height = 450;
        setCanvasBackground();
    });
    drawingDict= {};
    counter = 0;
    drawRect = (e) => {
        // if fillColor isn't checked draw a rect with border else draw rect with background
        if(!fillColor.checked) {
            // creating rect according to the mouse pointer
            return ctx.strokeRect(e.offsetX, e.offsetY, _prevMouseX - e.offsetX, prevMouseY - e.offsetY);
        }
        ctx.fillRect(e.offsetX, e.offsetY, _prevMouseX - e.offsetX, prevMouseY - e.offsetY);
    }
    
    drawCircle = (e) => {
        ctx.beginPath(); // creating new path to draw circle
        // getting radius for circle according to the mouse pointer
        let radius = Math.sqrt(Math.pow((_prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
        ctx.arc(_prevMouseX, prevMouseY, radius, 0, 2 * Math.PI); // creating circle according to the mouse pointer
        fillColor.checked ? ctx.fill() : ctx.stroke(); // if fillColor is checked fill circle else draw border circle
    }
    
    drawTriangle = (e) => {
        ctx.beginPath(); // creating new path to draw circle
        ctx.moveTo(_prevMouseX, prevMouseY); // moving triangle to the mouse pointer
        ctx.lineTo(e.offsetX, e.offsetY); // creating first line according to the mouse pointer
        ctx.lineTo(_prevMouseX * 2 - e.offsetX, e.offsetY); // creating bottom line of triangle
        ctx.closePath(); // closing path of a triangle so the third line draw automatically
        fillColor.checked ? ctx.fill() : ctx.stroke(); // if fillColor is checked fill triangle else draw border
    }
    
    startDraw = (e) => {
        isDrawing = true;
        _prevMouseX = e.offsetX; // passing current mouseX position as _prevMouseX value
        prevMouseY = e.offsetY; // passing current mouseY position as prevMouseY value
        x_coord_start = _prevMouseX;
        y_coord_start = prevMouseY;
        ctx.beginPath(); // creating new path to draw
        ctx.lineWidth = brushWidth; // passing brushSize as line width
        ctx.strokeStyle = selectedColor; // passing selectedColor as stroke style
        ctx.fillStyle = selectedColor; // passing selectedColor as fill style
        // copying canvas data & passing as snapshot value.. this avoids dragging the image
        snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }
    
    drawing = (e) => {
        if(!isDrawing) return; // if isDrawing is false return from here
        ctx.putImageData(snapshot, 0, 0); // adding copied canvas data on to this canvas
    
        shape = selectedTool;                
        if(selectedTool === "brush" || selectedTool === "eraser") {
            // if selected tool is eraser then set strokeStyle to white 
            // to paint white color on to the existing canvas content else set the stroke color to selected color
            ctx.strokeStyle = selectedTool === "eraser" ? "white" : selectedColor;
            ctx.lineTo(e.offsetX, e.offsetY); // creating line according to the mouse pointer
            ctx.stroke(); // drawing/filling line with color
        } else if(selectedTool === "rectangle"){
          drawRect(e);
        } else if(selectedTool === "circle"){
            drawCircle(e);
        } else {
            drawTriangle(e);
        }
    }
    
  
      
      
    toolBtns.forEach(btn => {
        btn.addEventListener("click", () => { // adding click event to all tool option
            // removing active className from the previous option and adding on current clicked option
            document.querySelector(".options .active").classList.remove("active");
            btn.classList.add("active");
            selectedTool = btn.id;
        });
    });
    
    sizeSlider.addEventListener("change", () => {
      brushWidth = sizeSlider.value;
      
    }); // passing slider value as brushSize
    
    colorBtns.forEach(btn => {
        btn.addEventListener("click", () => { // adding click event to all color button
            // removing selected className from the previous option and adding on current clicked option
            document.querySelector(".options .selected").classList.remove("selected");
            btn.classList.add("selected");
            // passing selected btn background color as selectedColor value
            selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
        });
    });
    
    colorPicker.addEventListener("change", () => {
        // passing picked color value from color picker to last color btn background
        colorPicker.parentElement.style.background = colorPicker.value;
        colorPicker.parentElement.click();
    });
    
    clearCanvas.addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // clearing whole canvas
        setCanvasBackground();
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        rectDictList = [];
    });
    
    uploadImg.addEventListener("click", () => {
      input.style.display = "block";
      input.addEventListener("change", function() {
            for (let i = 0; i < this.files.length; i++) {
              const file = this.files[i];
              imagePath = file.name;
              const reader = new FileReader();
          
              reader.addEventListener("load", function() {
                
                image.src = reader.result;
                console.log("image_path: ",image.src);
          
                image.addEventListener("load", function() {
                  // calculate the aspect ratio of the canvas
                  let aspectRatio = canvas.width / canvas.height;
          
                  // calculate the aspect ratio of the image
                  let imageAspectRatio = image.width / image.height;
          
                  // fit the image to the canvas while preserving aspect ratio
                  if (imageAspectRatio > aspectRatio) {
                    canvas.width = image.width;
                    canvas.height = image.height;
                  } else {
                    canvas.width = image.width;
                    canvas.height = image.height;
                  }
          
                  // draw the image on the canvas
                  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                });
              });
          
              reader.readAsDataURL(file);
            }
          });
         
            // document.querySelector("#inputDiv").appendChild(input);

         
    }
      );
    
    
    
    saveImg.addEventListener("click", () => {
        const link = document.createElement("a"); // creating <a> element
        link.download = '${Date.now()}.jpg'; // passing current date as link download value
        link.href = canvas.toDataURL(); // passing canvasData as link href value
        link.click(); // clicking link to download image
    });
    
    
    saveAnnotation.addEventListener("click", () => {
      
        
        var filename = '${Date.now()}.json';
        var jsonse = JSON.stringify(rectDictList);
        var file = new Blob([jsonse], {type: 'application/json'});
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        else { // Others
            var a = document.createElement("a"),
            url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);  
            }, 0); 
        }
    });
  
    
    
    function createImageOnCanvas(imageId){
        document.getElementById("imgCanvas").style.display = "block";
        document.getElementById("images").style.overflowY= "hidden";
        var canvas = document.getElementById("imgCanvas");
        var context = canvas.getContext("2d");
        var img = new Image(800,800);
        img.src = document.getElementById(imageId).src;
        context.drawImage(img, (0),(0));
    }
    
    function draw(e){
        var canvas = document.getElementById("imgCanvas");
        var context = canvas.getContext("2d");
        posx = e.clientX;
        posy = e.clientY;
        context.fillStyle = "#000000";
        context.fillRect (posx, posy, 4, 4);
    }
    
    mouseup = (e) =>{
      // isMouseDown=false
      if(isDrawing)
      {
        x_coord_end = e.offsetX;
        y_coord_end = e.offsetY;
      }
      isDrawing = false
      console.log(shape + ": " + "starts from: " + "(" + x_coord_start +"," + y_coord_start + ")" +" to: "+ "(" + x_coord_end + "," + y_coord_end + ")");
      drawingDict["imagePath"]= imagePath;
      drawingDict["shape"] = shape;
      if(shape==="rectangle")
        drawingDict["pts"] = "(" + x_coord_start +"," + y_coord_start + "," + x_coord_end + "," + y_coord_end + ")";
      else if(shape==="circle")
        drawingDict["pts"] = "(" + (x_coord_start)  +"," + (y_coord_start) + "," + Math.max((x_coord_end-x_coord_start),(y_coord_end-y_coord_start)) + ")";
      else
        drawingDict["pts"] = "(" + x_coord_start +"," + y_coord_start + "," + x_coord_end + "," + y_coord_end + ")";
      drawingDict["selectedColor"] = selectedColor;
      rectDictList.push(drawingDict);
      
      drawingDict = {};
     }
    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mousemove", drawing);
    canvas.addEventListener("mouseup", mouseup);

    
   
  
   
   
const texts = [];

let inputBox = null;

// Function to draw all the texts stored in the array
function drawTexts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  ctx.font = '20px Arial'; // Set the font size and family
  texts.forEach((textObj) => {
    ctx.fillText(textObj.text, textObj.x, textObj.y);
  });
}

// Function to add text to the canvas
function addTextToCanvas() {
  const text = inputBox.value.trim(); // Get the text from the input box
  if (text) {
    const x = inputBox.offsetLeft; // Get the X-coordinate of the input box
    const y = inputBox.offsetTop; // Get the Y-coordinate of the input box
    texts.push({ text, x, y }); // Add the text and its position to the array
    drawTexts(); // Redraw the canvas with the updated texts
  }
  hideInputBox();
}

// Function to show the input box at the clicked position
function showInputBox(x, y) {
  inputBox = document.createElement('input');
  inputBox.type = 'text';
  inputBox.style.position = 'absolute';
  inputBox.style.left = x + 'px';
  inputBox.style.top = y + 'px';
  inputBox.style.font = '20px Arial';
  inputBox.style.border = 'none';
  inputBox.style.outline = 'none';
  inputBox.style.boxShadow = 'none';
  inputBox.style.background = 'transparent';
  inputBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      addTextToCanvas();
    }
  });
  canvas.parentNode.appendChild(inputBox);
  inputBox.focus();
}

// Function to hide the input box
function hideInputBox() {
  
  if (inputBox) {
    inputBox.parentNode.removeChild(inputBox);
    inputBox = null;
  }
}

// Canvas click event listener
canvas.addEventListener("click", (event) => {
  const x = event.offsetX; // Get the X-coordinate of the click
  const y = event.offsetY; // Get the Y-coordinate of the click
  showInputBox(x, y); // Show the input box at the clicked position
});

    

    `;
    setJavaScript(script);
  }, []);

  return (
    <React.Fragment>
      <div id="imgContainer" className="container">
        <section className="tools-board">
          <div className="row">
            <label className="title">Shapes</label>
            <ul className="options">
              <li className="option tool" id="rectangle">
                <Image
                  src="/images/icons/rectangle.svg"
                  alt="ok"
                  width={30}
                  height={30}
                />
                <span>Rectangle</span>
              </li>
              <li className="option tool" id="circle">
                <Image
                  src="/images/icons/circle.svg"
                  alt="ok"
                  width={30}
                  height={30}
                />
                <span>Circle</span>
              </li>
              <li className="option tool" id="triangle">
                <Image
                  src="/images/icons/triangle.svg"
                  alt="ok"
                  width={30}
                  height={30}
                />
                <span>Triangle</span>
              </li>
              <li className="option">
                <input type="checkbox" id="fill-color" />
                <label htmlFor="fill-color">Fill color</label>
              </li>
            </ul>
          </div>
          <div className="row">
            <label className="title">Options</label>
            <ul className="options">
              <li className="option active tool" id="brush">
                <Image
                  src="/images/icons/brush.svg"
                  alt="ok"
                  width={30}
                  height={30}
                />
                <span>Brush</span>
              </li>
              <li className="option tool" id="eraser">
                <Image
                  src="/images/icons/eraser.svg"
                  alt="ok"
                  width={30}
                  height={30}
                />
                <span>Eraser</span>
              </li>
              <li className="option">
                <input
                  type="range"
                  className="size-slider"
                  id="size-slider"
                  min="1"
                  max="30"
                />
              </li>
            </ul>
          </div>
          <div className="row colors">
            <label className="title">Colors</label>
            <ul className="options">
              <li className="option"></li>
              <li className="option selected"></li>
              <li className="option"></li>
              <li className="option"></li>
              <li className="option">
                <input type="color" id="color-picker" defaultValue="#4A98F7" />
              </li>
            </ul>
          </div>
          <div className="row buttons">
            <button className="clear-canvas">Clear Canvas</button>
            <button className="upload-img">Upload Image</button>
            <button className="save-img">Save As Image</button>
            <button className="save-annotation">Save As Annotation</button>
            <button className="draw-textbox">Draw Textbox</button>
          </div>
        </section>
        <div
          className="canvasDiv"
          style={{
            maxHeight: "500px",
            overflow: "scroll",
            position: "relative",
          }}
        >
          <canvas
            id="canvas"
            className="canvas"
            width="670px"
            height="500px"
          ></canvas>
        </div>
        <div id="inputDiv">
          <input type="file" multiple={false} className="fileUpload" />
        </div>
      </div>
      <div>
        <Helmet>
          <script>{jscript}</script>
        </Helmet>
      </div>
    </React.Fragment>
  );
}
