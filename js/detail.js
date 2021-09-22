window.addEventListener("load", function() {
    var preview = this.document.querySelector(".preview")
    var mask = this.document.querySelector(".mask")
    var big = this.document.querySelector(".big")
    var bigImg = this.document.querySelector(".big-img")
        // mouseover->mask and big display
        // mouseout ->mask and big display none
    preview.addEventListener("mouseover", function() {
        mask.style.display = "block"
        big.style.display = "block"
    })
    preview.addEventListener("mouseout", function() {
        mask.style.display = "none"
        big.style.display = "none"
    })
    preview.addEventListener("mousemove", function(e) {
        // (x,y) of the mouse in the preview box
        var x = e.pageX - preview.offsetLeft
        var y = e.pageY - preview.offsetTop
            //(x,y) of the mask - mous in the middle of the mask
            //mask.style.left = x - mask.offsetWidth / 2 + "px"
            //mask.style.top = y - mask.offsetWidth / 2 + "px"
        var maskX = x - mask.offsetWidth / 2
        var maskY = y - mask.offsetHeight / 2
        var maskMaxX = preview.offsetWidth - mask.offsetWidth
        var maskMaxY = preview.offsetHeight - mask.offsetHeight
        if (maskX <= 0) {
            maskX = 0
        } else if (maskX >= maskMaxX) {
            maskX = maskMaxX
        }
        if (maskY <= 0) {
            maskY = 0
        } else if (maskY >= maskMaxY) {
            maskY = maskMaxY
        }
        mask.style.left = maskX + "px"
        mask.style.top = maskY + "px"
            // the move space of the big pic in the big box
            // img not 100%
        var bigImgMaxX = bigImg.offsetWidth - big.offsetWidth
        var bigImgMaxY = bigImg.offsetHeight - big.offsetHeight
        var bigX = (maskX * bigImgMaxX) / maskMaxX
        var bigY = (maskY * bigImgMaxY) / maskMaxY
        bigImg.style.left = -bigX + "px"
        bigImg.style.top = -bigY + "px"
    })
})