//对输入的字符串格式化
const simplifyUrl = (url) => {
    return url.replace('http://', '').replace('https://', '').replace('www.', '').replace(/\/.*/, '')
}
export {simplifyUrl}