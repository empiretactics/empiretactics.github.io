//style
const FooterLink = document.createElement("link");
FooterLink.rel = "stylesheet";
FooterLink.href = "/src/css/footer.css";
document.head.appendChild(FooterLink);

// 先轉成 Date 物件
const FooterDate = new Date(document.lastModified);

// 格式化 (補零)
const FooterPad = n => n.toString().padStart(2, "0");
const FooterFormatted =
    FooterDate.getFullYear() + "." +
    FooterPad(FooterDate.getMonth() + 1) + "." +
    FooterPad(FooterDate.getDate()) + " " +
    FooterPad(FooterDate.getHours()) + ":" +
    FooterPad(FooterDate.getMinutes()) + ":" +
    FooterPad(FooterDate.getSeconds());

// 建立 <span>
const FooterSpan = document.createElement("span");
FooterSpan.innerHTML = FooterFormatted + " &copy; Empiretactics";

// 插入到 footer
document.getElementById("footer").appendChild(FooterSpan);
