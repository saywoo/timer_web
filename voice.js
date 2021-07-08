window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
let st = 0; let en = 0;

let str = "너의 값진 말들로 희망을 노래하라";
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
    const final_res = parseInt(60000 / (res / str_cnt));
    console.log(final_res);
    document.getElementById('time_results').innerText = time_for_speech(final_res);
}

// 음성인식이 끝나면 자동으로 재시작합니다.
recognition.addEventListener("end", () => {
    $("#loader").toggle();
});


recognition.addEventListener("start", () =>  {
    st = new Date();
    console.log("sans");
    $("#start_button").toggle();
    $("#end_button").toggle();
    $("#loader").toggle();
});
function endSpeech() {
    en = new Date();
    cal(en - st); 
    console.log(en - st);
    $("#start_button").toggle();
    $("#st_btn").toggle();
    document.getElementById('loader').innerText = "계산 중...";
};

// 음성 인식 시작
//recognition.start();