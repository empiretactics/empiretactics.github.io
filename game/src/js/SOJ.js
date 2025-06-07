let playerId = 0;
let teamCount = 0;

function addPlayer(name = null, color = '#e0e0e0', border = '1px solid #999') {
    const input = document.getElementById("playerInput");
    const playerName = name || input.value.trim();
    const allPlayers = document.querySelectorAll('.player');
    for (let p of allPlayers) {
        if (p.textContent === playerName) {
            alert("該玩家已存在！");
            input.value = "";
            return;
        }
    }
    if (playerName) {
        const div = document.createElement("div");
        div.className = "player";
        div.textContent = playerName;
        div.setAttribute("data-id", "p" + playerId++);
        div.style.background = color;
        div.style.border = border;
        document.getElementById("players").appendChild(div);
        input.value = "";
        saveState();
    }
}


function addTeam(players = []) {
    teamCount++;

    const team = document.createElement("div");
    team.className = "team";
    team.setAttribute("data-id", "team" + teamCount);

    const header = document.createElement("div");
    header.className = "team-header";

    const title = document.createElement("span");
    title.textContent = `隊伍`;

    const button = document.createElement('button');
    button.textContent = '刪除隊伍';
    button.className = "btn btn-delete";
    button.onclick = function () {
        removeTeam(this);
    };

    header.appendChild(title);
    header.appendChild(button);

    const body = document.createElement("div");
    body.className = "team-body sortable";
    body.setAttribute("data-id", "team-body-" + teamCount);

    team.appendChild(header);
    team.appendChild(body);
    document.getElementById("teamsWrapper").appendChild(team);

    players.forEach(p => {
        const div = document.createElement("div");
        div.className = "player";
        div.textContent = typeof p === "string" ? p : p.name;
        div.setAttribute("data-id", "p" + playerId++);
        if (typeof p === "object") {
            if (p.color) div.style.background = p.color;
            if (p.border) div.style.border = p.border;
        }
        body.appendChild(div);
    });

    initSortable(body);
    saveState();
}

function removeTeam(button) {
    const team = button.closest('.team');
    team.remove();
    saveState();
}

function initSortable(container) {
    new Sortable(container, {
        group: "players",
        animation: 150,
        onAdd: function (evt) {
            const team = evt.to;
            const players = team.querySelectorAll(".player").length;
            if (team !== document.getElementById("players") && players > 6) {
                alert("每隊最多 6 人！");
                evt.from.appendChild(evt.item); // 還原
            }
            saveState();
        },
        onSort: saveState
    });
}

// 刪除區
new Sortable(document.getElementById("trash"), {
    group: "players",
    animation: 150,
    onAdd: function (evt) {
        evt.item.remove(); // 刪除玩家
        saveState();
    }
});

// 初始化
initSortable(document.getElementById("players"));

// 儲存狀態至 localStorage
function saveState() {
    const state = {
        players: [],
        teams: []
    };

    // 未分隊玩家
    document.querySelectorAll('#players .player').forEach(p => {
        state.players.push({
            name: p.textContent,
            color: p.style.background || '',
            border: p.style.border || ''
        });
    });

    // 各隊伍
    document.querySelectorAll('#teamsWrapper .team').forEach(team => {
        const teamPlayers = [];
        team.querySelectorAll('.team-body .player').forEach(p => {
            teamPlayers.push({
                name: p.textContent,
                color: p.style.background || '',
                border: p.style.border || ''
            });
        });
        state.teams.push(teamPlayers);
    });

    localStorage.setItem('teamSystemState', JSON.stringify(state));
}

// 載入狀態
function loadState() {
    const raw = localStorage.getItem('teamSystemState');
    if (!raw) {
        addTeam(); // 預設一隊
        return;
    }

    const state = JSON.parse(raw);
    state.players.forEach(p => addPlayer(p.name, p.color, p.border));
    state.teams.forEach(teamPlayers => {
        addTeam(teamPlayers.map(p => ({ name: p.name, color: p.color, border: p.border })));
    });
}

loadState(); // 頁面載入時自動還原狀態

// 初始化分類區塊，只變更樣式，不改變位置
document.querySelectorAll("#colorZones .color-zone").forEach(zone => {
    const bg = zone.getAttribute("data-color");
    if (bg) zone.style.background = bg;
    new Sortable(zone, {
        group: {
            name: "players",
            pull: false,
            put: true
        },
        animation: 150,
        onAdd: function (evt) {
            const color = zone.getAttribute("data-color");
            const border = zone.getAttribute("data-border");

            evt.item.style.background = color;
            evt.item.style.border = `1px solid ${border}`;

            // 還原位置
            evt.from.insertBefore(evt.item, evt.from.children[evt.oldIndex]);

            saveState();
        }
    });
});

// 收合按鈕
document.getElementById("toggleSidebar").addEventListener("click", function () {
    const container = document.getElementById("container");
    const collapsed = container.classList.toggle("sidebar-collapsed");
    this.textContent = collapsed ? "❮" : "❯";
});