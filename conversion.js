
let str;// 配列の中身を文字列化したもの
let ram;
let flg;/*
0 「平文」を文字コード化すると、「文字コード」になったね
1 「乱数【n】(共通鍵)」を各文字コードに足すと、「足し算した結果」になって暗号文の完成！
2 これを文字に戻そうとすると、「元の文字とはちがうなにか」になって、なにを送ったのか分からなくなったね！
  正しく復号するには「足し算した結果」と「乱数【n】(共通鍵)」が必要だよ
3 「足し算した結果」と「乱数【n】(共通鍵)」を引くと「文字コード」になったね
4 各文字コードを文字に戻すと「最初に入力した文字列」になるよ！
*/
let outtext;//outtextエリアに表示する文字列
let value;
let result;
const btn = document.getElementById("btn_encode");



// 文字が入力されてない時は両暗号化ボタンを非活性化
let sendSub = document.querySelector("#btn_encode");
sendSub.disabled = true;

// 文字が入力されたら暗号化ボタンを活性化する。
// "input"が"change"なら入力が完了してフォーカスが外れたときに入る
gettext.addEventListener("input",function(){
    flg = 0;
    btn.value = "文字コード化";
    outtext = "";
    sendSub.disabled = false;
    // テキストエリア内の文字が0になったのなら
    if(this.value.length == 0){
        sendSub.disabled = true;
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
    flg = 0;
    outtext = "";
    btn.value = "文字コード化";
    var textForm = document.getElementById("gettext");
    textForm.value = '';
    var textForm = document.getElementById("outtext");
    textForm.value = '';
    // 再度暗号化ボタンを非活性化
    sendSub.disabled = true;
}



function conversion(){
    if(flg == 1){
        // 1 ～ 10の整数で乱数生成
        ram = Math.floor(Math.random() * 10) + 1;
        for(i = 0;i<result.length;i++){
            result[i] = result[i] + ram;
            str = result.join(' ');
        }
        outtext += "乱数（共通鍵）「 " + ram + " 」を各文字コードに足すと、「 " + str + " 」になります\n";
        document.getElementById("outtext").value = outtext;
        flg = 2;
        btn.value = "復号？";
    }else if(flg == 2){
        let false_character;
        let false_document;
        for(i = 0;i<result.length;i++){
            false_character[i] = String.fromCharCode(result[i]);
            false_document = result.join('');
        }
        outtext += "これを文字に戻そうとすると、「 " + false_document + " 」になり、なにを送ったのか分からなくなりました。\n正しく復号するには暗号文「 " + str + " 」と乱数（共通鍵）「 " + ram + " 」が必要です";
        flg = 3;
        btn.value = "復号";
    }else if(flg == 3){
        flg = 4;
        btn.value = "文字化";
    }else if(flg == 4){
        sendSub.disabled = true;
    }else{
        value = document.getElementById("gettext").value;
        result = value.split('');
        for(i = 0;i<result.length;i++){
            result[i] = result[i].charCodeAt();
            result[i] = parseInt(result[i], 10);
            str = result.join(' ');
        }
        flg = 1;
        outtext += "「 " + value + " 」を文字コード化すると「 " + str + " 」になります\n";
        document.getElementById("outtext").value = outtext
        btn.value = "暗号化";
    }
}
