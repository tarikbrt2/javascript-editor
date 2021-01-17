const runButton = document.getElementById("run");
const saveButton = document.getElementById("save");
const consoleLogList = document.querySelector('.editor-console-body');
const fileName = document.getElementById("editor-file-name");
const addFile = document.getElementById("editor-add-file");
const filesDiv = document.getElementById("files");
let filesQuery = document.querySelectorAll(".editor-file");
let headerFilesQuery = document.querySelectorAll(".file-name");
const fileList = document.getElementsByClassName("editor-file");
const headerFileList = document.querySelector(".file-list");

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

//dragging
const dragArea = document.querySelector(".file-list");
new Sortable(dragArea, {
    animation: 350
});

// Event 
filesDiv.addEventListener("DOMNodeInserted", () => {
    filesQuery =  document.querySelectorAll(".editor-file");
    filesQuery.forEach((elem, idx) => {
        elem.onclick = function () {
            files[browsingIndex].code = editor.getValue();
            //console.log(files[browsingIndex].code);
            addFileNameHeader(browsingIndex);
            browsingIndex = idx;
            editor.setValue(files[idx].code);
            fileName.value = files[idx].name;
            consoleMessages = [];

        };
    });
})

headerFileList.addEventListener("DOMNodeInserted", () => {
    headerFilesQuery =  document.querySelectorAll(".file-name");
    headerFilesQuery.forEach((elem) => {
        elem.onclick = function () {
            files[browsingIndex].code = editor.getValue();
            browsingIndex = elem.id;
            editor.setValue(files[browsingIndex].code);
            fileName.value = files[browsingIndex].name;
            consoleMessages = [];

        };
    });
})

// Kada se mijenja kod u editoru
editor.session.on("change", () => {
    files[browsingIndex].code = editor.getValue();
}) 

// dodavanje novog fajla prilikom ucitavanja DOM-a
addFileFunction("untitled.js");
addFileNameHeader(browsingIndex);


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

fileName.addEventListener("change", () => {
    let file_names = document.querySelectorAll(".editor-file");
    let file_name_p = file_names[browsingIndex].firstElementChild;
    file_name_p.innerText = fileName.value;
    files[browsingIndex].name = fileName.value;
    let ul = document.getElementsByClassName("file-list")[0];
    const files_name_header = ul.children;
    for(let i = 0; i < files_name_header.length; i++){
        if(files_name_header[i].id == browsingIndex){
            files_name_header[i].innerText = fileName.value;
        }
    }
})