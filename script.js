const defaultValues = {};


function cacheDefaults(){
document.querySelectorAll('[data-key]').forEach(el => {
defaultValues[el.dataset.key] = el.textContent.trim();
});
}


function applyValues(map){
document.querySelectorAll('[data-key]').forEach(el => {
const key = el.dataset.key;
if(map.hasOwnProperty(key)) el.textContent = map[key] || `[${key}]`;
});
}


function readForm(){
const inputs = document.querySelectorAll('input[name]');
const map = {};
inputs.forEach(i => { map[i.name] = i.value.trim(); });
return map;
}


function generateCode(){
const preview = document.getElementById('preview');
const clone = preview.cloneNode(true);
clone.querySelectorAll('[data-key]').forEach(el => el.removeAttribute('data-key'));
document.getElementById('output').value = clone.innerHTML.trim();
}


window.addEventListener('DOMContentLoaded', () => {
cacheDefaults();


document.getElementById('update').addEventListener('click', () => {
const map = readForm();
applyValues(map);
generateCode();
});
});