window.onload = function() {
    var regtel = /^1[3|4|5|6|7|8]\d{9}$/
    var regqq = /^[1-9]\d{4,}$/ //  10000
    var regnick = /^[a-zA-Z]{4,10}$/
    var regveri = /^\d{6}$/
    var regpwd = /^[a-zA-Z0-9_-]{6}$/
    var tel = document.querySelector("#tel")
    var qq = document.querySelector("#qq")
    var nick = document.querySelector("#nickname")
    var veri = document.querySelector("#verification")
    var pwd = document.querySelector("#pwd")
    var confirmpwd = document.querySelector("#confirmPwd")

    regexp(tel, regtel) // tel
    regexp(qq, regqq) // tel
    regexp(nick, regnick) // tel
    regexp(veri, regveri) // tel
    regexp(pwd, regpwd) // tel

    function regexp(el, reg) {
        el.onblur = function() {
            if (reg.test(this.value)) {
                this.nextElementSibling.className = "success"
                this.nextElementSibling.innerHTML =
                    '<i class="success_icon"></i> Input is correct'
            } else {
                this.nextElementSibling.className = "error"
                this.nextElementSibling.innerHTML =
                    '<i class="error_icon"></i> Input is not correct'
            }
        }
    }

    confirmpwd.onblur = function() {
        if (confirmpwd.value === pwd.value) {
            this.nextElementSibling.className = "success"
            this.nextElementSibling.innerHTML =
                '<i class="success_icon"></i>Passwords match'
        } else {
            this.nextElementSibling.className = "error"
            this.nextElementSibling.innerHTML =
                '<i class="error_icon"></i> Passwords do not match, pls re-enter password'
        }
    }
}