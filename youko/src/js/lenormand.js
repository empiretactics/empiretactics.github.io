let x = 0; // 橫列
let y = 0; // 直行
let lock = true; // 按鈕鎖

$(function() {
    getYoukoBook();
});

function getList() {
    // 鎖
    if (lock) return;
    lock = true;
    $('#loading').css("display", "");

    // 取得輸入參數
    let searchItem = $('#search_item_list').val();

    switch (searchItem) {
        case 'o':
            x = 1; // 橫列
            y = 1; // 直行
            break;
        case 'e':
            x = 5; // 橫列
            y = 1; // 直行
            break;
        case 'n':
            x = 3; // 橫列
            y = 3; // 直行
            break;
    }

    getLenormandList();
}

<!--ajax-->
/**
 * 取 優口之書
 */
function getYoukoBook() {
    $.ajax({
        method: "GET",
        url: "https://script.google.com/macros/s/AKfycbwbyqQO5K86zjtUW_0Y4YMtRvb9p-2T2PYp9uH8FUufKoRlgJTEPsJDMz9DlD0PKRyf/exec",
        dataType: "JSON",
        success: function(res) {
            $('#loading').empty().append("優口之書：" + res);
        },
        error: function(err) {
            console.log(err);
            $('#error').append(err);
        },
        complete: function() {
            lock = false;
        }
    });
}

/**
 * 取 雷諾曼列表
 */
function getLenormandList() {
    $.ajax({
        method: "GET",
        url: "https://script.google.com/macros/s/AKfycbxD0hHsOJpLo7_NrmQv_3rZjJsHqNmKokllQACLewCn09co9VlB9fcuXEHpIU9mD0T8fQ/exec",
        data: {
            n: x * y,
        },
        dataType: "JSON",
        beforeSend: function() {
        },
        success: function(res) {
            $('#outpost').empty();
            outpost(res);
        },
        error: function(err) {
            console.log(err);
            $('#error').append(err);
        },
        complete: function() {
            $('#loading').css("display", "none");
            getYoukoBook();
        }
    });
}

<!--組HTML語法-->
/**
 * 雷諾曼列表 回傳 整理顯示
 */
function outpost(data) {
    let table = "<table border='1'>";
    for (let i = 0; i < (2 * y); i++) {
        table += "<tr>";
        for (let j = 0; j < x; j++) {
            let n = j + y * (i - 1) / 2;
            let m = j + y * i / 2 + x * y;
            if (i % 2) {
                table += "<td>" + data[n] + "</td>";
            } else {
                table += "<td><img src=" + data[m] + "></td>";
            }
        }
        table += "</tr>";
    }
    table += "</table>";

    $('#outpost').append(table);
}