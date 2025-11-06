//ajax.js
function twitchGql(oauth, texts, item = null) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "https://gql.twitch.tv/gql",
            type: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": oauth,
            },
            data: texts,
            dataType: "JSON",
            beforeSend: function() {
            },
            success: function(res) {
                console.log(res);
                resolve(res);  // 請求成功，解析並返回數據
            },
            error: function(xhr, status, err) {
                console.log(err);
                const errorMsg = xhr.responseText || xhr.statusText || '未知錯誤';
                showError(errorMsg);
                reject(err);  // 請求失敗，返回錯誤
            },
            complete: function(xhr, status) {
            },
        });
    });
}