document.getElementById("saveButton").addEventListener("click", () => {
    const noteName = document.getElementById("nameInput").value.trim();
    const noteContent = document.getElementById("textInput").value.trim()

    if (!noteContent || !noteName) {
        alert("Please enter required name and note.");
        return;
    }

    localStorage.setItem(noteName, noteContent);

    const notesTable = document.getElementById("notes");
    const row = document.createElement("tr");

    row.innerHTML = `<td>${noteName}</td><td>${noteContent}</td>`;
    notesTable.appendChild(row);

    document.getElementById("nameInput").value = "";
    document.getElementById("textInput").value = "";
    
})  