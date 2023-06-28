
let str;// 配列の中身を文字列化したもの
let ram;
let flag = 0;// +-判定

/*
暗号化をしていなければ復号ボタンを非活性化
false = 復号ボタンが活性化
true = 復号ボタンが非活性化
*/
let button = document.querySelector("#return");
button.disabled = true;

// 文字が入力されてない時は両暗号化ボタンを非活性化
let sendSub = document.querySelector("#sendSub");
sendSub.disabled = true;
let sendAdd = document.querySelector("#sendAdd");
sendAdd.disabled = true;

// 文字が入力されたら暗号化ボタンを活性化する。
// "input"が"change"なら入力が完了してフォーカスが外れたときに入る
gettext.addEventListener("input",function(){
    sendAdd.disabled = false;
    sendSub.disabled = false;
    // テキストエリア内の文字が0になったのなら
    if(this.value.length == 0){
        sendSub.disabled = true;
        sendAdd.disabled = true;
    }
    // リセットなしでgettext内を編集されたらouttextの値をリセット
    var textForm = document.getElementById("outtext");
    textForm.value = '';
});

// エンターキーを無効にする
document.onkeydown = function(e) {
    if (e.key === 'Enter') {
        return false;
    }
}

// テキストエリア全ての値をリセット
function clearText() {
    var textForm = document.getElementById("gettext");
    textForm.value = '';
    var textForm = document.getElementById("outtext");
    textForm.value = '';
    // 再度暗号化ボタンを非活性化
    sendSub.disabled = true;
    sendAdd.disabled = true;
}

