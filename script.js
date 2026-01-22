const fullAppContainer = document.getElementById("app-container");
const appDisplayContainer = document.getElementById("app-display");
const addNoteBtn = document.getElementById("add-note");

class Note {
    constructor(title, noteDes) {
        this.title = title;
        this.noteDescription = noteDes;
        this.createdAt = Date.now();
        this.id = Date.now() + generateUniqueId(19);
    }
}

const state = {
    view: "list",
    notes: {},
    activeNoteId: null,
}

function render(state) {
    if (state.view === "list") {
        renderList(state.notes);
    }
    if (state.view === "create") {
        renderCreate()
    }
    if (state.view === "edit") {
        renderEdit(state.activeNoteId)
    }
}

function renderList(notes) {
    let convertedNotes = ``;

    let notesArr = Object.values(notes)

    notesArr.forEach(({title, noteDescription, createdAt, id}) => {
        convertedNotes += 
        `
        <div class="notes">
            <h2 class="note-title">${title}</h2>
            <p class="note-description">${noteDescription}</p>
            <div class="time-created">${createdAt}</div>
            <button class="edit-btn" data-note-id="${id}">EDIT</button>
        </div>
        `
    });

    appDisplayContainer.innerHTML = convertedNotes;
}

function renderEdit(noteId) {
    let note = state.notes[noteId]
    let {title, noteDescription} = note;

    let currentNoteForm = 
    `
    <div class="form">
        <label for="title">Title:</label>
        <input name="title" value="${title}">
        <textarea class="description">${noteDescription}</textarea>
        <button class="back-btn">Back</button>
        <button type="submit" id="save-note-btn">Save Note</button>
    </div>
    `

    appDisplayContainer.innerHTML = currentNoteForm;
}

function renderCreate() {
    let newNotesForm = 
    `
    <div class="form">
        <label for="title">Title:</label>
        <input name="title">
        <textarea class="description"></textarea>
        <button class="back-btn">Back</button>
        <button type="submit" id="save-note-btn">Save Note</button>
    </div>
    `;

    appDisplayContainer.innerHTML = newNotesForm;
}

function saveNote() {
    let title = document.querySelector('input[name="title"]');
    title = title.value;
    let description = document.querySelector('textarea[class="description"]');
    description = description.value;

    if (!title || !description) {return};

    if (state.view === "edit") {
        let note = state.notes[state.activeNoteId];
        note.title = title;
        note.noteDescription = description;
        return
    }

    let note = new Note(title, description);
    state.notes[note.id] = note;
    
}

function generateUniqueId(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  let password = "";
  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
}

addNoteBtn.addEventListener("click", () => {
    state.view = "create"
    render(state)
});

document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "save-note-btn") {
        saveNote();
        state.view = "list";
        render(state);
    }

    

    if (e.target.classList.contains("edit-btn")) {

        let noteId = e.target.dataset.noteId;
        state.activeNoteId = noteId;
        
        state.view = "edit"
        render(state);
    }
    
    if (e.target.classList.contains("back-btn")) {
        state.view = "list";
        render(state);
    }
})