const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange"); //브러쉬크기
const mode = document.getElementById("jsMode"); //Fill버튼
const saveBtn = document.getElementById("jsSave"); //Save버튼

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 450;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
//실제 픽셀 사이즈를 적어야 함!
//pixel modifier에 사이즈 필요!

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
//canvas background는 기본적으로 canvas 크기만큼 하얀색
//만약 위 두 개의 설정을 해주지 않으면 투명색 바탕으로 저장됨
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  //offsetX, offsetY는 canvas 안에서의 좌표 위치값
  //모든 움직임을 감지하고 line을 만들어내는 곳
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y); //점에서 점을 연결해줌 (연속된 것처럼 보임)
    ctx.stroke();
  }
}

function onMouseDown(event) {
  painting = true;
}

function onMouseUp(event) {
  stopPainting();
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color; //선택한 색상(backgroundColor)을 rgb값으로 보여줌
  //strokeStyle을 override하고 여기부턴 storkeStyle이 target의 색상이 됨
  ctx.fillStyle = color; //사용자가 색상 선택하면 fillStyle도 그 색상값으로!
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size; //size 위에 overriding
  //우리가 필요한 건 event 안의 여러 값 중, value값임
}

function handleModeClick(event) {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  } //Fill이면 Paint, Paint면 Fill로 바꾸기
}

function handleCanvasClick() {
  if (filling) {
    //filling일 때만 작동하도록 if문을 만들어 줌
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    //코너(좌표 x,y)부터 시작해서 캔버스 크기만큼 채워줌
    //CANVAS_SIZE 대신 canvas.width, canvas.height (O)
  }
}

function handleCM(event) {
  event.preventDefault();
  //마우스 우클릭 방지
}

function handleSaveClick(event) {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a"); //anchor
  link.href = image;
  link.download = "PaintJS[🎨]";
  link.click();
  alert("Your image has been successfully downloaded!");
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  //만약 mouseleave에 startPainting이라는 값을 주게 되면
  //커서가 밖으로 나갔다가 다시 들어올 때 브러쉬가 재시작하게 됨
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);
//검정~보라까지의 색을 array 배열로 만들어 둠
//array 안에서 forEach로 color를 가질 수 있음

if (range) {
  range.addEventListener("input", handleRangeChange);
} //jsRange : 브러쉬크기

if (mode) {
  mode.addEventListener("click", handleModeClick);
} //jsMode : Fill버튼

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
