/*jshint esversion: 6 */

//一つのボタンで動作させるものなのでグローバル変数が多くなっている。

//テキストを変化させたいボタン
const btn = document.getElementById("btn_encode");

// 配列の中身を文字列化した結果を保持
let str;
//共通鍵（乱数）
let ram;
//outtextエリアに表示する文字列
let outtext;
//最初に取得した文字列（平文）
let value;
//文字や文字コードを処理した結果を保持
let result;

//どのフェーズにいるのかを保持
let flg;
/*
0 文字コード化
1 暗号化
2 復号？と正しく暗号化するには
3 正しい文字コードに戻す・復号
4 文字化
*/


var textForm = document.getElementById("gettext");
// 文字が入力されてない時はテキストが変化するボタンを非活性化
if(textForm.value == ''){
    btn.disabled = true;
}


// gettxetエリアに文字が入力されたら実行される
gettext.addEventListener("input",function(){
    //リセット
    flg = 0;
    btn.value = "文字コード化";
    outtext = "";
    var textForm = document.getElementById("outtext");
    textForm.value = '';

    //テキストが変化するボタンを活性化する。
    btn.disabled = false;
    // テキストエリア内の文字が0になったのなら
    if(this.value.length == 0){
        //テキストが変化するボタンを非活性化する。
        btn.disabled = true;
    }
});

// エンターキーを無効にする
document.onkeydown = function(e) {
    if (e.key === 'Enter') {
        return false;
    }
}

//リセットボタン
function clearText() {
    //リセット
    flg = 0;
    outtext = "";
    btn.value = "文字コード化";
    // テキストエリア全ての値をリセット
    textForm = document.getElementById("gettext");
    textForm.value = '';
    textForm = document.getElementById("outtext");
    textForm.value = '';
    // テキストが変化するボタンを非活性化
    btn.disabled = true;
}


//テキストが変化するボタン
function conversion(){
    if(flg == 1){
        // 1 ～ 1000の整数で乱数生成
        ram = Math.floor(Math.random() * 1000) + 1;
        //各文字コードに乱数を足して結合し、表示する
        for(i = 0;i<result.length;i++){
            result[i] = result[i] + ram;
            str = result.join(' ');
        }
        outtext += "乱数（共通鍵）「 " + ram + " 」を各文字コードに足すと、「 " + str + " 」になります。\nこれが暗号文です。\n\n";
        document.getElementById("outtext").value = outtext;
        flg = 2;
        btn.value = "復号？";
    }else if(flg == 2){
        var false_character = new Array(result.length);
        var false_document;
        //乱数が足された各文字コードを文字化して結合し、表示する
        for(i = 0;i<result.length;i++){
            false_character[i] = String.fromCharCode(result[i]);
            false_document = false_character.join('');
        }
        outtext += "これを文字に戻そうとすると、「 " + false_document + " 」になり、なにを送ったのか分からなくなりました。\n正しく復号するには暗号文「 " + str + " 」と乱数（共通鍵）「 " + ram + " 」が必要です\n\n";
        document.getElementById("outtext").value = outtext;
        flg = 3;
        btn.value = "復号";
    }else if(flg == 3){
        var cipher = str;
        //乱数が足された各文字コードから乱数を引いて結合し、表示する
        for(i = 0;i<result.length;i++){
            result[i] = result[i] - ram;
            str = result.join(' ');
        }
        outtext += "暗号文「 " + cipher + " 」から乱数【n】(共通鍵)「 " + ram + " 」を引くと「 " + str + " 」になりました。\n最後にこれを文字に戻します。\n\n";
        document.getElementById("outtext").value = outtext;
        flg = 4;
        btn.value = "文字化";
    }else if(flg == 4){
        //各文字コードを文字化して結合し、表示する
        for(i = 0;i<result.length;i++){
            result[i] = String.fromCharCode(result[i]);
            str = result.join('');
        }
        outtext += "各文字コードを文字に戻すと「 " + str + " 」になりました。これで復号の完了です。\n";
        document.getElementById("outtext").value = outtext;
        btn.disabled = true;
    }else{
        value = document.getElementById("gettext").value;
        result = value.split('');
        //各文字を文字コード化して結合し、表示する
        for(i = 0;i<result.length;i++){
            result[i] = result[i].charCodeAt();
            result[i] = parseInt(result[i], 10);
            str = result.join(' ');
        }
        flg = 1;
        outtext += "「 " + value + " 」を文字コード化すると「 " + str + " 」になります\n\n";
        document.getElementById("outtext").value = outtext;
        btn.value = "暗号化";
    }
}