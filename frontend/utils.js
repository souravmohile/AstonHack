document.addEventListener("DOMContentLoaded", function() {
    const cookieName = "pid"
    let currCookie = getCookie()
    if (!getCookie(cookieName)) {
        let newCookieVal = generatePlayerId()
        document.cookie = `${cookieName}=${encodeURIComponent(newCookieVal)};max-age=${86400*365};path=/`
    }
})


function getCookie(cookieName) {
    let match = cookieName + "="
    let allCookies = decodeURIComponent(document.cookie).split(";")
    for (let i = 0; i < allCookies.length; i++) {
        let cookie = allCookies[i].trim()
        if (cookie.indexOf(match) == 0) {
            let cookieVal = cookie.split("=")[1]
            return cookieVal
        }
    }
    return null
}


function generatePlayerId() {
    // generate all characters valid for a cookie string
    const validChars = []
    for (let i = 33; i <= 126; i++) {
        if (i == 44 || i == 59) continue // don't include commas or semicolons
        validChars.push(String.fromCharCode(i))
    }
    let playerId = ""
    for (let i = 0; i < 64; i++) {
        const randomIdx = Math.floor(Math.random() * validChars.length)
        const randomChar = validChars[randomIdx]
        playerId += randomChar
    }
    return playerId
}