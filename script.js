const fullAppContainer = document.getElementById("app-container");
const appDisplayContainer = document.getElementById("app-display");
const addNoteBtn = document.getElementById("add-note");

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
        renderCreate()
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
            <button class="edit-btn">EDIT</button>
        </div>
        `
    });

    appDisplayContainer.innerHTML = convertedNotes;
}

function renderCreate() {
    let newNotesForm = 
    `
    <div class="form">
        <label for="title">Title:</label>
        <input name="title">
        <label for="description">Description:</label>
        <input name="description">
        <button type="submit" id="save-note-btn">Save Note</button>
    </div>
    `;

    appDisplayContainer.innerHTML = newNotesForm;
}

function saveNote() {
    let title = document.querySelector('input[name="title"]');
    console.log("This is log", title)
    title = title.value;
    let description = document.querySelector('input[name="description"]');
    description = description.value;

    if (!title || !description) {return};

    let note = new Note(title, description);
    state.notes.push(note);
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
        console.log(state.view)
    }
})  