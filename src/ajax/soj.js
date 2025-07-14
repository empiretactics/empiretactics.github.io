//ajax.js
function sojCards(oauth, item = null) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "https://api.swordofjustice.com/nshm-card-202507-server/cards",
            type: "GET",
            headers: {
                "Content-Type": "application/json",
                // "Cookie": oauth,
            },
            dataType: "JSON",
            xhrFields: {
                withCredentials: true  // 允許 cookie 自動附上
            },
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