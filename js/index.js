/* 1). mouseenter->prev and next display, mouseleave->prev and next display none*/
window.addEventListener("load", function() {
    var prev = document.querySelector(".prev")
    var next = document.querySelector(".next")
    var focus = document.querySelector(".focus")
    var focusWidth = focus.offsetWidth
    focus.addEventListener("mouseenter", function() {
        clearInterval(timer)
        timer = null
        prev.style.display = "block"
        next.style.display = "block"
    })
    focus.addEventListener("mouseleave", function() {
        prev.style.display = "none"
        next.style.display = "none"
        timer = setInterval(function() {
            next.click()
        }, 2000)
    })

    /* 2).  the qty of circles = the qty of images */
    /* 3). click one of the circle, the color of it changed  */
    var num = 0
    var circle = 0
    var ul = focus.querySelector("ul")
    var circles = focus.querySelector(".promo-nav")
    for (var i = 0; i < ul.children.length; i++) {
        var li = this.document.createElement("li")
        li.setAttribute("index", i)
        circles.appendChild(li)
        li.addEventListener("click", function() {
            for (var i = 0; i < circles.children.length; i++) {
                circles.children[i].className = ""
            }
            this.className = "selected"
                /* 4). click n-th circle, nth image displayed, ol is moving */
            var index = this.getAttribute("index")
            circle = index
            num = index
            animate(ul, -index * focusWidth)
        })
    }
    circles.children[0].className = "selected"
        /* 5).clone the first image and append it to the last */
    var first = ul.children[0].cloneNode(true)
    ul.appendChild(first)

    /* 6). click next button, the images changed to the next one */
    var flag = true
    next.addEventListener("click", function() {
        if (flag) {
            flag = false
            if (num == ul.children.length - 1) {
                ul.style.left = 0
                num = 0
            }
            num++
            animate(ul, -num * focusWidth, function() {
                    flag = true
                })
                /* 7).click next button,the circle changed to the next*/
            circle++
            if (circle == circles.children.length) {
                circle = 0
            }
            circleChange()
        }
    })

    /* 7). click prev button, the images changed to the last one */
    /* flag: the pic fully displayed before next click */
    prev.addEventListener("click", function() {
        if (flag) {
            flag = false
            if (num == 0) {
                num = ul.children.length - 1
                ul.style.left = -num * focusWidth
            }
            num--
            animate(ul, -num * focusWidth, function() {
                    flag = true
                })
                /* 7).click next button,the circle changed to the next*/
            circle--
            if (circle < 0) {
                circle = ul.children.length - 2
            }
            circleChange()
        }
    })

    function circleChange() {
        for (var i = 0; i < circles.children.length; i++) {
            circles.children[i].className = ""
        }
        circles.children[circle].className = "selected"
    }
    var timer = setInterval(function() {
        if (flag) {
            flag = false
            if (num == ul.children.length - 1) {
                ul.style.left = 0
                num = 0
            }
            num++
            animate(ul, -num * focusWidth, function() {
                    flag = true
                })
                /* 7).click next button,the circle changed to the next*/
            circle++
            if (circle == circles.children.length) {
                circle = 0
            }
            circleChange()
        }
    }, 2000)

    $(function() {
        // nav-category show up if window scroll to the .recom box
        var boxTop = $(".recom").offset().top
        var flag = true
        $(window).scroll(function() {
            if ($(document).scrollTop() >= boxTop) {
                $(".nav-category").fadeIn()
            } else {
                $(".nav-category").fadeOut()
            }
            // **click li-> flag false-> this each will not be executed
            // **after click-> flag true-> this each will be executed
            if (flag) {
                $(".floor").each(function(i, domEle) {
                    if ($(document).scrollTop() >= $(domEle).offset().top) {
                        $(".nav-category li")
                            .eq(i)
                            .addClass("current")
                            .siblings("li")
                            .removeClass("current")
                    }
                })
            }
        })

        // window scroll to the category, li in nav-category changed color

        // click the li, bgc changed to red, the other li change back to white
        // click li in nav-category, window scrolled to the entsprende category

        $(".nav-category li").click(function() {
            flag = false
            var index = $(this).index()
            var floorTop = $(".floor").eq(index).offset().top
            $(this).addClass("current").siblings("li").removeClass("current")
                //$(document).scrollTop(floorTop)
            $("body,html")
                .stop()
                .animate({
                        scrollTop: floorTop,
                    },
                    function() {
                        flag = true
                    }
                )
        })
    })
})