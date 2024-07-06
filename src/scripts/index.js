let body = document.querySelector("body")
let productsDiv = document.getElementById("productsDiv")
let productsTopDiv = document.getElementById("productsTopDiv")
let backgroundColors = ["", "radial-gradient(#662d41f0, #501a2f)", "radial-gradient(#303030, #1e1e1e)", "radial-gradient(rgb(255 86 108), rgb(255 31 60))", "radial-gradient(rgb(255 182 192), rgb(255 103 105))", "radial-gradient(rgb(176 71 1), rgb(106 28 0))", "radial-gradient(rgb(233 233 233), rgb(145 145 145))"]
let bottomItem
let isAnimating = false

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
        elementShow.style.transition = "0.4s"
        elementShow.style.opacity = "0"
        returnMid(element, initialHeight, initialWidth)
        backRotate(topElementClicked, topElementShow)
        showItem(bottomItemUnshow)
        bottomItem = bottomItemUnshow
        body.style.background = `${backgroundColors[Number(`${element.children[0].src}`.replace("http://localhost:5173/src/assets/product", "").replace(".svg", "")) - 1]}`
        setTimeout(() => {
            elementShow.style.display = ""
        }, 500);
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }
}

function backRotate(topElementClicked, topElementShow) {
    showFadeRight(topElementClicked);
    unShowfadeRight(topElementShow);
}

function returnMid(element, initialHeight, initialWidth) {
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
        if ((Number(`${productsDiv.childNodes[index + 2].children[0].src}`.replace("http://localhost:5173/src/assets/product", "").replace(".svg", "")) - 1) > 0) {
            unshowItem(bottomItem)
        }
        goBottom(productsDiv.childNodes[index], productsDiv.childNodes[index + 2], element, productsTopDiv.childNodes[index + 2], bottomItem);
        showItem(productsDiv.childNodes[index + 2]);
        body.style.background = `${backgroundColors[Number(`${productsDiv.childNodes[index + 2].children[0].src}`.replace("http://localhost:5173/src/assets/product", "").replace(".svg", "")) - 1]}`
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
        }, 600);
    }
});

productsDiv.childNodes.forEach(element => {
    element.onclick = (evt) => {
        evt.stopPropagation()
        console.log("clicou no Mid");
    }
});