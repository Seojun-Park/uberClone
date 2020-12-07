import jwt from "jsonwebtoken";
import User from "../entities/User";

const decodeJWT = async (token: string): Promise<any> => {
  try {
    const decoded:any = jwt.verify(token, process.env.JWT_TOKEN || "");
    const { id } = decoded;
    const member = await User.findOne({ id });
    return member;
  } catch (error) {
    return undefined;
  }
};

export default decodeJWT;
