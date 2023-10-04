module.exports.welcome = (req, res) => {

    res.json({
        user: ["user1", "user2", "user3"],
        names: ["jason", "jack", "Adam"],
        msg: "login page is up and running!"
    })
}

