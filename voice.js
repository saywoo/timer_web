window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
let st = 0; let en = 0;
var final_res;

let str = "살찐 수댕이";
let str_cnt = str.length; // 공백 포함 글자 수

// true면 음절을 연속적으로 인식하나 false면 한 음절만 기록함
recognition.interimResults = true;
// 값이 없으면 HTML의 <html lang="en">을 참고합니다. ko-KR, en-US
recognition.lang = "ko-KR";
// true면 음성 인식이 안 끝나고 계속 됩니다.
recognition.continuous = false;
// 숫자가 작을수록 발음대로 적고, 크면 문장의 적합도에 따라 알맞은 단어로 대체합니다.
// maxAlternatives가 크면 이상한 단어도 문장에 적합하게 알아서 수정합니다.
recognition.maxAlternatives = 100000;

let p = document.createElement("p");
p.classList.add("para");

let words = document.querySelector(".words");
words.appendChild(p);

let speechToText = "";
let interimTranscript = "";
recognition.addEventListener("result", (e) => {
    document.querySelector(".para").innerHTML = e.results[0][0].transcript;
    
    interimTranscript = "";
    for (let i = e.resultIndex, len = e.results.length; i < len; i++) {
        let transcript = e.results[i][0].transcript;
        console.log(transcript);
        if (e.results[i].isFinal) {
            speechToText += transcript;
        } else {
            interimTranscript += transcript;
        }
    }
    document.querySelector(".para").innerHTML = speechToText + interimTranscript;

});

function cal(res) {
    final_res = parseInt(60000 / (res / str_cnt)) + 30;
    console.log(final_res);
    document.getElementById('time_results').innerText = time_for_speech(final_res);
}

// 음성인식이 끝나면 자동으로 재시작합니다.
recognition.addEventListener("end", () => {
    $("#loader").toggle();

    if (document.querySelector(".para").innerHTML == "") {
        $("#loader").toggle();
        document.getElementById("loader").innerText = "마이크를 인식하지 못했어요. 새로고침 후 다시 시도해주세요.";
    }
    else {
        document.getElementById("result_card").style.visibility = "visible";
        console.log(document.querySelector(".para").innerHTML);
        let tmp = getDist(str, document.querySelector(".para").innerHTML);
        console.log(tmp);
        var temp = parseInt(tmp / str_cnt * 100);
        if (temp == 0) { temp = 100; tmp = 100000; }

        if (parseInt(str_cnt / tmp) >= 2) {
            document.getElementById("card_3_main").innerText = "발음이 부정확해요";
            document.getElementById("card_3_sub").innerText = "약 " + temp.toString() + "% 정도 정확히 발음했어요. 마이크가 문제가 있거나 말하는 소리가 작아서 부정확하게 결과가 나올 수 있어요."
        }
        else {
            document.getElementById("card_3_main").innerText = "발음이 정확해요";
            document.getElementById("card_3_sub").innerText = "약 " + temp.toString() + "% 정도 정확히 발음했어요. 발음이 정확한 편이에요."
        }

        if (final_res > 297) {
            document.getElementById("card_2_main").innerText = "말하기 속도가 빠른 편이에요.";
            document.getElementById("card_2_sub").innerText = "1분에 약" + final_res.toString() + "자 정도 말할수 있는 속도에요.";
        }
        else if (final_res < 243) {
            document.getElementById("card_2_main").innerText = "말하기 속도가 느린 편이에요.";
            document.getElementById("card_2_sub").innerText = "1분에 약" + final_res.toString() + "자 정도 말할수 있는 속도에요.";
        }
        else {
            document.getElementById("card_2_main").innerText = "말하기 속도가 적당해요.";
            document.getElementById("card_2_sub").innerText = "1분에 약" + final_res.toString() + "자 정도 말할수 있는 속도에요.";
        }
    }
    
});


recognition.addEventListener("start", () =>  {
    st = new Date();
    console.log("인식 시작");
    document.getElementById('end_button').style.visibility = 'block';
    $("#start_button").toggle();
    $("#end_button").toggle();
    $("#loader").toggle();
});
function endSpeech() {
    en = new Date();
    cal(en - st); 
    console.log("계산중");
    $("#start_button").toggle();
    $("#st_btn").toggle();
    document.getElementById('loader').innerText = "계산 중...";
};

// 음성 인식 시작
//recognition.start();