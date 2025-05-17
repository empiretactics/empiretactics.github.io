const TACmyid = document.getElementById('TACmyid');
const TACyourName = document.getElementById('TACyourName');
const TACcd = document.getElementById('TACcd');
const TACtimes = document.getElementById('TACtimes');
const TACtext = document.getElementById('TACtext');
const rightBoxTime = document.getElementById('rightBoxTime');
const rightBoxTop = document.getElementById('rightBoxTop');
const rightBoxCounter = document.getElementById('rightBoxCounter');
const profileListContainer = document.getElementById('profileListContainer');
const defaultText = 'Hello!';
const defaultCd = 1;
const defaultColor = 'white';
let currentIndex;
let timer;
let intervalId;
let intervalId2;
let currentTime;
let currentColor;

const data0 = '{"query":"mutation SendChatMessage($input: SendChatMessageInput!) {sendChatMessage(input: $input) {dropReason message {id}}}","variables":{"input":{"channelID":"';
const data1 = '","message":"';
const data2 = '"}}}';
const data3 = '[{"operationName":"ChannelShell","variables":{"login":"';
const data4 = '"},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"580ab410bcd0c1ad194224957ae2241e5d252b2c5173d8e0cce9d32d5bb14efe"}}}]';

// 在頁面加載時從 Cookie 載入內容
const elements = [TACmyid, TACyourName, TACcd, TACtimes, TACtext]; // 將所有需要讀取cookie的元素放入數組
window.onload = function() {
    elements.forEach(function(element) {
        getCookie(element); // 循環調用 getCookie
        element.addEventListener('input', function() {
            setCookie(element); // 監聽 textarea 的變更事件，並更新 Cookie
        });
    });
    // 若沒有值取預設值
    TACtext.value = TACtext.value || defaultText;
    TACcd.value = TACcd.value || defaultCd;
    changeColor(defaultColor);
};

async function ResetAndRun() {
    // 初始化
    Stop();
    rightBoxCounter.innerHTML = '';

    // 設定
    let oauth = "OAuth " + TACmyid.value;
    let TwitchGetUserTexts = data3 + TACyourName.value + data4;

    const res = await twitchGql(oauth, TwitchGetUserTexts); // TwitchGetUser
    let TACyourid = res[0]['data']['userOrError']['id'];

    let TwitchCommentTexts = TACtext.value.split('\n');
    TwitchCommentTexts = filterSpace(TwitchCommentTexts);
    TwitchCommentTexts = data0 + TACyourid + data1 + TwitchCommentTexts + data2;

    // 執行
    rightBoxCounterText(oauth, TwitchCommentTexts);
    intervalId2 = setInterval(rightBoxTopText, 1000); // 每隔 1 秒執行
}

function Stop() {
    clearInterval(intervalId);
    clearInterval(intervalId2);
    currentIndex = 0;
}

async function Insert() {
    // 設定
    let oauth = "OAuth " + TACmyid.value;
    let TwitchGetUserTexts = data3 + TACyourName.value + data4;

    const res = await twitchGql(oauth, TwitchGetUserTexts); // TwitchGetUser
    let profileImageURL = res[0]['data']['userOrError']['profileImageURL'];
    let displayName = res[0]['data']['userOrError']['displayName'];
    let login = res[0]['data']['userOrError']['login'];

    const profileContainer = document.createElement('div');
    profileContainer.classList.add('color', 'profileContainer');
    profileListContainer.appendChild(profileContainer);

    const img = document.createElement('img');
    img.src = profileImageURL;
    profileContainer.appendChild(img);

    const span = document.createElement('span');
    span.innerHTML = displayName + ' ' + login + '<br>';
    profileContainer.appendChild(span);
    changeColor(currentColor);
}

async function rightBoxCounterText(oauth, TwitchCommentTexts) {
    clearInterval(intervalId); // 清除執行時間
    await twitchGql(oauth, TwitchCommentTexts, 'ResetAndRun'); // TwitchComment
    intervalId = setInterval(() => {
        rightBoxCounterText(oauth, TwitchCommentTexts);
    }, TACcd.value * 60 * 1000); // 每隔 60 秒執行
    timer = TACcd.value * 60;
    currentIndex++;
    rightBoxCounter.innerHTML += currentIndex + ' ' + currentTime + '<br>';
    if (TACtimes.value === currentIndex) {
        Stop();
    }
    rightBoxCounter.scrollTop = rightBoxCounter.scrollHeight;
}

function rightBoxTopText() {
    rightBoxTop.innerHTML = timer;
    timer--;
}

function showError(message, duration = 5000) {
    const container = document.getElementById('error-container');

    const errorBox = document.createElement('div');
    errorBox.className = 'error-message';
    errorBox.innerHTML = `
        <span>${message}</span>
        <span class="close-btn">&times;</span>
    `;

    // 關閉按鈕
    errorBox.querySelector('.close-btn').onclick = () => {
        container.removeChild(errorBox);
    };

    container.appendChild(errorBox);

    // 自動移除
    setTimeout(() => {
        if (container.contains(errorBox)) {
            container.removeChild(errorBox);
        }
    }, duration);
}

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

//config.js
const Config = [
    { name: 'white', text: 'Light', bg: '#fff', font: '#000' },
    { name: 'black', text: 'Dark', bg: '#000', font: '#fff' },
    { name: 'nezumi_zizi', text: '吱吱', bg: '#81ac71', font: '#e5d97f' },
    { name: 'cloudcat501', text: '雲貓' , bg: '#2a2655', font: '#69a0dd' },
    { name: 'empiretactic', text: '姆姆' , bg: '#f1ddde', font: '#891414' },
];

//color.js
const cls = Config.map(b => `color-${b.name}`);
function changeColor(color) {
    document.querySelectorAll('.color').forEach(style => {
        style.classList.remove(...cls);
        style.classList.add('color-' + color);
    });
    currentColor = color;
}

//button.js
const additionalButtonContainer = document.getElementById('additionalButtonContainer');
Config.forEach(button => {
    const btn = document.createElement('button');
    btn.classList.add('custom-button', 'button-' + button.name);
    btn.textContent = button.text;
    btn.onclick = () => changeColor(button.name);
    additionalButtonContainer.appendChild(btn);
});

//css.js
let cssOutput = '';
Config.forEach(themes => {
    cssOutput += `
        .button-${themes.name} {
            background-color: ${themes.bg};
            color: ${themes.font};
        }

        .color-${themes.name} {
            background-color: ${themes.bg};
            border: 2px solid ${themes.font};
            color: ${themes.font};
        }
        `;
});
const styleTag = document.createElement('style');
styleTag.textContent = cssOutput;
document.head.appendChild(styleTag);