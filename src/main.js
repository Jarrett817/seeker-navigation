import {renderOptions} from './option'

const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    {
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
    return url.replace('http://', '').replace('https://', '').replace('www.', '').replace(/\/.*/, '')
}

const render = () => {
    $siteList.find('li:not(.last').remove()
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
        //关闭弹框
        const closeOptions = $('.visible').css('display', 'none')
        //删除
        $newLi.on('click', '.options', (e) => {
            //弹出对话框并且使遮罩显示
            renderOptions()
            e.stopPropagation();
            $('.delete').on('click', () => {
                closeOptions
                confirm('确认删除？') ? hashMap.splice(index, 1) : null
                render()
            })
            $('.cancel').on('click', () => {
                closeOptions
                render()
            })
            let updateUrl = () => {
                //先获取现有的快捷方式，再修改
                let url = $('.url-input').val()
                if (url) {
                    hashMap[index].logo = simplifyUrl(url)[0].toUpperCase()
                    if (url.indexOf('http') !== 0) {
                        url = 'https://' + url
                    }
                    hashMap[index].url = url
                    closeOptions
                    render()
                } else {
                    alert('未输入网址！')
                    return
                }
            }

            $('.ok').on('click', () => {
                updateUrl()
            })
            $('.option-wrapper').on('keypress', (e) => {
                const {
                    key
                } = e
                if (key === 'Enter') {
                    updateUrl()
                }
            })


        })
    })

}
render()

$('.addButton').on('click', () => {
    let url = window.prompt('请输入你要添加的网站')
    if (!url) {
        alert('未输入网址！！')
        return
    }
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
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
    if ($('.visible')) {
        return
    }
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})

