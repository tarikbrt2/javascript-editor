const runButton = document.getElementById("run");
const saveButton = document.getElementById("save");
const consoleLogList = document.querySelector('.editor-console-body');
const fileName = document.getElementById("editor-file-name");
const addFile = document.getElementById("editor-add-file");
const filesDiv = document.getElementById("files");
let filesQuery = document.querySelectorAll(".editor-file");
const fileList = document.getElementsByClassName("editor-file");

const defaultCode = "console.log(\"Hello world\")";
let consoleMessages = [];
let files = [];
let browsingIndex = 0;

var editor = ace.edit("editor-textarea");
editor.setTheme("ace/theme/cobalt");
editor.session.setMode("ace/mode/javascript");
editor.setOptions({
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    fontSize: "16px",
})
editor.setValue(defaultCode);

// Event 
filesDiv.addEventListener("DOMNodeInserted", () => {
    filesQuery =  document.querySelectorAll(".editor-file");
    filesQuery.forEach((elem, idx) => {
        //console.log(elem);
        elem.onclick = function () {
            files[browsingIndex].code = editor.getValue();
            console.log(files[browsingIndex].code);
            browsingIndex = idx;
            editor.setValue(files[idx].code);
            fileName.value = files[idx].name;
        };
    });
})

// Kada se mijenja kod u editoru
editor.session.on("change", () => {
    files[browsingIndex].code = editor.getValue();
}) 

// dodavanje novog fajla prilikom ucitavanja DOM-a
addFileFunction("untitled.js");

saveButton.addEventListener("click", () => {
    let editor_code = editor.getValue();
    let a = document.createElement("a");
    let file = new Blob([editor_code], {type: "text/javascript"});
    a.href = URL.createObjectURL(file);
    a.download = fileName.value;
    a.click();
})

runButton.addEventListener("click", () => {
    const code = editor.getValue();
    try {
        new Function(code)();
    }
    catch(err) {
        console.error(err);
    }

    printToConsole();
});

addFile.addEventListener("click", () => {
    addFileFunction("untitled.js");
})

function printToConsole() {
    consoleLogList.innerHTML = "";
    consoleMessages.forEach(log => {
        const newLogItem = document.createElement('li');
        const newLogText = document.createElement('pre');

        newLogItem.style.listStyle = "none";

        newLogText.className = log.class;
        newLogText.textContent = `> ${log.message}`;

        newLogItem.appendChild(newLogText);

        consoleLogList.appendChild(newLogItem);
    })
    consoleMessages = [];
}

function addFileFunction(filename){
    let elem = document.createElement("div");
    elem.classList.add("editor-file");
    let p = document.createElement("p");
    files.push({
        code: defaultCode,
        name: filename
    });
    p.id = files.length - 1;
    p.innerText = filename;
    elem.appendChild(p);
    filesDiv.appendChild(elem);
    browsingIndex = p.id;
    editor.setValue(defaultCode);
}