const leftBox = document.getElementById('leftBox');
const rightText = document.getElementById('rightText');
const topBox = document.getElementById('topBox');
const downBox = document.getElementById('downBox');
const currentTextLeft = document.getElementById('currentTextLeft');
const currentTextRight = document.getElementById('currentTextRight');

const defaultText = '一\n二\n三\n四\n五\n六\n七\n八\n九\n十';
let currentIndex = 0;
let intervalId;

const attackTexts = [
    '擊殺',
    '刀了',
    '開槍'
];
let texts;
let newTexts;

function displayText() {
    // 輸入兩個人物character
    let in1 = arrRandom(texts);
    let character1 = texts[in1];
    // tmp
    texts[in1] = texts[0];
    texts.shift();

    if (texts.length > 0) {
        let character2 = texts[arrRandom(texts)];
        leftBox.innerHTML += character2;
        leftBox.innerHTML += attackTexts[arrRandom(attackTexts)];
        leftBox.innerHTML += character1;
        leftBox.innerHTML += '<br>';
        currentTextLeft.textContent = character2; // 更新左邊當前印出的文字
        currentTextRight.textContent = character1; // 更新右邊當前印出的文字
        // currentIndex++;
    } else {
        downBox.innerHTML += character1;
        downBox.innerHTML += ' 活下來了';
        downBox.innerHTML += '<br>';
        clearInterval(intervalId);
    }
    leftBox.scrollTop = leftBox.scrollHeight;
    downBox.scrollTop = downBox.scrollHeight;
}

function resetAndRun() {
    clearInterval(intervalId);
    leftBox.innerHTML = '';
    currentTextLeft.textContent = ''; // 重置左邊當前印出的文字顯示
    currentTextRight.textContent = ''; // 重置右邊當前印出的文字顯示
    currentIndex = 0;
    texts = rightText.value.split('\n');
    texts = filterSpace(texts);
    intervalId = setInterval(displayText, 1000);
}

// 在頁面加載時從 Cookie 載入內容
window.onload = function() {
    getCookie(rightText);
    changeColor('white');
};

// 監聽 textarea 的變更事件，並更新 Cookie
rightText.addEventListener('input', function() {
    setCookie(rightText);
});

const cls = ['color-white', 'color-black', 'color-zizi', 'color-cloudcat', 'color-mumu'];

function changeColor(color) {
    document.querySelectorAll('.color').forEach(style => {
        style.classList.remove(...cls);
        style.classList.add('color-' + color);
    });
}

function arrRandom(arr) {
    return Math.floor(Math.random() * arr.length);
}

function filterSpace(arr) {
    let tmp = [];
    arr.forEach(v => {
        if (v.trim() !== '') {
            tmp.push(v);
        }
    });
    return tmp;
}

function setCookie(obj) {
    const expireDate = new Date();
    expireDate.setFullYear(expireDate.getFullYear() + 10); // 設置 Cookie 10 年後過期
    document.cookie = `${obj.id}=${encodeURIComponent(obj.value)}; expires=${expireDate.toUTCString()}; path=/`;
}

function getCookie(obj) {
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
