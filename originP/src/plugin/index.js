const Title = document.createElement("title");
Title.textContent = TitleConfig;
document.head.appendChild(Title);

const Links = document.getElementById('links');
Links.innerHTML = LinkConfig.map(link =>
    `<a href="${link.href}">${link.text}</a><br>`
).join('');