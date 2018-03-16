
// 验证手机号
export function checkPhone(phone) {
     return !!/^1[3578]\d{9}$/.test(phone);
}
// 验证密码
export function checkPsd(psd) {
     return !!/^([!-~]){6,18}$/.test(psd);
}
export function showEl(txt,ms) {
     const el = document.getElementById('popup');
      el.style.display='block'
      el.innerHTML=txt;
      return setTimeout(() => {
          el.style.display='none' 
      }, ms);
}
// 向localStorage存入数据
export function setLoc(k, val) {
    if (typeof val == 'string') {
        localStorage.setItem(k, val);
        return val;
    } else {
        localStorage.setItem(k, JSON.stringify(val));
        return val;
    }
}
// 从localStorage里面获得数据
export function getLoc(k) {
    let uu = localStorage.getItem(k);
    try {
        if (typeof JSON.parse(uu) != 'number') {
            uu = JSON.parse(uu);
        }
    } catch (e) { }
    return uu;
}
// 删除
export function clearKey(k) {
    if (k) {
      localStorage.removeItem(k) 
    } else {
        localStorage.clear();
    }
}