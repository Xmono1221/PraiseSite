// =====================================
// 要素取得
// =====================================

const textArea = document.getElementById("text");
const judgeButton = document.getElementById("judgeButton");
const indexImage = document.getElementById("indexImage");

// =====================================
// 初期表示
// =====================================
window.onload = () => {
    // 入力画面画像
    const image = localStorage.getItem("indexImage");

    if (image) {
        indexImage.src = image;
    }
    // ボタン初期状態
    judgeButton.disabled = true;
};

// =====================================
// 入力チェック
// =====================================
textArea.addEventListener("input", () => {
    judgeButton.disabled = textArea.value.trim() === "";
});

// =====================================
// 判定
// =====================================
judgeButton.addEventListener("click", () => {
    const text = textArea.value.trim();

    // 設定した判定文字
    const keyword = localStorage.getItem("keyword");
    // 未設定なら設定画面へ
    if (!keyword || keyword.trim() === "") {
        alert("判定文字が設定されていません。\n設定画面から登録してください。");
        location.href = "settings.html";
        return;
    }

    //------------------------------------
    // 英字のみ大文字小文字無視
    //------------------------------------
    const regex = new RegExp(escapeRegExp(keyword), "i");
    const result = regex.test(text);

    //------------------------------------
    // 保存
    //------------------------------------
    localStorage.setItem("judgeResult", result);
    localStorage.setItem("inputText", text);

    //------------------------------------
    // 結果画面へ
    //------------------------------------
    location.href = "result.html";
});


// =====================================
// 正規表現エスケープ
//
// ユーザーは普通の文字を入力するだけ。
// . や * が入っても文字として扱う。
// =====================================
function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}