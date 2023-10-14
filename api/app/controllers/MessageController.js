const { Message } = require("../models");

module.exports = async function MessageController(req, res, next)
{
    var messages = await Message.findAll();

    res.send(messages);
}