import bcrypt from "bcrypt";

const hashing = (password: string) => {
  return bcrypt.hashSync(password, 10);
};

export default hashing;