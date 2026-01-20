const fullAppContainer = document.getElementById("app-container");
const appDisplayContainer = document.getElementById("app-display");

class Note {
    constructor(title, noteDes) {
        this.title = title;
        this.noteDescription = noteDes;
        this.createdAt = Date.now();
    }
}

const state = {
    view: "list",
    notes: [],
    activeNoteId: null,
}

function render(state) {
    if (state.view === "list") {
        renderList(state.notes);
    }
    if (state.view === "create") {
        renderCreateNote()
    }
}

function renderList(notes) {
    let convertedNotes = ``;

    notes.forEach(({title, noteDescription, createdAt}) => {
        convertedNotes += 
        `
        <div class="notes">
            <h2 class="note-title">${title}</h2>
            <p class="note-description">${noteDescription}</p>
            <div class="time-created">${createdAt}</div>
        </div>
        `
    });

    appDisplayContainer.innerHTML = convertedNotes;
}

function renderCreateNote() {
    let newNotesForm = 
    `
    <div class="form">
        <label for="title">Title:</label>
        <input name="title">
        <label for="description">Description:</label>
        <input name="description">
        <button type="submit">Save Note</button>
    </div>
    `;

    appDisplayContainer.innerHTML = newNotesForm;
}

function saveNote() {
    const title = document.querySelector('input[name="title"]').value;
    const description = document.querySelector('input[name="description"]').value;

    if (!title || !description) {return};

    let note = new Note(title, description);
    state.notes.push(note);
}


let note1 = new Note("Title", "This is description");
let note2 = new Note("Title", "This is description");
let note3 = new Note("Title", "This is description");

state.notes.push(note1);
state.notes.push(note2);
state.notes.push(note3);

state.view = "create"
render(state)