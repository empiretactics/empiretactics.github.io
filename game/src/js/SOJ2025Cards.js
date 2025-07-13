const Color = document.getElementById('Color');

const SOJ2025Cardsmyid = document.getElementById('SOJ2025Cardsmyid');
const SOJ2025CardsyourName = document.getElementById('SOJ2025CardsyourName');
const SOJ2025Cardscd = document.getElementById('SOJ2025Cardscd');
const SOJ2025Cardstimes = document.getElementById('SOJ2025Cardstimes');
const SOJ2025Cardstext = document.getElementById('SOJ2025Cardstext');

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
const elements = [Color, SOJ2025Cardsmyid, SOJ2025CardsyourName, SOJ2025Cardscd, SOJ2025Cardstimes, SOJ2025Cardstext]; // 將所有需要讀取cookie的元素放入數組
window.onload = function() {
    elements.forEach(function(element) {
        getCookie(element); // 循環調用 getCookie
        element.addEventListener('input', function() {
            setCookie(element); // 監聽變更事件，並更新 Cookie
        });
    });
    // 若沒有值取預設值
    SOJ2025Cardstext.value = SOJ2025Cardstext.value || defaultText;
    SOJ2025Cardscd.value = SOJ2025Cardscd.value || defaultCd;
    Color.value = Color.value || defaultColor;
    changeColor(Color.value);
}

function ResetAndRun() {
    // 初始化
    Stop();
    rightBoxCounter.innerHTML = '';

    // 設定
    let oauth = "L36NAXX2HMT_UNISDK_TOKEN=" + SOJ2025Cardsmyid.value;

    // let TwitchGetUserTexts = data3 + SOJ2025cardsyourName.value + data4;
    //
    // const res = await twitchGql(oauth, TwitchGetUserTexts, 'TwitchGetUser');
    // let SOJ2025cardsyourid = res[0]['data']['userOrError']['id'];
    // if (SOJ2025cardsyourid === undefined) {
    //     rightBoxCounter.innerHTML += currentTime + ' 無此頻道帳號：'　+ SOJ2025cardsyourName.value + '<br>';
    //     return;
    // }

    // let TwitchCommentTexts = SOJ2025cardstext.value.split('\n');
    // TwitchCommentTexts = filterSpace(TwitchCommentTexts);
    // TwitchCommentTexts = data0 + SOJ2025cardsyourid + data1 + TwitchCommentTexts + data2;

    // 執行
    rightBoxCounterText(oauth);
    intervalId2 = setInterval(rightBoxTopText, 1000); // 每隔 1 秒執行
}

function Stop() {
    clearInterval(intervalId);
    clearInterval(intervalId2);
    currentIndex = 0;
}

async function rightBoxCounterText(oauth) {
    clearInterval(intervalId); // 清除執行時間
    currentIndex++;

    // 確認live on
    const resStream = await sojCards(oauth, 'TwitchGetUser');
    let data = resStream['data'];
    if (data == null) {
        rightBoxCounter.innerHTML += currentIndex + ' ' + currentTime + ' 未登入' + '<br>';
    } else {
        rightBoxCounter.innerHTML += currentIndex + ' ' + currentTime + resStream['data']['groups'][0]['name'] + '<br>';
    }

    intervalId = setInterval(() => {
        rightBoxCounterText(oauth);
    }, SOJ2025Cardscd.value * 60 * 1000); // 每隔 60 秒執行
    timer = SOJ2025Cardscd.value * 60;
    if (SOJ2025Cardstimes.value === currentIndex) {
        Stop();
    }
    rightBoxCounter.scrollTop = rightBoxCounter.scrollHeight;
}

function rightBoxTopText() {
    rightBoxTop.innerHTML = timer;
    timer--;
}