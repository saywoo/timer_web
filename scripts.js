/*
잡다한 함수들을 저장해놓은 스크립트
*/

// 분당 몇 글자를 읽는다는 결과를 통해 예상시간을 계산해서 return시키는 함수
function time_for_speech(res) {
    var char_cnt = document.getElementById('textbox').value.replace(/(\s*)/g, "").length;
    var char_per_second = res / 60;
    var sec = parseInt(char_cnt / char_per_second);
    var min = parseInt(sec / 60);
    
    if (min.toString() == "0") {
        return "약 " + sec.toString() + "초";
    }
    else {
        var tmp_sec = sec - min * 60;
        return "약 " + min.toString() + "분 " + tmp_sec.toString() + "초";
    }
}

var btn_flag = false;
function clear() {
    if (btn_flag == false) {
        $('#end_button').toggle();
        btn_flag = true;
    }
}

// 스크립트의 바이트 수를 비트 연산을 통해 세주는 함수
function byte_cnt(chr) {
    str_byte_len = 0;
    str_byte_len = (function(s, b, i, c) {
        for (b = i = 0; c = s.charCodeAt(i++); b += c>>11?3:c>>7?2:1);
        return b
    })(chr);
    return str_byte_len.toString() + "바이트";
}

// 스크립트의 글자 수를 세서 출력해주는 함수
function char_count() {
    document.getElementById('byte_count_results').innerText = byte_cnt(document.getElementById('textbox').value);
    document.getElementById("char_count_results").innerText = document.getElementById('textbox').value.replace(/(\s*)/g, "").length + "자";
}

// 스크립트 입력 창을 유동적으로 만들어주는 함수
function resize(obj) {
    obj.style.height = '1px';
    obj.style.height = (30 + obj.scrollHeight) + 'px';
}