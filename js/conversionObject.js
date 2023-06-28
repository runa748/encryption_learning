
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

    // -ramした文字コードをテキストボックスに出力
    function sub(){
        // 1 ～ 10の整数で乱数生成
        ram = Math.floor(Math.random() * 10) + 1;
        // 復号ボタンを押せるようになる
        button.disabled = false;
        let value = document.getElementById("gettext").value;
        let result = value.split('');
        flag = 1;

        // -ramした文字コード(配列)を文字列にする
        for(i = 0;i < value.length;i++){
            result[i] = result[i].charCodeAt();
            result[i] = parseInt(result[i], 10);
            result[i] -= ram;
            str = result.join(' ');
        }

        document.getElementById("outtext").value = str;

    }

    // +ramした文字コードをテキストボックスに出力
    function add(){
        // 1 ～ 10の整数で乱数生成
        ram = Math.floor(Math.random() * 10) + 1;
        // 復号ボタンを押せるようになる
        button.disabled = false;
        let value = document.getElementById("gettext").value;
        let result = value.split('');
        flag = -1;

        // +ramした文字コード(配列)を文字列にする
        for(i = 0;i<result.length;i++){
            result[i] = result[i].charCodeAt();
            result[i] = parseInt(result[i], 10);
            result[i] +=  ram;
            str = result.join(' ');
        }

        document.getElementById("outtext").value = str;

    }

    // エンターキーを無効にする
    document.onkeypress = function(e) {
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

    // 文字コードを文字へ変換
    function Decryption() {
        // 復号ボタンを押せなくなる
        button.disabled = true;
        // 文字列を一文字ずつ配列に置換
        let value = document.getElementById("outtext").value;
        let result = value.split(' ');

        // +-ramされた文字コードを文字へ変換
        for(i = 0;i<result.length;i++){
            // let tmp = result[i];
            result[i] = parseInt(result[i]) + (ram * flag);
            result[i] = String.fromCharCode(result[i]);
            str = result.join('');
        }

        document.getElementById("outtext").value = str;
        
    }