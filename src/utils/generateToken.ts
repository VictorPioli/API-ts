import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()
const secretKey = process.env.SECRET as string;

if (!secretKey) {
	throw new Error("JWT_SECRET não está definido");
}

export function generateToken(payload: object) {
	return jwt.sign(payload, secretKey, {
		expiresIn: "1d"
	});
}