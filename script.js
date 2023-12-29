// Function to run the clock on the bottom-right of the desktop.
function updateDateTime() {
    const now = new Date();
    let hour = now.getHours();
    let meridium = "AM"
    if (hour > 12) {
        hour = hour - 12
        meridium = "PM"
    }
    if (hour == 0) {
        hour = 12
    }
    let minute = now.getMinutes()
    if (minute < 10) {
        minute = `0${minute}`
    }
    
    const currentTime = `${hour}:${minute} ${meridium}`;
    document.querySelector('#clock__time').textContent = currentTime;
    const currentDate = `${now.getDate()}/${(now.getMonth()+1)}/${now.getFullYear()}`;
    document.querySelector("#clock__date").textContent = currentDate;
}

// Function to show start menu
function startMenu() {
  const startMenu = document.querySelector(".GUI__startMenu");

  if (startMenu.style.display == '' || startMenu.style.display == 'none') {
    startMenu.style.display = 'flex'
    document.querySelector(".startMenu__shortcuts").display = 'none'
  } else {
    startMenu.style.display = 'none'
  };
}

function startMenuCloser() {
  const startMenu = document.querySelector(".GUI__startMenu");
  startMenu.style.display = 'none'
}

function openModal(modalContent) {
  const dialog = document.querySelector("#modalSkeleton");
  const closeButton = document.querySelector("dialog button");
  modalContent.style.height = "100%";
  modalSkeleton.appendChild(modalContent);
  dialog.showModal();
// "Close" button closes the dialog and removes the created content
  closeButton.addEventListener("click", () => {
    dialog.close();
    modalContent.remove()
  });
}


//background selector modal function
function backgroundSelector() {
  const content1 = document.createElement("div")
  openModal(content1)
  const backgroundImages = [
  "./backgrounds/1.jpg",
  "./backgrounds/2.jpg",
  "./backgrounds/3.jpg",
  "./backgrounds/4.jpg",
  "./backgrounds/5.jpg",
  "./backgrounds/6.webp"];
  const title = "<h1 id='backgroundTitle' class='modalTitle'>Background Selector</h1>"
  const backgrounds = "<section id='backgroundGallery'>"
  let images = ""
  backgroundImages.map((image) => {
    images += `<img class="selectableBackground" src=${image}>`
    content1.innerHTML= `${title} ${backgrounds} ${images}`
  })
  const divs = document.querySelectorAll(".selectableBackground");
  divs.forEach(el => el.addEventListener("click", () => {
    document.querySelector(".GUI").style.backgroundImage = `url(${el.src})`;
  }))
}

//notepad modal function
function notepad () {
  const content1 = document.createElement("div")
  openModal(content1)
  const title = "<h1 id='backgroundTitle' class='modalTitle'>Notepad</h1>"
  const instructions = "<p class='instructions'>Type messages in the left field and save them - they will be stored in the right field.</p>"
  const backgrounds = "<section id='backgroundNotepad'><textarea id='currentNotes'></textarea><ul id='previousNotes'></ul></section>"
  const saveButton = "<button id='saveButton'>Save notes</button>"
  const clearButton = "<button id='clearButton'>Clear notes</button>"
  content1.innerHTML= `${title} ${instructions} ${backgrounds} ${saveButton} ${clearButton}`
  document.querySelector("#saveButton").addEventListener("click", () => {
    const previous = document.querySelector("#previousNotes")
    const current = document.querySelector("#currentNotes")
    previous.innerHTML += (`<li>${current.value}</li>`)
    current.value = ""
  })
  document.querySelector("#clearButton").addEventListener("click", () => {
    const previous = document.querySelector("#previousNotes")
    previous.innerHTML = ""
  })
}

