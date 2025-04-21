let index = 1;

function addBuiltItem() {
    let buildList = document.getElementById("built-list").innerHTML;
    index += 1;

    buildList += `
    <div class="built-list-child" id="built-child-${index}">
        <label for="built-name-${index}">Name:</label><input type="text" id="built-name-${index}">
        <br>
        <label for="built-url-${index}">URL:</label><input type="text" id="built-url-${index}">
        <br>
        <svg onclick="deleteBuiltItem('built-child-${index}')" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
    </div>
    `

    document.getElementById("built-list").innerHTML = buildList;
}

function deleteBuiltItem(id) {
    document.getElementById(id).remove()
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