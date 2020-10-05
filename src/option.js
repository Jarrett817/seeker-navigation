import {simplifyUrl} from "./utils";

const $searchForm = $('.searchForm')
const renderOptions = (render, hashMap, index) => {
    $(`
            <div class="visible">
             <div class="shade"></div>
             <div class="option-wrapper">
                <span>修改快捷方式</span>
                <span>网址</span>
                <input  type="text" class="url-input" autofocus>
                <div class="buttons">
                <button class="delete">删除</button>
                <button class="cancel">取消</button>
                <button class="ok">完成</button>
                </div>
            </div>
            </div>
`).insertBefore($searchForm)
    //关闭弹框
    const closeOptions = () => {
        $('.visible').remove()
    }
    let updateUrl = (index) => {
        //先获取input的输入
        let input = $('.url-input')
        let url = input.val()
        if (!url) {
            alert('未输入网址！')
        } else {
            if (url.indexOf('http') !== 0) {
                url = 'https://' + url
            }
            hashMap[index].logo = simplifyUrl(url)[0].toUpperCase()
            hashMap[index].url = url
            input.remove(0)
            console.log(hashMap)
            closeOptions()
            render()
        }
    }
    //删除
    $('.delete').on('click', () => {
        closeOptions()
        confirm('确认删除？') ? hashMap.splice(index, 1) : null
        render()
    })
    $('.cancel').on('click', () => {
        closeOptions()
        render()
    })

    $('.ok').on('click', () => {
        updateUrl(index)
    })
    $('.option-wrapper').on('keypress', (e) => {
        const {
            key
        } = e
        if (key === 'Enter') {
            updateUrl(index)
        }
    })
}
export {renderOptions}