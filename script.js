const appContainer = document.getElementById("app-container");
const appDisplay = document.getElementById("app-display");
const editButtons = document.querySelectorAll(".edit-button");
const addNoteBtn = document.getElementById("add-note");

const allNotesArr = [];

class NoteCard {
  constructor(title, note, users) {
    this.title = title;
    this.note = note;
    this.users = users;
    this.createdAt = Date.now()
  };
  
  editNote(type, newData) {
    if (!this[type] || type === "id"){return}
    this[type] = newData;
  }
}

function fillNote(noteObject) {
  let {title, note} = noteObject
  let createdAt = noteObject.createdAt;
  let results = `
  <div class="note-card">
    <h2>${title}</h2>
    <p>${note}</p>
    <p>${createdAt}<p>
    <button class="edit-button">Edit Note</button>
   </div>
  `
  return results
}

function addNote(title, note, users) {
  let noteObject = new NoteCard(title, note, users);
  fillNote(noteObject);
  allNotesArr.push(noteObject);
}

function displayNoteForm() {
    console.log("Inside displayNoteForm()")
    const form = 
    `
    <label for="title">Title:</label>
    <input id="title" name="title">

    <label for="description">Note:</label>
    <input id="description" name="description">

    <label for="users">Users:</label>
    <input id="users" name="users">

    <button type="submit" id="submit-note-btn">Submit Note</button>
    `;

    appDisplay.innerHTML = form;
}

function emptyNotes() {
  appDisplay.innerHTML = "";
}

function renderNotes(dataArr) {
  let parsedDataStr = ``;
  dataArr.forEach((noteData) => {
    let parsedData = fillNote(noteData);
    console.log(parsedData)
    parsedDataStr += parsedData;
  })
  appDisplay.innerHTML = parsedDataStr;
}

addNoteBtn.addEventListener("click", () => {
    console.log("event fired")
    emptyNotes();
    displayNoteForm();
})

let note5 = new NoteCard("this is title", "testing this", [1])
let note2 = new NoteCard("this is title", "testing this", [1])
let note3 = new NoteCard("this is title", "testing this", [1])
let note4 = new NoteCard("this is title", "testing this", [1])
addNote("Testing Note Obj", "This is testing the function out", [1, 4, 6])
allNotesArr.push(note5)
allNotesArr.push(note2)
allNotesArr.push(note3)
allNotesArr.push(note4)
console.log(allNotesArr);

renderNotes(allNotesArr);