const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../model/UserModel');

const register = async (req, res) => {
    let { name, mobile, email, password, role } = req.body
    try {
        let findUser = await User.findOne({ $or: [{ email: email }, { mobile: mobile }] });
        if (findUser) {
            console.log('user already exists');
            res.status(403).json({ message: 'user already registered' })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            name: name,
            mobile: mobile,
            email: email,
            password: hashPassword,
            role: role || 'customer'
        });
        await newUser.save();
        console.log('user register succuss', newUser)
        res.status(200).json({ body: newUser, message: 'user registration success' })
    } catch (error) {
        console.log('error while registering User', error)
        res.status(500).json({ message: 'error while registering user', error })
    }
}

const login = async (req, res) => {
    let { email, password } = req.body
    try {
        const userCheck = await User.findOne({ email: email });
        if (!userCheck) {
            console.log('user does not exixts');
            res.status(401).json({ message: 'user not exists with given Email' })
        };
        const passwordCheck = await bcrypt.compareSync(password, userCheck.password);
        if (!passwordCheck) {
            console.log('Invalid Email & Password');
            res.status(401).json({ message: 'Invalid Credentials' })
        }
        const token = jwt.sign(
            { id: userCheck._id, email: userCheck.email },
            "SECRET",
            { expiresIn: '1h' }
        );
        console.log('login success', { token: token });
        res.status(200).json({ message: 'login succuss', token: token })
    } catch (error) {
        console.log('error while logging in', error)
        res.status(500).json({ message: 'internal server error', error })
    }
}


module.exports = { register, login }