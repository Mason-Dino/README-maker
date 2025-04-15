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

const projectURL = document.getElementById("proj-url");
const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle")
const productURL = document.getElementById('product-url');
/*
projectURL.addEventListener('input', () => {
    document.getElementById("issue-out").href = `${projectURL.value}/issues/new?labels=bug&template=bug-report---.md`;
    document.getElementById("new-out").href = `${projectURL.value}/issues/new?labels=bug&template=bug-report---.md`;
});

title.addEventListener('input', () => {
    document.getElementById("title-out").innerText = title.value;
});

subtitle.addEventListener('input', () => {
    document.getElementById("catchphrase-out").innerHTML = subtitle.value;
});

productURL.addEventListener('input', () => {
    console.log("ttest")
    //document.getElementById("about-img-out").src = "https://cdn.discordapp.com/attachments/1341894044850327552/1361420865690144920/Potting_Event_SAB_2.png?ex=67feb17c&is=67fd5ffc&hm=72c9b16b53285a2afdcbcfc55bbe18b8749b9c13699d6f4e0284d0964f2fc4fb&";
});
*/
function textUpdate(input, output) {
    document.getElementById(output).innerText = document.getElementById(input).value;
}