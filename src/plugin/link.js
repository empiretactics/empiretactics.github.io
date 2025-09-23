const Links = document.getElementById('links');
Links.innerHTML = LinkConfig.map(link =>
    `<a href="${link.href}">${link.text}</a><br>`
).join('');