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
