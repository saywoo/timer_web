/*
web sppech API를 이용한 음성 인식을 주로 구현해놓은 스크립트
*/

// 객체 생성
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// 사용할 임시 변수들
let st = 0; let en = 0;
var final_res = 0;
// 말하기 속도의 기준점을 저장해놓는 변수
const Low = 320; const High = 420;
// 마이크의 사용 유무
var flag = false;

let str = "적혀진 문장을 마이크를 통해 읽어주세요.";
let str_cnt = str.length; // 공백 포함 글자 수

// true면 음절을 연속적으로 인식하나 false면 한 음절만 기록함
recognition.interimResults = true;
// 값이 없으면 HTML의 <html lang="ko">을 참고함 (ko-KR, en-US)
recognition.lang = "ko-KR";
// true면 음성 인식이 안 끝나고 계속 작동함
recognition.continuous = false;
// 숫자가 작을수록 발음대로 적고, 크면 문장의 적합도에 따라 알맞은 단어로 대체함
// maxAlternatives가 크면 이상한 단어도 문장에 적합하게 알아서 수정함
recognition.maxAlternatives = 100000;

// 적당한 위치에 인식한 텍스트를 저장하기 위해 새 객체를 만듬
let p = document.createElement("p");
p.classList.add("para");
let words = document.querySelector(".words");
words.appendChild(p);

// 음성인식을 처리해서 문자열로 저장하는 함수
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

// 분당 몇 글자를 읽는 지 계산한 후 예상시간이 얼마나 걸리는지 함수를 통해 가져와서 출력하는 함수
function cal(res) {
    final_res = parseInt(60000 / (res / str_cnt));
    console.log(final_res);
    document.getElementById('time_results').innerText = time_for_speech(final_res);
}

// 마이크를 사용하지 못하는 환경일때 작동하는 함수
recognition.addEventListener("error", () => {
    $("#loader").toggle();
    document.getElementById("result_card").style.visibility = "hidden";
    st = new Date();
    console.log("인식 시작");
    $("#start_button").toggle();
    $("#end_button").toggle();
});

// 마이크 인식이 끝날때 동시에 작동되는 핢수
recognition.addEventListener("end", () => {

    if (flag == true) {
        document.getElementById("result_card").style.visibility = "visible";
    }

    if (document.querySelector(".para").innerHTML == "") {
        //$("#loader").toggle();
        //document.getElementById("loader").innerText = "마이크를 인식하지 못했어요. 새로고침 후 다시 시도해주세요.";
        console.log("마이크 입력 안됨");
        if (final_res > High) {
            document.getElementById("card_2_main").innerText = "말하기 속도가 빠른 편이에요.";
            document.getElementById("card_2_sub").innerText = "1분에 약 " + final_res.toString() + "자 정도 말할수 있는 속도에요.";
        }
        else if (final_res < Low) {
            document.getElementById("card_2_main").innerText = "말하기 속도가 느린 편이에요.";
            document.getElementById("card_2_sub").innerText = "1분에 약 " + final_res.toString() + "자 정도 말할수 있는 속도에요.";
        }
        else {
            document.getElementById("card_2_main").innerText = "말하기 속도가 적당해요.";
            document.getElementById("card_2_sub").innerText = "1분에 약 " + final_res.toString() + "자 정도 말할수 있는 속도에요.";
        }
        document.getElementById("card_3_main").innerText = "발음을 제대로 인식하지 못했어요";
        document.getElementById("card_3_sub").innerText = "새로고침 후 다시 시도해주세요";

    }
    else {
        console.log(document.querySelector(".para").innerHTML);
        let tmp = getDist(str, document.querySelector(".para").innerHTML);
        console.log(tmp);
        var temp = parseInt((str_cnt - tmp) / str_cnt * 100);
        if (0 == tmp) { temp = 100; tmp = 100000; }

        if (temp <= 50) {
            document.getElementById("card_3_main").innerText = "발음이 부정확해요";
            document.getElementById("card_3_sub").innerText = "약 " + temp.toString() + "% 정도 정확히 발음했어요. 마이크가 문제가 있거나 말하는 소리가 작아서 부정확하게 결과가 나올 수 있어요."
            document.getElementById("card_3_sub2").innerText = "인식한 발음은 " + document.querySelector(".para").innerHTML + " (이)에요.";
        }
        else {
            document.getElementById("card_3_main").innerText = "발음이 정확해요";
            document.getElementById("card_3_sub").innerText = "약 " + temp.toString() + "% 정도 정확히 발음했어요. 발음이 정확한 편이에요";
            document.getElementById("card_3_sub2").innerText = "인식한 발음은 " + document.querySelector(".para").innerHTML + " (이)에요.";

        }

        if (final_res > High) {
            document.getElementById("card_2_main").innerText = "말하기 속도가 빠른 편이에요.";
            document.getElementById("card_2_sub").innerText = "1분에 약 " + final_res.toString() + "자 정도 말할수 있는 속도에요.";
        }
        else if (final_res < Low) {
            document.getElementById("card_2_main").innerText = "말하기 속도가 느린 편이에요.";
            document.getElementById("card_2_sub").innerText = "1분에 약 " + final_res.toString() + "자 정도 말할수 있는 속도에요.";
        }
        else {
            document.getElementById("card_2_main").innerText = "말하기 속도가 적당해요.";
            document.getElementById("card_2_sub").innerText = "1분에 약 " + final_res.toString() + "자 정도 말할수 있는 속도에요.";
        }
    }   
});

// 인식이 시작할때 작동하는 함수
recognition.addEventListener("start", () =>  {
    flag = true;
    st = new Date();
    console.log("인식 시작");
    $("#start_button").toggle();
    $("#end_button").toggle();
    $("#loader").toggle();
});

// 종료 버튼을 눌렀을때 작동하는 함수
function endSpeech() {
    en = new Date();
    cal(en - st); 
    console.log("계산중");
    $("#start_button").toggle();
    $("#st_btn").toggle();
    document.getElementById('loader').innerText = "계산 중...";
    

    if (flag == false) {
        document.getElementById("result_card").style.visibility = "visible";

        if (final_res > High) {
            document.getElementById("card_2_main").innerText = "말하기 속도가 빠른 편이에요.";
            document.getElementById("card_2_sub").innerText = "1분에 약 " + final_res.toString() + "자 정도 말할수 있는 속도에요.";
        }
        else if (final_res < Low) {
            document.getElementById("card_2_main").innerText = "말하기 속도가 느린 편이에요.";
            document.getElementById("card_2_sub").innerText = "1분에 약 " + final_res.toString() + "자 정도 말할수 있는 속도에요.";
        }
        else {
            document.getElementById("card_2_main").innerText = "말하기 속도가 적당해요.";
            document.getElementById("card_2_sub").innerText = "1분에 약 " + final_res.toString() + "자 정도 말할수 있는 속도에요.";
        }

        document.getElementById("card_3_main").innerText = "마이크 사용을 거부하거나 마이크가 안되는 거 같아요.";
        document.getElementById("card_3_sub").innerText = "새로고침 후 다시 시도하거나 마이크 사용을 승인해주세요.";

        $("#loader").toggle();
    }

    
};

// 음성 인식 시작
//recognition.start();