//pixelMaker modal function
function pixelmaker () {
  const content1 = document.createElement("div")
  openModal(content1)
  const title = "<h1 id='pixelTitle' class='modalTitle'>Pixel Art Maker</h1>"
  const subheading = "<h2 class='pixelInstructions'>Choose grid size up to 40x80 cells</h2>"
  const backgrounds = "<form id='sizePicker'>" +
  "Grid Height:" +
  "<input type='number' id='pixelHeight' name='height' min='1' value='1'>" +
  "Grid Width: " +
  "<input type='number' id='pixelWidth' name='width' min='1' value='1'>" +
  "<input type='submit' value = 'Create Canvas!'>" +
  "</form>" +
  "<h2 class='pixelInstructions'>Pick A Color</h2>" +
  "<input type='color' id='colorPicker'>" +
  "<h2 class='pixelInstructions'>Design Canvas</h2>" +
  "<table id='pixelCanvas'></table>"
  content1.innerHTML= `${title} ${subheading} ${backgrounds}`
  const fullTable = document.getElementById('pixelCanvas');
  const sizeSubmit = document.getElementById('sizePicker');
  // The function to remove the extant table, otherwise the new table is just added to the old one.
  function removeGrid() {
    while (fullTable.firstChild) {
      fullTable.removeChild(fullTable.firstChild);
    }
}
// The function to make a new table
function makeGrid() {
  let rows = document.querySelector('#pixelHeight').value;
  let columns = document.querySelector('#pixelWidth').value;
  // Limit the size of the canvas to 40x40 cells
  if (rows > 40) {
        rows = 40;
    }
    if (columns > 80) {
        columns = 80;
    }
    // Loops to create rows and then cells in those rows
    for (let r = 0; r <= rows - 1; r++) {
      let newRow = fullTable.insertRow();
        for (let c = 0; c <= columns - 1; c++) {
            let newCell = newRow.insertCell();
            // Creating the Event Listener that will take the colour from the colorPicker and apply it when the mouse button is depressed.
            newCell.addEventListener('mousedown', function(evt) {
              let color = document.getElementById('colorPicker').value;
                evt.target.style.backgroundColor = color;
            }
            )}
    }
}
// When size is submitted by the user, remove any extant table, then create a new one with the selected parameters.
sizeSubmit.addEventListener('submit', function (create) {
    create.preventDefault();
    removeGrid();
    makeGrid();
  })
}

function recyclingBin () {  
  const content1 = document.createElement("div")
  openModal(content1)
  const title = "<h1 id='backgroundTitle' class='modalTitle'>Recycling Bin</h1>"
  let recyclingBackground = "<img class='recyclingBG' id='landfill' src='./backgrounds/landfill.jpg'>"
  const cleanButton = "<button id='cleanRBButton'>Empty Bin</button>"
  content1.innerHTML= `${title} ${recyclingBackground} ${cleanButton}`
  document.querySelector("#cleanRBButton").addEventListener("click", () => {
    document.getElementById("landfill").src = "./backgrounds/cleaned.webp"
})
}


//initializing the clock in the bottom-right
updateDateTime()
setInterval(updateDateTime, 5000)

//querySelector calls for modal functions
document.querySelector(".startButton__image").addEventListener("click", () => {
  startMenu()
})

document.querySelector("#backgroundFolderButton").addEventListener("dblclick", () => {
  backgroundSelector()
})

document.querySelector("#TBbackgroundFolderButton").addEventListener("click", () => {
  startMenuCloser()
  backgroundSelector()
})

document.querySelector("#SMbackgroundFolderButton").addEventListener("click", () => {
  backgroundSelector()
})

document.querySelector("#notepadButton").addEventListener("dblclick", () => {
  notepad()
})

document.querySelector("#TBnotepadButton").addEventListener("click", () => {
  startMenuCloser()
  notepad()
})

document.querySelector("#SMnotepadButton").addEventListener("click", () => {
  notepad()
})

document.querySelector("#pixelmakerButton").addEventListener("dblclick", () => {
  pixelmaker()
})

document.querySelector("#TBpixelmakerButton").addEventListener("click", () => {
  startMenuCloser()
  pixelmaker()
})

document.querySelector("#SMpixelmakerButton").addEventListener("click", () => {
  pixelmaker()
})

document.querySelector("#recyclingButton").addEventListener("dblclick", () => {
  recyclingBin()
})

document.querySelector("#TBrecyclingButton").addEventListener("click", () => {
  startMenuCloser()
  recyclingBin()
})

document.querySelector("#SMrecyclingButton").addEventListener("click", () => {
  recyclingBin()
})


//eventListener to 'minimize' the start menu when clicked off of or opening a taskbar app.
document.querySelector(".GUI").addEventListener("click", () => { 
  startMenuCloser()
})