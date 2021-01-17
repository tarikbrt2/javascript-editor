function addFileNameHeader(id){
    let ul = document.getElementsByClassName("file-list")[0];
    let found = false;
    for(let i = 0; i < ul.children.length; i++){
        if(ul.children[i].id == id) {
            found = true;
            break;
        }
    }
    if(!found){
        let li = document.createElement("li");
        li.id = id;
        li.innerText = files[id].name;
        li.classList.add("file-name");
        ul.appendChild(li);
    }
}

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