//VARIABLE
let newNoteString, newNote, sheet;

//ELEMENTS
const noteBoard = document.querySelector("#note-board");
const addButton = document.querySelector("#add-note");
const noteInput = document.getElementById("note-input");
let deleteButton, editButton;
let noteBook  = ["Template", "delay"];


//FUNCTIONS

function DeleteNote (sheet) {
  noteBook.splice(sheet, 1);
  Load();
}

function EditNote (sheet) {
  noteInput.innerText = noteBook[sheet];
  DeleteNote(sheet);
}


function RenderNote (string) {
  newNoteString = string ?? "Empty Note";
  newNote = document.createElement("note");
  noteBoard.appendChild(newNote);


  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.addEventListener("click", (e) => {

    e.target.parentNode.remove();
  });

  let editButton = document.createElement("button");
  editButton.classList.add("edit");
  editButton.addEventListener("click", (e) => {
    noteInput.value = e.target.parentNode.textContent;
    e.target.parentNode.remove();
  });


  newNote.innerHTML = string;
  newNote.append(editButton, deleteButton);

  console.log(deleteButton);
}

function AddNote (string) {
  noteInput.value = "";
  noteBook[noteBook.length] = string;
  RenderNote(string);
}

addButton.addEventListener("click", () => AddNote(noteInput.value));
