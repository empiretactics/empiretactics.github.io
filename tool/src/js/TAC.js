const Color = document.getElementById('Color');

const TACmyid = document.getElementById('TACmyid');
const TACyourName = document.getElementById('TACyourName');
const TACcd = document.getElementById('TACcd');
const TACtimes = document.getElementById('TACtimes');
const TACtext = document.getElementById('TACtext');

const rightBoxTime = document.getElementById('rightBoxTime');
const rightBoxTop = document.getElementById('rightBoxTop');
const rightBoxCounter = document.getElementById('rightBoxCounter');

const defaultText = 'Hello!';
const defaultCd = 1;
const defaultColor = 'white';

let currentIndex;
let timer;
let intervalId;
let intervalId2;
let currentTime;

const data0 = '{"query":"mutation SendChatMessage($input: SendChatMessageInput!) {sendChatMessage(input: $input) {dropReason message {id}}}","variables":{"input":{"channelID":"';
const data1 = '","message":"';
const data2 = '"}}}';
const data3 = '[{"operationName":"ChannelShell","variables":{"login":"';
const data4 = '"},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"580ab410bcd0c1ad194224957ae2241e5d252b2c5173d8e0cce9d32d5bb14efe"}}}]';

// 在頁面加載時從 Cookie 載入內容
const elements = [Color, TACmyid, TACyourName, TACcd, TACtimes, TACtext]; // 將所有需要讀取cookie的元素放入數組
window.onload = function() {
    elements.forEach(function(element) {
        getCookie(element); // 循環調用 getCookie
        element.addEventListener('input', function() {
            setCookie(element); // 監聽變更事件，並更新 Cookie
        });
    });
    // 若沒有值取預設值
    TACtext.value = TACtext.value || defaultText;
    TACcd.value = TACcd.value || defaultCd;
    Color.value = Color.value || defaultColor;
    changeColor(Color.value);
}

async function ResetAndRun() {
    // 初始化
    Stop();
    rightBoxCounter.innerHTML = '';

    // 設定
    let oauth = "OAuth " + TACmyid.value;
    let TwitchGetUserTexts = data3 + TACyourName.value + data4;

    const res = await twitchGql(oauth, TwitchGetUserTexts, 'TwitchGetUser');
    let TACyourid = res[0]['data']['userOrError']['id'];
    if (TACyourid === undefined) {
        rightBoxCounter.innerHTML += currentTime + ' 無此頻道帳號：'　+ TACyourName.value + '<br>';
        return;
    }
    let TwitchCommentTexts = TACtext.value.split('\n');
    TwitchCommentTexts = filterSpace(TwitchCommentTexts);
    TwitchCommentTexts = data0 + TACyourid + data1 + TwitchCommentTexts + data2;

    // 執行
    rightBoxCounterText(oauth, TwitchCommentTexts, TwitchGetUserTexts);
    intervalId2 = setInterval(rightBoxTopText, 1000); // 每隔 1 秒執行
}

function Stop() {
    clearInterval(intervalId);
    clearInterval(intervalId2);
    currentIndex = 0;
}

async function rightBoxCounterText(oauth, TwitchCommentTexts, TwitchGetUserTexts) {
    clearInterval(intervalId); // 清除執行時間
    currentIndex++;

    // 確認live on
    const resStream = await twitchGql(oauth, TwitchGetUserTexts, 'TwitchGetUser');
    let TACyourstream = resStream[0]['data']['userOrError']['stream'];
    if (TACyourstream == null) {
        await twitchGql(oauth, TwitchCommentTexts, 'TwitchComment');
        rightBoxCounter.innerHTML += currentIndex + ' ' + currentTime + '<br>';
    } else {
        rightBoxCounter.innerHTML += currentIndex + ' ' + currentTime + ' 頻道直播中取消發送' + '<br>';
    }

    intervalId = setInterval(() => {
        rightBoxCounterText(oauth, TwitchCommentTexts, TwitchGetUserTexts);
    }, TACcd.value * 60 * 1000); // 每隔 60 秒執行
    timer = TACcd.value * 60;
    if (TACtimes.value === currentIndex) {
        Stop();
    }
    rightBoxCounter.scrollTop = rightBoxCounter.scrollHeight;
}

function rightBoxTopText() {
    rightBoxTop.innerHTML = timer;
    timer--;
}
