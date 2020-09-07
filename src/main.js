const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [{
        logo: 'A',
        url: 'https://www.acfun.cn'
    },
    {
        logo: 'B',
        url: 'https://www.bilibili.com'
    }
]
//对输入的字符串格式化
const simplifyUrl = (url) => {
    return url.replace('http://', '').replace('https://', '').
    replace('www.', '').replace(/\/.*/, '')
}

const render = () => {
    $siteList.find('li:not(.last').remove()
    hashMap.forEach((node, index) => {
        const $newLi = $(`
    <li>
    <div class="site">
      <div class="logo">${node.logo}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
          <div class="close">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shanchu"></use>
            </svg>
            </div>
          </div>
    </li>`).insertBefore($lastLi);
        $newLi.on('click', () => {
            window.open(node.url)
        })
        $newLi.on('click', '.close', (e) => {
            e.stopPropagation();
            hashMap.splice(index, 1)
            render()
        })
    })

}
render()

$('.addButton').on('click', () => {
    let url = window.prompt('请输入你要添加的网站')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    console.log("这是结果" + simplifyUrl(url)[0])
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        url: url
    })
    render()
})
//关闭前保存
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}

$(document).on('keypress', (e) => {
    const {
        key
    } = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})