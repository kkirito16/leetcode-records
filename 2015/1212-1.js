// 3433. 统计用户被提及情况
// 给你一个整数 numberOfUsers 表示用户总数，另有一个大小为 n x 3 的数组 events 。

// 每个 events[i] 都属于下述两种类型之一：

// 消息事件（Message Event）：["MESSAGE", "timestampi", "mentions_stringi"]
// 事件表示在 timestampi 时，一组用户被消息提及。
// mentions_stringi 字符串包含下述标识符之一：
// id<number>：其中 <number> 是一个区间 [0,numberOfUsers - 1] 内的整数。可以用单个空格分隔 多个 id ，并且 id 可能重复。此外，这种形式可以提及离线用户。
// ALL：提及 所有 用户。
// HERE：提及所有 在线 用户。
// 离线事件（Offline Event）：["OFFLINE", "timestampi", "idi"]
// 事件表示用户 idi 在 timestampi 时变为离线状态 60 个单位时间。用户会在 timestampi + 60 时自动再次上线。
// 返回数组 mentions ，其中 mentions[i] 表示  id 为  i 的用户在所有 MESSAGE 事件中被提及的次数。

// 最初所有用户都处于在线状态，并且如果某个用户离线或者重新上线，其对应的状态变更将会在所有相同时间发生的消息事件之前进行处理和同步。

// 注意 在单条消息中，同一个用户可能会被提及多次。每次提及都需要被 分别 统计。
/**
 * @param {number} numberOfUsers
 * @param {string[][]} events
 * @return {number[]}
 */
var countMentions = function (numberOfUsers, events) {
    const n = numberOfUsers;
    events.sort((a, b) => {
        const ta = Number(a[1]);
        const tb = Number(b[1]);
        if (ta !== tb) return ta - tb;
        if (a[0] === b[0]) return 0;
        return a[0] === "OFFLINE" ? -1 : 1;
    });

    const mentions = new Array(n).fill(0);
    const online = new Array(n).fill(true);
    const offlineUntil = new Array(n).fill(0);
    const lastHere = new Array(n).fill(0);

    let allAdd = 0;
    let hereTotal = 0;

    const queue = [];
    let head = 0;

    const syncOnline = (time) => {
        while (head < queue.length && queue[head][0] <= time) {
            const [t, id] = queue[head];
            head++;
            if (offlineUntil[id] === t && !online[id]) {
                online[id] = true;
                lastHere[id] = hereTotal;
            }
        }
    };

    for (const e of events) {
        const type = e[0];
        const time = Number(e[1]);
        syncOnline(time);

        if (type === "OFFLINE") {
            const id = Number(e[2]);
            if (online[id]) {
                mentions[id] += hereTotal - lastHere[id];
                online[id] = false;
            }
            const backTime = time + 60;
            if (backTime > offlineUntil[id]) {
                offlineUntil[id] = backTime;
            }
            queue.push([offlineUntil[id], id]);
        } else {
            const tokens = e[2].split(" ").filter(Boolean);
            let countAll = 0;
            let countHere = 0;
            for (const token of tokens) {
                if (token === "ALL") {
                    countAll++;
                } else if (token === "HERE") {
                    countHere++;
                } else if (token.startsWith("id")) {
                    const id = Number(token.slice(2));
                    mentions[id]++;
                }
            }
            if (countAll) allAdd += countAll;
            if (countHere) hereTotal += countHere;
        }
    }
    for (let i = 0; i < n; i++) {
        if (online[i]) {
            mentions[i] += hereTotal - lastHere[i];
        }
        mentions[i] += allAdd;
    }

    return mentions;
};
