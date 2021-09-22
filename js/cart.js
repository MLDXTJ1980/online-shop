$(function() {
    //1. click .checkall, all the .checkitem will be selected
    $(".checkall").change(function() {
        $(".checkall, .checkitem").prop("checked", $(this).prop("checked"))
        if ($(this).prop("checked")) {
            $(".cart-articles ul").addClass("check-cart-articles")
        } else {
            $(".cart-articles ul").removeClass("check-cart-articles")
        }
    })

    //2. if all the .checkitem selected, .checkall will also be selected
    $(".checkitem").change(function() {
        if ($(".checkitem:checked").length === $(".checkitem").length) {
            $(".checkall").prop("checked", true)
        } else {
            $(".checkall").prop("checked", false)
        }

        if ($(this).prop("checked")) {
            $(this).parents("ul").addClass("check-cart-articles")
        } else {
            $(this).parents("ul").removeClass("check-cart-articles")
        }
    })

    //3.click + or -, the num of the qty increment or decrement, totalprice changed accordingly
    //$(this).parent().parent().siblings(".total")=$(this).parents(".total")
    //.toFixed(2) $99.10
    //str.substr(1) delet the first
    $(".increment").click(function() {
        let n = $(this).siblings(".num").val()
        n++
        $(this).siblings(".num").val(n)
        let price = $(this).parent().parent().siblings(".price").html().substr(1)
        let totalprice = (price * n).toFixed(2)
        $(this)
            .parent()
            .parent()
            .siblings(".total")
            .html("$" + totalprice)
        getSum()
    })

    $(".decrement").click(function() {
        let n = $(this).siblings(".num").val()
            // if (n == 1) break the program and return
        if (n == 1) {
            return false
        }
        n--
        $(this).siblings(".num").val(n)
        let price = $(this).parent().parent().siblings(".price").html().substr(1)
        let totalprice = (price * n).toFixed(2)
        $(this)
            .parent()
            .parent()
            .siblings(".total")
            .html("$" + totalprice)
        getSum()
    })

    // 4. input a number in the input box, the totalprice changed
    $(".num").change(function() {
        let price = $(this).parents(".qty").siblings(".price").html().substr(1)
        let num = $(this).val()
        let totalprice = (price * num).toFixed(2)
        $(this)
            .parents(".qty")
            .siblings(".total")
            .html("$" + totalprice)
        getSum()
    })
    getSum()

    // 5. getSum(): calculate amount-qty  / amount-sum
    function getSum() {
        var amountQty = 0
        var amountPrice = 0
        $(".num").each(function(i, el) {
            amountQty += parseInt($(el).val())
        })
        $(".amount-qty em").text(amountQty)

        $(".cart-articles .total").each(function(i, el) {
            amountPrice += parseFloat($(el).text().substr(1))
        })
        $(".amount-sum em").text("$" + amountPrice.toFixed(2))
    }

    // 6. delete article
    // 6.(1) delete this article
    $(".cart-articles .delete").click(function() {
            $(this).parents("ul").remove()
            getSum()
        })
        // 6.(2) delete selected articles
    $(".del-article").click(function() {
            $(".checkitem:checked").parents("ul").remove()
            getSum()
        })
        // 6.(3) clear Cart
    $(".clear-cart").click(function() {
        $(".cart-articles li").remove()
        getSum()
    })
})