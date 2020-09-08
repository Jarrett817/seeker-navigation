const $searchForm = $('.searchForm')
const renderOptions = () => {
    const $option = $(`
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
}

export {
    renderOptions
}