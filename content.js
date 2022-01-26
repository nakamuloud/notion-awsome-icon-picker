const target = document.querySelector("#notion-app")
const ICON_PICKER_LINK_SUBMIT_TEXT = ["確定"]

// Selector guide

const ICON_PICKER_LINK_SUBMIT_BUTTON = "div.notion-media-menu div.notion-scroller.vertical div div div div div.notion-focusable"
const observerConfig = { attributes: true, childList: true,subtree:true, attributeFilter:['class','notion-media-menu'] };


// DOMの変更を監視
const observer = new MutationObserver((mutations) => {
    observer.disconnect();

    mutations.forEach(mutation=>{
        Array.from(mutation.addedNodes).filter(node=>isIconPickerElement(node)).forEach(iconPickerSubmitButton=>{
            console.debug("event detected")
            // ボタンを複製(Flexレベルで)
            let button = iconPickerSubmitButton.cloneNode(true)
            // ボタンにイベントを追加
            button.addEventListener("click",openAwsomeIconPicker)
            // ボタンノードの一番下の子ノードを取得
            let mostYoungChildNode = searchMostYoungChildNode(button)
            // Textを差し替え
            mostYoungChildNode.textContent = "AWSOME ICONS!"
            // 複製したボタンノードを追加
            iconPickerSubmitButton.parentNode.appendChild(button)
        })
    })
    observer.observe(target, observerConfig);
});

// ICON_PICKERがDOMに追加(表示)判定
function isIconPickerElement (element) {
    if(!element.children) return false
    return ICON_PICKER_LINK_SUBMIT_TEXT.includes(element.querySelector(ICON_PICKER_LINK_SUBMIT_BUTTON)?.innerText)
}

function searchMostYoungChildNode(node){
    console.log("ho",node.hasChildNodes)
    return node.hasChildNodes() ? searchMostYoungChildNode(node.childNodes[0]) : node
}

function openAwsomeIconPicker(){

}

observer.observe(target, observerConfig);