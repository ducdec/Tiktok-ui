import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
class UserController {
  constructor() {}

  //show
  async showUser(req, res, next) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // [POST] login/signin
  async signin(req, res, next) {
    try {
      const { email, password } = req.body;

      // Kiểm tra xem người dùng có tồn tại trong cơ sở dữ liệu không
      const existingUser = await User.findOne({ email });
      console.log(existingUser);

      if (!existingUser) {
        return res
          .status(401)
          .json({ error: 'Email hoặc mật khẩu không đúng' });
      }

      // So sánh mật khẩu đã nhập với mật khẩu lưu trữ
      const isPasswordValid = await bcrypt.compare(
        password,
        existingUser.password,
      );

      console.log('Entered Password:', password);
      console.log('Stored Hashed Password:', existingUser.password);
      console.log('Is Password Valid:', isPasswordValid);

      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ error: 'Email hoặc mật khẩu không đúng' });
      }

      // Tạo và trả về token JWT
      const secretKey = process.env.JWT_SECRET_KEY || 'your-default-secret-key';
      const token = jwt.sign({ userId: existingUser._id }, secretKey, {
        expiresIn: '1h', // Thời gian sống của token
      });

      res.status(200).json({ token, user: existingUser });
    } catch (error) {
      console.error('Lỗi khi đăng nhập người dùng:', error);
      res.status(500).json({ error: 'Đã xảy ra lỗi khi đăng nhập người dùng' });
    }
  }

  // [POST] login/signup
  async signup(req, res, next) {
    try {
      const newUserData = req.body;

      if (
        !newUserData.username ||
        !newUserData.email ||
        !newUserData.password
      ) {
        return res
          .status(400)
          .json({ error: 'Please nhập username, email, and password' });
      }

      const existingUser = await User.findOne({ email: newUserData.email });
      if (existingUser) {
        return res.status(409).json({ error: 'Email đã được sử dụng' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(newUserData.password, 10);
      newUserData.password = hashedPassword;

      const newUser = new User(newUserData);

      const savedUser = await newUser.save();

      // Generate a JWT token
      const token = jwt.sign({ userId: savedUser._id }, 'your-secret-key', {
        expiresIn: '1h',
      });

      // Return the token and user data
      res.status(201).json({ token, user: savedUser });
    } catch (error) {
      console.error('Error during user registration:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // // [GET] login/checkpassword
  // async checkPassword(req, res) {
  //   try {
  //     const { email, password } = req.query;

  //     const user = await User.findOne({ email });

  //     if (!user) {
  //       return res.status(401).json({ isValidPassword: false });
  //     }

  //     const isPasswordValid = await bcrypt.compare(password, user.password);

  //     if (isPasswordValid) {
  //       return res.status(200).json({ isValidPassword: true });
  //     } else {
  //       return res.status(401).json({ isValidPassword: false });
  //     }
  //   } catch (error) {
  //     console.error('Error checking password:', error);
  //     res.status(500).json({ error: 'Internal server error' });
  //   }
  // }
}

export default new UserController();
