function filterSpace(arr) {
    let tmp = [];
    arr.forEach(v => {
        if (v.trim() !== '') {
            tmp.push(v);
        }
    });
    return tmp;
}