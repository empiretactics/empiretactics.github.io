function setCookie(obj) {
    const expireDate = new Date();
    expireDate.setFullYear(expireDate.getFullYear() + 10); // 設置 Cookie 10 年後過期
    document.cookie = `${obj.id}=${encodeURIComponent(obj.value)}; expires=${expireDate.toUTCString()}; path=/`;
}

function getCookie(obj, defaultText = '') {
    const name = obj.id + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            obj.value = c.substring(name.length, c.length);
            return;
        }
    }
    // 如果沒有找到，則顯示預設文字
    obj.value = defaultText;
}

    // 時間控制
    function updateDateTime(obj) {
        const now = new Date();
        const date = now.toLocaleDateString(); // 當地日期
        const time = now.toLocaleTimeString(); // 當地時間
        currentTime = `${date} ${time}`
        rightBoxTime.innerHTML = currentTime;
    }

    // 每秒更新一次
    setInterval(updateDateTime, 1000);
    updateDateTime();