/**
 * use cookie.js
 */

      // 建立 hidden input
    //   const hiddenInput = document.createElement("input");
    //   hiddenInput.type = "hidden";
    //   hiddenInput.id = "Color";
    // //   hiddenInput.value = "#ff0000"; // 也可以先設定 value

      // 建立 hidden input
      const Color = document.createElement("input");
      Color.type = "hidden";
      Color.id = "Color";
      document.body.appendChild(Color); // 確保在 DOM 有這個元素
    
//config.js
const Config = [
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
        ft: '#c2c9ffff',
        bg: '#aeaaab'
    },
];

//color.js
const cls = Config.map(b => `color-${b.id}`);
function changeColor(color) {
    document.querySelectorAll('.color').forEach(style => {
        style.classList.remove(...cls);
        style.classList.add('color-' + color);
    });
    // $('#Color').val(color);
    Color.value = color; // 同步 hidden input
    setCookie(Color);
}

//button.js
const colorButtonContainer = document.getElementById('colorButtonContainer');
Config.forEach(button => {
    const btn = document.createElement('button');
    btn.classList.add('custom-button', 'button-' + button.id);
    btn.textContent = button.tt;
    btn.onclick = () => changeColor(button.id);
    colorButtonContainer.appendChild(btn);
});

//css.js
let cssOutput = '';
Config.forEach(themes => {
    cssOutput += `
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
const styleTag = document.createElement('style');
styleTag.textContent = cssOutput;
document.head.appendChild(styleTag);

      const defaultColor = 'white';

      // const elements = [Color]; // 將所有需要讀取cookie的元素放入數組
      // 在頁面加載時從 Cookie 載入內容
      window.addEventListener("load", function () {
          getCookie(Color); // 循環調用 getCookie
          Color.addEventListener('input', function() {
              setCookie(Color); // 監聽變更事件，並更新 Cookie
          });
          // 若沒有值取預設值
          Color.value = Color.value || defaultColor;
          changeColor(Color.value);
      });

      // window.onload = function() {
      // }