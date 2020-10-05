import {
    renderOptions
} from './option'
import {simplifyUrl} from './utils'

const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
let xObject = JSON.parse(x)
if (xObject && xObject.length === 0) {
    xObject = null
}
let hashMap = xObject || [
    {
        logo: 'L',
        url: 'https://github.com/Jarrett817/lazyer-ui'
    },
    {
        logo: 'M',
        url: 'https://github.com/Jarrett817/money-lover'
    },
    {
        logo: 'M',
        url: 'https://github.com/Jarrett817/madara-cat'
    },
    {
        logo: 'R',
        url: 'https://github.com/Jarrett817/rotating-cube'
    },
    {
        logo: 'C',
        url: 'https://github.com/Jarrett817/canvas-demo'
    },
    {
        logo: 'C',
        url: 'https://github.com/Jarrett817/CV-01'
    }
]

const render = () => {
    //渲染之前先删除已添加的节点重新渲染
    $siteList.find('li:not(.last)').remove()
    //每次渲染都遍历hash
    hashMap.forEach((node, index) => {
        const $newLi = $(`
    <li>
    <div class="site">
      <div class="logo">${node.logo}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
          <div class="options">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xuanxiang"></use>
            </svg>
            </div>
          </div>
    </li>`).insertBefore($lastLi);
        $newLi.on('click', () => {
            window.open(node.url)
        })
        $newLi.on('click', '.options', (e) => {
            //弹出对话框并且使遮罩显示
            renderOptions(render, hashMap, index)
            e.stopPropagation();
        })
    })
}
render()

$('.addButton').on('click', () => {
    let url = $.trim(window.prompt('请输入你要添加的网站'))
    if (url) {
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        hashMap.push({
            logo: simplifyUrl(url)[0].toUpperCase(),
            url: url
        })
        render()
    } else {
        alert('未输入网址！！')
    }
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
    if ($('.visible')) {
        return
    }
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})
