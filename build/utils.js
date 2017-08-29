// 生成版本控制号
exports.getVersion = () => {
    let date = new Date(),
        fix = (num) => num < 10 ? `0${num}` : num,
        year = date.getFullYear().toString(),
        month = fix(date.getMonth() + 1),
        day = fix(date.getDate()),
        hours = fix(date.getHours()),
        minutes = fix(date.getMinutes()),
        seconds = fix(date.getSeconds());

    return year + month + day + hours + minutes + seconds;

};