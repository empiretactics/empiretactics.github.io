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
    $('#Color').val(color);
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