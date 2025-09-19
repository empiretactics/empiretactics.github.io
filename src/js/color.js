//config.js
const Config = [
    { name: 'white', text: 'Light', bg: '#fff', font: '#000' },
    { name: 'black', text: 'Dark', bg: '#000', font: '#fff' },
    { name: 'empiretactic', text: '姆姆', bg: '#f1ddde', font: '#891414' },
    { name: 'tian_0301', text: '天天', bg: '#fff', font: '#69a0dd' },
    { name: 'nezumi_zizi', text: '吱吱', bg: '#81ac71', font: '#e5d97f' },
    { name: 'cloudcat501', text: '雲貓', bg: '#2a2655', font: '#69a0dd' },
    { name: 'gnimz0506', text: '冥耐', bg: '#aeaaab', font: '#c2c9ffff' },
];

//color.js
const cls = Config.map(b => `color-${b.name}`);
function changeColor(color) {
    document.querySelectorAll('.color').forEach(style => {
        style.classList.remove(...cls);
        style.classList.add('color-' + color);
    });
    $('#Color').val(color);
    setCookie(Color);
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