const html_code = document.getElementById('htmlCompiler');
const css_code = document.getElementById('cssCompiler');
const js_code = document.getElementById('jsCompiler');
const result = document.getElementById('result').contentWindow;
const runButton = document.getElementById('runButton');
const clearButton = document.getElementById('clearButton');
const saveButton = document.getElementById('saveButton')
const arrayOfFiles = [];
const buttons = [];

let valueNumber = 1;
localStorage.setItem('valueNumber', valueNumber);

runButton.onclick = () => run();
clearButton.onclick = () => clear();
saveButton.onclick = () =>  saveDataToFile(localStorage.css_code, localStorage.html_code, localStorage.js_code);


function run(){
    clearIFrame();
    setLocalStorage();
    showToIFrame();
}

function showToIFrame(){
    result.document.writeln(`<style>${localStorage.css_code}</style>`+localStorage.html_code);
    try {
        result.eval(localStorage.js_code);
    } catch (error) {
        
    }
}


function clear(){
    clearIFrame();
    removeLocalStorage();
    result.document.clear();
}

function showDataToFile(value){
    clearIFrame();
    removeLocalStorage();
    var data = localStorage.getItem(value);
    var temp = [];
    temp = data.split(',');
    try {
        localStorage.setItem('html_code', temp[0]);
        localStorage.setItem('css_code', temp[1]);
        localStorage.setItem('js_code', temp[2]);
        showToIFrame();

    } catch (error) {
        
    }
}

function saveDataToFile(css_code, html_code, js_code){
    var data = [];
    data.push(html_code);
    data.push(css_code);
    data.push(js_code);
    let tempValue = parseInt(localStorage.getItem('valueNumber')) +1;
    localStorage.setItem('valueNumber', tempValue);
    localStorage.setItem(tempValue+".value", data);
    arrayOfFiles.push(tempValue+".value");
    var buttonName = tempValue+".value";
    document.getElementById('arrayOfFiles').innerHTML += `<button class="btn btn-outline-dark" id="${buttonName}">${tempValue+".value"}</button>`;
    document.getElementById(buttonName).onclick = () => {
        showDataToFile(buttonName);
    } 


    
}



function createButtonEvent(buttonName){
    let newButton = document.getElementById(buttonName);
    newButton.onclick = () => {
        showDataToFile(buttonName)
    }
}

function setLocalStorage(){
    localStorage.setItem('html_code', html_code.value);
    localStorage.setItem('css_code', css_code.value);
    localStorage.setItem('js_code', js_code.value);
}

function clearIFrame(){
    var html = "";
    result.document.open();
    result.document.write(html);
    result.document.close();
}

function removeLocalStorage(){
    localStorage.removeItem('html_code');
    localStorage.removeItem('css_code');
    localStorage.removeItem('js_code');
}


html_code.value = localStorage.html_code;
css_code.value = localStorage.css_code;
js_code.value = localStorage.js_code;