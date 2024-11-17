// Utility functions for localStorage
const saveNoteToStorage = (name, content) => localStorage.setItem(name, content);
const getAllNotesFromStorage = () => Object.keys(localStorage).map((key) => ({ name: key, content: localStorage.getItem(key) }));
const deleteNoteFromStorage = (name) => localStorage.removeItem(name);

// DOM Elements
const nameInput = document.getElementById("nameInput");
const textInput = document.getElementById("textInput");
const saveButton = document.getElementById("saveButton");
const loadButton = document.getElementById("loadButton");
const deleteButton = document.getElementById("deleteButton");
const notesTable = document.getElementById("notes");

// Function to render all notes in the table
const renderNotes = () => {
    notesTable.innerHTML = ""; // Clear current table content
    const notes = getAllNotesFromStorage();

    notes.forEach(({ name }) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <input type="radio" name="noteOption" class="noteList" value="${name}">
                ${name}
            </td>
        `;
        notesTable.appendChild(row);
    });
};

// Save note to localStorage and update the table
saveButton.addEventListener("click", () => {
    const noteName = nameInput.value.trim();
    const noteContent = textInput.value.trim();

    if (!noteContent || !noteName) {
        alert("Please enter both a name and note content.");
        return;
    }

    saveNoteToStorage(noteName, noteContent);
    renderNotes(); // Update table

    // Clear input fields and give feedback
    nameInput.value = "";
    textInput.value = "";
    alert("Note saved successfully!");
});

// Load the selected note into input fields
loadButton.addEventListener("click", () => {
    const selectedNote = document.querySelector("input[name='noteOption']:checked");

    if (!selectedNote) {
        alert("Please select a note to load.");
        return;
    }

    const noteName = selectedNote.value;
    const noteContent = localStorage.getItem(noteName);

    nameInput.value = noteName;
    textInput.value = noteContent;
});

// Delete the selected note
deleteButton.addEventListener("click", () => {
    const selectedNote = document.querySelector("input[name='noteOption']:checked");

    if (!selectedNote) {
        alert("Please select a note to delete.");
        return;
    }

    const noteName = selectedNote.value;
    deleteNoteFromStorage(noteName);
    renderNotes(); // Update table

    alert(`Note "${noteName}" deleted successfully.`);
});

// Render notes on page load
document.addEventListener("DOMContentLoaded", renderNotes);
