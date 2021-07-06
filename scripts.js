function time_for_speech(char_cnt) {
    const char_per_second = 4.5;
    var sec = parseInt(char_cnt / char_per_second);
    var min = parseInt(sec / 60);
    
    if (min.toString() == "0") {
        return sec.toString() + "초";
    }
    else {
        var tmp_sec = sec - min * 60;
        return min.toString() + "분 " + tmp_sec.toString() + "초";
    }
}

function byte_cnt(chr) {
    str_byte_len = 0;
    str_byte_len = (function(s, b, i, c) {
        for (b = i = 0; c = s.charCodeAt(i++); b += c>>11?3:c>>7?2:1);
        return b
    })(chr);
    return str_byte_len.toString() + "바이트";
}

function char_count() {
    var char_cnt = document.getElementById('textbox').value.length;
    document.getElementById('time_results').innerText = time_for_speech(char_cnt);
    document.getElementById('byte_count_results').innerText = byte_cnt(document.getElementById('textbox').value);
    document.getElementById("char_count_results").innerText = document.getElementById('textbox').value.replace(/(\s*)/g, "").length + "자";
}
function resize(obj) {
    obj.style.height = '1px';
    obj.style.height = (12 + obj.scrollHeight) + 'px';
}