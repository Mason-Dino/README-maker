var turndownService = new TurndownService()

let index = 1;

document.addEventListener('keydown', function(event) {
    if ((event.ctrlKey || event.metaKey) && event.key === 'e') {
        exportMD();
    }
});

function addBuiltItem() {
    let buildList = document.getElementById("built-list").innerHTML;
    index += 1;

    buildList += `
    <div class="built-list-child" id="built-child-${index}">
        <div class="left-build">
            <label for="built-name-${index}">Name:</label><br>
            <label for="built-url-${index}">URL:</label>
        </div>
        <div class="middle-build">
            <input type="text" id="built-name-${index}" onkeyup="updateBuilt(); valueUpdate(this.id);">
            <input type="text" id="built-url-${index}" onkeyup="updateBuilt(); valueUpdate(this.id);">
        </div>
        <div class="right-build">
            <svg onclick="deleteBuiltItem('built-child-${index}')" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
        </div>
    </div>
    `

    document.getElementById("built-list").innerHTML = buildList;
}

function deleteBuiltItem(id) {
    document.getElementById(id).remove();
    updateBuilt()
}

function updateBuilt() {
    let list = ``
    for (let i = 1; i <= index; i ++) {
        console.log(document.getElementById(`built-child-${i}`))
        if (document.getElementById(`built-child-${i}`) != undefined) {
            list += `<li><a target='_blank' href="${document.getElementById('built-url-' + String(i)).value}">${document.getElementById('built-name-' + String(i)).value}</a></li>`
        }
    }
    document.getElementById("built-list-out").innerHTML = list;
}

function hideBuildItems() {
    document.getElementById('built-list').style = 'display: none;'
    document.getElementById('hide').innerHTML = '<svg class="icon-add" onclick="unhideBuildItems()" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>';
}

function unhideBuildItems() {
    document.getElementById('built-list').style = 'display: block';
    document.getElementById('hide').innerHTML = '<svg class="icon-add" onclick="hideBuildItems()" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"/></svg>'
}

function textUpdate(input, output) {
    document.getElementById(output).innerHTML = document.getElementById(input).value;
}

function imgUpdate(input, output) {
    document.getElementById(output).src = document.getElementById(input).value;
}

function mdUpdate(input, output) {
    document.getElementById(output).innerHTML = marked.parse(document.getElementById(input).value);
}

function linkUpdate(input, output) {
    document.getElementById(output).href = document.getElementById(input).value;
}

function valueUpdate(input) {
    element = document.getElementById(input);
    element.setAttribute("value", element.value);
}

function exportMD() {
    html = document.getElementById('output-1').innerHTML;
    
    markdown = turndownService.turndown(html)
    console.log(markdown)

    projectURL = document.getElementById('proj-url').value
    cphrase = document.getElementById('catchphrase-out').innerText;
    logo = document.getElementById('logo-url').value

    topMarkdown = `
<br/>
<div align="center">
<a href="${projectURL}">
<img src="${logo}" alt="Logo" width="80" height="80">
</a>
<h3 align="center">ReadME Generator</h3>
<p align="center">
${cphrase}
<br/>
<br/>
<br/>
<a href="${projectURL}/issues/new?labels=bug&template=bug-report---.md">Report Bug</a> •
<a href="${projectURL}/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
</p>
</div>

`

    markdown = markdown.replaceAll('###', '##')

    markdown = topMarkdown + markdown;
    console.log(topMarkdown)

    window.electronAPI.saveFile(markdown).then(result => {
        if (!result.canceled) {
            console.log('File saved at:', result.filePath);
        } else {
            console.log('Save cancelled');
        }
    });
}