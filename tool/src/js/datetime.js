// 時間控制
function updateDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString(); // 當地日期
    const time = now.toLocaleTimeString(); // 當地時間
    currentTime = `${date} ${time}`
    rightBoxTime.innerHTML = currentTime;
}

// 每秒更新一次
setInterval(updateDateTime, 1000);
updateDateTime();