import { comparePassword, hashPassword } from "../middlewares/bcrypt.js";
import { generateToken } from "../middlewares/jwt.js";
import Users from "../model/userModel.js";

export const Login = async (req, res) => {
  const { username, password, email } = req.body;

  const currentUser = await Users.findOne({ email });

  if (!currentUser) {
    return res.status(404).json({ message: "User Not Found" });
  }

  const passwordValdiation = await comparePassword(
    password,
    currentUser.password
  );

  if (!passwordValdiation) {
    return res.status(402).json({ message: "Password does't match" });
  }

  const token = await generateToken(currentUser._id);

  console.log("login api");
  res
    .status(200)
    .json({ message: "Login api done", data: { currentUser, token } });
};

export const Register = async (req, res) => {
  const { username, password, email } = req.body;

  console.log(req.body);

  const hashedPassword = await hashPassword(password);

  console.log("hashed password", hashPassword);

  const existUser = await Users.findOne({ email });

  if (existUser) {
    return res.status(404).json({ message: "Ueser exist" });
  }

  const newUser = await Users.create({
    username,
    password: hashedPassword,
    email,
  });

  await newUser.save();

  res.status(200).json({ message: "register api done", data: newUser });
};
