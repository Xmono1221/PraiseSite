// =====================================
// 要素取得
// =====================================

const resultImage = document.getElementById("resultImage");
const message = document.getElementById("message");

const backButton = document.getElementById("backButton");
const settingButton = document.getElementById("settingButton");

// =====================================
// 初期表示
// =====================================

window.onload = () => {

    //----------------------------------
    // 判定結果取得
    //----------------------------------
    const result =
        localStorage.getItem("judgeResult") === "true";


    //----------------------------------
    // 一致
    //----------------------------------
    if(result){
        const image =
            localStorage.getItem("matchImage");


        if(image){
            resultImage.src = image;
        }

        message.textContent =
            "えらいね！";

        message.classList.remove("no-match");
        message.classList.add("match");
    }

    //----------------------------------
    // 不一致
    //----------------------------------
    else{
        const image =
            localStorage.getItem("noMatchImage");

        if(image){
            resultImage.src = image;
        }

        message.textContent =
            `そうですか...`;

        message.classList.remove("match");
        message.classList.add("no-match");
    }

};

// =====================================
// ボタン
// =====================================

backButton.addEventListener("click",()=>{
    location.href="index.html";
});

settingButton.addEventListener("click",()=>{
    location.href="settings.html";
});