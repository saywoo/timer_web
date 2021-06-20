function char_count() {
    document.getElementById('char_count_results').innerText = document.getElementById('textbox').value.length;
}
function resize(obj) {
    obj.style.height = '1px';
    obj.style.height = (12 + obj.scrollHeight) + 'px';
}