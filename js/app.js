const runButton = document.getElementById("run");
const consoleLogList = document.querySelector('.editor-console-body');

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