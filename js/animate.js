function animate(obj, target, callback) {
    clearInterval(obj.timer)
    obj.timer = setInterval(function() {
        var step = (target - obj.offsetLeft) / 10
        step = step > 0 ? Math.ceil(step) : Math.floor(step)
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer)
                /* if callback is as parameter passt, run callback after clearInterval */
                /* if (callback) {
                                    callback()
                                } */
            callback && callback()
        }
        obj.style.left = obj.offsetLeft + step + "px"
    }, 20)
}