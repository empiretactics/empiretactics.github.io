// 使用 JavaScript 動態引入音效設定檔 ../sound.txt
fetch('/soundweb/page/bar/sound_test.txt')
    .then(response => response.text())
    .then(data => {
        const soundButtonsWrapper = document.getElementById('soundButtonsWrapper');
        const audioSettings = data.split('\n').filter(setting => setting.trim() !== '');

        audioSettings.forEach(setting => {
            if (setting.trim().startsWith('#')) {
                // 跳過註解行
                return;
            }

            const [audioName, audioFile] = setting.split("：");
            const button = document.createElement('button');
            button.className = 'sound-button';
            button.textContent = audioName.trim();
            button.onclick = () => playSound(audioFile.trim());
            soundButtonsWrapper.appendChild(button);
        });
    });

var audio = new Audio();

function playSound(soundFile) {
    audio.src = soundFile;
    audio.play();
}