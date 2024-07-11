let body = document.querySelector("body")
let productsDiv = document.getElementById("productsDiv")
let productsTopDiv = document.getElementById("productsTopDiv")
let backgroundColors = ["", "radial-gradient(rgb(72 70 76), rgb(81 72 77))", "radial-gradient(rgb(255 41 44), rgb(255 39 68))", "radial-gradient(rgb(22 14 21), rgb(41 50 51))", "radial-gradient(rgb(0 248 20), rgb(255 171 30))", "radial-gradient(rgb(26 26 26), rgb(44 44 44))", "radial-gradient(rgb(184 43 91), rgb(255 68 143))", "radial-gradient(rgb(78 78 78), rgb(10 10 10))", "radial-gradient(rgb(146 84 169), rgb(89 113 249))", "radial-gradient(rgb(0 85 154), rgb(90 67 132))"]
let bottomItem
let isAnimating = false
let midElement


function unShowfadeLeft(element) {
    element.style.transition = `0.4s`
    element.style.transform = `translateX(-120px)`
    element.style.opacity = `0`
    setTimeout(() => {
        element.style.display = `none`
    }, 500);
}
function showFadeLeft(element) {
    element.style.transform = `translateX(120px)`
    element.style.display = `flex`
    element.style.transition = `0.4s`
    setTimeout(() => {
        element.style.transform = `translateX(0px)`
        element.style.opacity = `1`
    }, 1);
}

function unShowfadeRight(element) {
    if (element != undefined) {
        element.style.transition = `0.4s`
        element.style.transform = `translateX(120px)`
        element.style.opacity = `0`
        setTimeout(() => {
            element.style.display = `none`
        }, 500);
    }
}
function showFadeRight(element) {
    element.style.transform = `translateX(-120px)`
    element.style.display = `flex`
    element.style.transition = `0.4s`
    setTimeout(() => {
        element.style.transform = `translateX(0px)`
        element.style.opacity = `1`
    }, 1);
}

function goBottom(element, elementShow, topElementClicked, topElementShow, bottomItemUnshow) {
    let initialHeight = element.offsetHeight
    let initialWidth = element.offsetWidth
    element.style.width = `${element.offsetWidth}px`
    element.style.height = `${element.offsetHeight}px`
    element.style.transition = `0.5s`
    element.style.position = `absolute`
    element.style.bottom = `0px`
    element.style.right = `0px`
    element.style.width = `150px`
    element.style.height = `150px`
    bottomItem = element
    element.onclick = (evt) => {
        evt.stopPropagation()
        if (isAnimating) return;
        isAnimating = true;
        midElement = element
        elementShow.style.transition = "0.4s"
        elementShow.style.opacity = "0"
        returnMid(element, initialHeight, initialWidth)
        backRotate(topElementClicked, topElementShow)
        showItem(bottomItemUnshow)
        bottomItem = bottomItemUnshow
        body.style.background = `${backgroundColors[Number(`${element.children[0].alt}`.replace(`Produto`, "")) - 1]}`
        setTimeout(() => {
            elementShow.style.display = ""
        }, 500);
        setTimeout(() => {
            isAnimating = false;
            productsDiv.childNodes.forEach(tag => {
                if (tag.nodeType === 1) {
                    tag.classList.remove("midElement")
                }
            });
            midElement.classList.add("midElement")
        }, 600);
    }
}

function backRotate(topElementClicked, topElementShow) {
    showFadeRight(topElementClicked);
    unShowfadeRight(topElementShow);
}

function returnMid(element, initialHeight, initialWidth) {
    midElement = element
    element.style.transition = `0.5s`
    element.style.height = `${initialHeight}px`
    element.style.width = `${initialWidth}px`
    setTimeout(() => {
        element.style.transition = ``
        element.style.position = ``
        element.style.height = ``
        element.style.width = ``
        element.style.bottom = ``
        element.style.right = ``
    }, 600);
}

function showItem(element) {
    if (element != undefined) {
        element.style.transition = ``
        element.style.display = `flex`
        element.style.opacity = `0`
        element.style.transition = `1s`
        setTimeout(() => {
            element.style.opacity = `1`
        }, 1);
    }
}

function unshowItem(element) {
    if (element != undefined) {
        element.style.transition = `0.5s`
        element.style.opacity = `0`
        setTimeout(() => {
            element.style.display = `none`
        }, 1000);
    }
}

function handleTopClick(element, index) {
    if (productsTopDiv.childNodes[index] != undefined) {
        unShowfadeLeft(element)
        if (productsTopDiv.childNodes[index + 2] != undefined) {
            showFadeLeft(productsTopDiv.childNodes[index + 2])
        }
        if ((Number(`${productsDiv.childNodes[index + 2].children[0].alt}`.replace("Produto", "")) - 1) > 0) {
            unshowItem(bottomItem)
        }
        goBottom(productsDiv.childNodes[index], productsDiv.childNodes[index + 2], element, productsTopDiv.childNodes[index + 2], bottomItem);
        showItem(productsDiv.childNodes[index + 2]);
        midElement = productsDiv.childNodes[index + 2]
        body.style.background = `${backgroundColors[Number(`${productsDiv.childNodes[index + 2].children[0].alt}`.replace("Produto", "")) - 1]}`
    }
}

productsTopDiv.childNodes.forEach((element, index) => {
    element.onclick = (evt) => {
        evt.stopPropagation()
        if (isAnimating) return;
        isAnimating = true;
        handleTopClick(element, index)
        setTimeout(() => {
            isAnimating = false;
            productsDiv.childNodes.forEach(tag => {
                if (tag.nodeType === 1) {
                    tag.classList.remove("midElement")
                }
            });
            midElement.classList.add("midElement")
        }, 600);
    }
});

productsDiv.childNodes.forEach(element => {
    element.onclick = (evt) => {
        evt.stopPropagation()
        console.log("clicou no Mid");
    }
});