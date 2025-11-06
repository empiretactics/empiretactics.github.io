// use cookie.js

// 建立 hidden input
const Color = document.createElement("input");
Color.type = "hidden";
Color.id = "Color";
document.body.appendChild(Color); // 確保在 DOM 有這個元素

//config.js
const ColorConfig = [
    {
        id: 'white',
        tt: 'Light',
        ft: '#000',
        bg: '#fff'
    },
    {
        id: 'black',
        tt: 'Dark',
        ft: '#fff',
        bg: '#000'
    },
    {
        id: 'empiretactic',
        tt: '姆姆',
        ft: '#891414',
        bg: '#f1ddde'
    },
    {
        id: 'tian_0301',
        tt: '天天',
        ft: '#69a0dd',
        bg: '#fff'
    },
    {
        id: 'nezumi_zizi',
        tt: '吱吱',
        ft: '#e5d97f',
        bg: '#81ac71'
    },
    {
        id: 'cloudcat501',
        tt: '雲貓',
        ft: '#69a0dd',
        bg: '#2a2655'
    },
    {
        id: 'gnimz0506',
        tt: '冥耐',
        ft: '#aeaaab',
        bg: '#c2c9ffff'
    },
    {
        id: 'lazymiu_asmr',
        tt: 'Miu',
        ft: '#81ac71',
        bg: '#ffa500'
    },
];

//color.js
const ColorCls = ColorConfig.map(b => `color-${b.id}`);
function changeColor(color) {
    document.querySelectorAll('.color').forEach(style => {
        style.classList.remove(...ColorCls);
        style.classList.add('color-' + color);
    });
    Color.value = color; // 同步 hidden input
    setCookie(Color);
}

//button.js
const colorButtonContainer = document.getElementById('colorButtonContainer');
ColorConfig.forEach(button => {
    const btn = document.createElement('button');
    btn.classList.add('custom-button', 'button-' + button.id);
    btn.textContent = button.tt;
    btn.onclick = () => changeColor(button.id);
    colorButtonContainer.appendChild(btn);
});

//css.js
let ColorCss = '';
ColorConfig.forEach(themes => {
    ColorCss += `
        .button-${themes.id} {
            background-color: ${themes.bg};
            color: ${themes.ft};
        }

        .color-${themes.id} {
            background-color: ${themes.bg};
            border: 2px solid ${themes.ft};
            color: ${themes.ft};
        }
        `;
});
const ColorStyle = document.createElement('style');
ColorStyle.textContent = ColorCss;
document.head.appendChild(ColorStyle);

const ColorLink = document.createElement("link");
ColorLink.rel = "stylesheet";
ColorLink.href = "/src/css/color.css";
document.head.appendChild(ColorLink);

//main.js
const ColorDefault = 'white';

// 在頁面加載時從 Cookie 載入內容
window.addEventListener("load", function () {
    getCookie(Color, ColorDefault); // 若沒有值取預設值
    Color.addEventListener('input', function () {
        setCookie(Color); // 監聽變更事件，並更新 Cookie
    });
    changeColor(Color.value);
});
