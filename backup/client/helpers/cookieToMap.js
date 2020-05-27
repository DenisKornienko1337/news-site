export default {
    cookieToMap(cookie) {
        let cookieMap = new Map()
        cookie.split(';').map(a => {
            let innerArr = a.split('=')
            cookieMap.set(innerArr[0], innerArr[1])
        })
        return cookieMap
    }
}