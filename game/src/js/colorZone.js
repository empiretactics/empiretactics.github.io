//config.js
const Config = [
    { text: '神相' , bg: '#cce0ff', border: '#336699' },
    { text: '龍吟' , bg: '#dff0d8', border: '#3c763d' },
    { text: '血河' , bg: '#f8c6c6', border: '#b22222' },
    { text: '碎夢' , bg: '#d0f0f6', border: '#2e9fa0' },
    { text: '鐵衣' , bg: '#ffe5b4', border: '#ff9900' },
    { text: '九靈' , bg: '#e6d5f7', border: '#8e44ad' },
    { text: '素問' , bg: '#fcbfdc', border: '#c2185b' },
];

//zone.js
const colorZones = document.getElementById('colorZones');
Config.forEach(zone => {
    const div = document.createElement('div');
    div.classList.add('color-zone');
    div.dataset.color = zone.bg;
    div.dataset.border = zone.border;
    div.setAttribute('data-color', zone.bg);
    div.setAttribute('data-border', zone.border);
    div.textContent = zone.text;
    colorZones.appendChild(div);
});