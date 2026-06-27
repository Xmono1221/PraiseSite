// =====================================
// 設定画面
// =====================================

// 推奨サイズ
const MAX_IMAGE_SIZE = 500 * 1024;

// ===============================
// localStorageキー
// ==============================
const STORAGE_KEYS = {
    keyword: "keyword",
    indexImage: "indexImage",
    matchImage: "matchImage",
    noMatchImage: "noMatchImage",
    judgeResult: "judgeResult",
    inputText: "inputText"
};

//------------------------------
// 要素
//------------------------------

const keyword = document.getElementById("keyword");

const indexImage = document.getElementById("indexImage");
const matchImage = document.getElementById("matchImage");
const noMatchImage = document.getElementById("noMatchImage");

const indexPreview = document.getElementById("indexPreview");
const matchPreview = document.getElementById("matchPreview");
const noMatchPreview = document.getElementById("noMatchPreview");

const saveButton = document.getElementById("saveButton");
const clearButton = document.getElementById("clearButton");


//======================================
// 初期表示
//======================================

window.onload = () => {
    //----------------------------------
    // 判定文字
    //----------------------------------
    keyword.value = localStorage.getItem("keyword") ?? "";

    //----------------------------------
    // 画像
    //----------------------------------
    loadPreview("indexImage", indexPreview);
    loadPreview("matchImage", matchPreview);
    loadPreview("noMatchImage", noMatchPreview);

};

//======================================
// プレビュー表示
//======================================
function loadPreview(key, imageControl){
    const image = localStorage.getItem(key);
    if(image){
        imageControl.src = image;
    }

}

//======================================
// ファイル選択
//======================================
indexImage.addEventListener("change",()=>{
    preview(indexImage,indexPreview);
});

matchImage.addEventListener("change",()=>{
    preview(matchImage,matchPreview);
});

noMatchImage.addEventListener("change",()=>{
    preview(noMatchImage,noMatchPreview);
});

//======================================
// プレビュー
//======================================

function preview(fileControl,image){
    const file = fileControl.files[0];
    if(!file){
        return;
    }

    //----------------------------------
    // サイズチェック
    //----------------------------------
    if(file.size > MAX_IMAGE_SIZE){
        alert(
            "画像サイズが500KBを超えています。\n" +
            "保存はできますが、容量不足になる可能性があります。"
        );
    }

    //----------------------------------
    // プレビュー
    //----------------------------------
    const reader = new FileReader();
    reader.onload = e=>{
        image.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

//======================================
// 保存
//======================================

saveButton.addEventListener("click",async()=>{

    if(keyword.value.trim()===""){
        alert("判定文字を入力してください。");
        keyword.focus();
        return;
    }

    try{
        localStorage.setItem(
            "keyword",
            keyword.value.trim()
        );

        await saveImage(indexImage,"indexImage");

        await saveImage(matchImage,"matchImage");

        await saveImage(noMatchImage,"noMatchImage");

        alert("保存しました！");
    location.href='index.html'
    }
    catch(error){

        if(error.name==="QuotaExceededError"){
            alert(
                "保存容量を超えました。\n\n" +
                "画像サイズを小さくしてください。"
            );

        }
        else{
            console.error(error);
            alert("保存中にエラーが発生しました。");
        }
    }
});

//======================================
// Base64保存
//======================================

function saveImage(fileControl,key){

    return new Promise((resolve,reject)=>{
        const file = fileControl.files[0];

        if(!file){
            resolve();
            return;
        }
        const reader = new FileReader();

        reader.onload = ()=>{
            try{
                localStorage.setItem(
                    key,
                    reader.result
                );
                resolve();
            }
            catch(error){
                reject(error);
            }
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}


//======================================
// 設定クリア
//======================================

clearButton.addEventListener("click", () => {
    if (!confirm("設定を初期化しますか？")) {
        return;
    }
    
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));

    alert("設定を初期化しました。");
    location.reload();
});