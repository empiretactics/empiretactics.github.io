// 先轉成 Date 物件
const lastModified = new Date(document.lastModified);

// 格式化 (補零)
const pad = n => n.toString().padStart(2, "0");
const formatted =
    lastModified.getFullYear() + "." +
    pad(lastModified.getMonth() + 1) + "." +
    pad(lastModified.getDate()) + " " +
    pad(lastModified.getHours()) + ":" +
    pad(lastModified.getMinutes()) + ":" +
    pad(lastModified.getSeconds());

document.getElementById("lastModified").innerHTML = formatted + " &copy; Empiretactics";
