/* 1). mouseenter->prev and next display, mouseleave->prev and next display none*/
window.addEventListener("load", function() {
    // initialize the recom-bd
    function showActiveLi(first, last) {
        $(".recom-bd>ul li").fadeOut(5)
        $(".recom-bd>ul li").each(function(i, el) {
            if (i >= first && i <= last) {
                $(".recom-bd>ul li").eq(i).fadeIn(5)
            }
        })
    }
    var prev = document.querySelector(".prev")
    var next = document.querySelector(".next")
    var focus = document.querySelector(".focus")
    var focusWidth = focus.offsetWidth
    showActiveLi(0, 5)
    focus.addEventListener("mouseenter", function() {
        clearInterval(timer)
        timer = null
        prev.style.display = "block"
        next.style.display = "block"
    })
    focus.addEventListener("mouseleave", function() {
        prev.style.display = "none"
        next.style.display = "none"
        timer = setInterval(slide, 2000)
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

    var slide = function() {
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
    }
    var timer = setInterval(slide, 2000)

    $(function() {
        // dropdown list in section#shortcut slide down in hover
        $("li.arrow-icon").hover(
                function() {
                    $(this)
                        .children("ul")
                        .stop()
                        .slideDown(400)
                        .parents(".shortcut")
                        .stop()
                        .animate({ height: "123px" })
                },
                function() {
                    $(this)
                        .children("ul")
                        .stop()
                        .slideUp(400)
                        .parents(".shortcut")
                        .stop()
                        .animate({ height: "31px" })
                }
            )
            // recom-bd slider, click right arrow to slide the pic to the right

        $(".right").click(function() {
            var last = getLastActiveIndex()

            if (last == 11) {
                $(this).unbind("click")
            } else {
                var first = last - 5
                showActiveLi(first + 1, last + 1)
            }
        })

        // recom-bd slider, click left arrow to slide the pic to the left
        $(".left").click(function() {
            var first = getFirstActiveIndex()
            if (first == 0) {
                $(this).unbind("click")
            } else {
                var last = first + 5
                showActiveLi(first - 1, last - 1)
            }
        })

        function getLastActiveIndex() {
            var last = 0
            $(".recom-bd>ul li").each(function(i, el) {
                if ($(".recom-bd>ul li").eq(i).is(":visible")) {
                    if (i > last) {
                        last = i
                    }
                }
            })
            return last
        }

        function getFirstActiveIndex() {
            var first = 11
            $(".recom-bd>ul li").each(function(i, el) {
                if ($(".recom-bd>ul li").eq(i).is(":visible")) {
                    if (i < first) {
                        first = i
                    }
                }
            })
            return first
        }
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