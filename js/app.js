const runButton = document.getElementById("run");
const saveButton = document.getElementById("save");
const consoleLogList = document.querySelector('.editor-console-body');
const fileName = document.getElementById("editor-file-name");

const defaultCode = "console.log(\"Hello world\")";
let consoleMessages = [];

var editor = ace.edit("editor-textarea");
editor.setTheme("ace/theme/cobalt");
editor.session.setMode("ace/mode/javascript");
editor.setOptions({
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true
})
editor.setValue(defaultCode);

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

function printToConsole() {
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