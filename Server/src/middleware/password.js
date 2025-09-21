
const passwordCheck = (req, res, next) => {

    try {

        const password=  req.body?.password || req.headers["password"];

        if (password === process.env.PASSWORD) {
            return next()
        }
        else {
            return res.status(400).json({ message: "password is wrong" })

        }

    } catch (error) {
        return res.status(500).json({ message: "problem in password check middleware" })

    }
}

export default passwordCheck