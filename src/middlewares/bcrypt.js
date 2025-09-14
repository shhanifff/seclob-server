import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (ennterdPass, currentPass) => {
  return await bcrypt.compare(ennterdPass, currentPass);
};
