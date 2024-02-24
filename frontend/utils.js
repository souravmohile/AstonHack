document.addEventListener("DOMContentLoaded", function() {
    // set player cookie
    if (!getCookie("pid")) {
        document.cookie()
    }
})


function getCookie(cookieName) {
    let match = cookieName + "="
    let allCookies= decodeURIComponent(document.cookie).split(";")
    for (let i = 0; i < allCookies.length; i++) {
        let cookie = allCookies[i].trim()
        if (cookie.indexOf(match) == 0) {
            let cookieVal = cookie.split("=")[1]
            return cookieVal
        }
    }
}