document.addEventListener("DOMContentLoaded", function() {
    const cookieName = "player_id"
    let currCookie = getCookie(cookieName)
    if (currCookie === null) {
        let newCookieVal = generatePlayerId()
        document.cookie = `${cookieName}=${encodeURIComponent(newCookieVal)};max-age=${86400*365}`
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
    const validChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let playerId = ""
    for (let i = 0; i < 64; i++) {
        const randomIdx = Math.floor(Math.random() * validChars.length)
        const randomChar = validChars[randomIdx]
        playerId += randomChar
    }
    return playerId
}