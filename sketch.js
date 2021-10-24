let maze_arr = [];
let maze_width = 20;
let maze_height = 20;
const canvas_size = 600;
let box_size = 0;
let isDraw = true;

function setup() {
  background(51);
  createCanvas(canvas_size, canvas_size);
  frameRate(15);
}

function draw() {
  background(51);
  if (mouseIsPressed && (mouseX > canvas_size || mouseY > canvas_size)) {
    // do nothing
  } else if (mouseIsPressed && isDraw) {
    maze_arr[Math.floor(mouseY / box_size) + 1][Math.floor(mouseX / box_size) + 1] = 1;
  } else if (mouseIsPressed && !isDraw) {
    maze_arr[Math.floor(mouseY / box_size) + 1][Math.floor(mouseX / box_size) + 1] = 0;
  }

  for (let i = 0; i < maze_height; i++) {
    for (let j = 0; j < maze_width; j++) {
      if (maze_arr[i + 1][j + 1] == 0) {
        fill(255, 255, 255);
        rect(j * box_size, i * box_size, box_size);
      } else {
        fill(255, 0, 0);
        rect(j * box_size, i * box_size, box_size);
      }
    }
  }
}

function mousePressed(e) {
  document.getElementById("draw").checked
}

const mazeSetup = () => {
  mazeArrSetup();
}

const mazeArrSetup = () => {
  const maze_arr_width = maze_width + 2;
  const maze_arr_height = maze_height + 2;
  maze_arr = [];
  maze_arr[0] = Array(maze_arr_width).fill(-1);
  for (let i = 1; i < maze_arr_height - 1; i++) {
    maze_arr[i] = Array(maze_arr_width).fill(0);
    maze_arr[i][0] = -1;
    maze_arr[i][maze_arr_width - 1] = -1;
  }
  maze_arr[maze_arr_height - 1] = Array(maze_arr_width).fill(-1);
  const more_box = (maze_width > maze_height) ? maze_width : maze_height;
  box_size = canvas_size / more_box;
  console.log(maze_arr);
}

document.getElementById("widthForm").addEventListener('change', (e) => {
  maze_width = parseInt(e.target.value, 10);
  mazeSetup();
})
document.getElementById("heightForm").addEventListener('change', (e) => {
  maze_height = parseInt(e.target.value, 10);
  mazeSetup();
})

document.getElementById("draw").addEventListener('change', (e) => {
  isDraw = true;
})
document.getElementById("erace").addEventListener('change', (e) => {
  isDraw = false;
})


window.addEventListener('load', () => {
  mazeSetup();
})

const exportFile = () => {
  const obj = {
    width: maze_width,
    height: maze_height,
    maze: maze_arr
  }
  console.log(obj);
  const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'maze.json';
  link.click();
}