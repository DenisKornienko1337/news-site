const Chat = require('../models/chat')
const clients = new Set()

exports.getIndex = (req, res) => {
    Chat.find({})
    .then(chat => {
        res.send({'chat': chat})
        res.sendStatus(200)
    })
    .catch(err => {
        res.sendStatus(500)
    })
}

exports.sendMessage = (ws, req) => {
    clients.add(ws)
    ws.on('message', msg => {
        if(!req.session) {
            return
        }
        let time = new Date()
        time = ("0" + time.getHours()).slice(-2)+':'+("0" + time.getMinutes()).slice(-2)+':'
        +("0" + time.getSeconds()).slice(-2)
        let json = {
            message: msg,
            time,
            user: req.session.username,
            color: req.session.color
        }
        clients.forEach(client => {
            client.send(JSON.stringify(json))
        })
        
        const message = new Chat({
            time: time,
            message: msg,
            user: req.session.username,
            color: req.session.color
        })
        message.save()
    })
    ws.on('close', () => {
        clients.delete(ws)
    })
}