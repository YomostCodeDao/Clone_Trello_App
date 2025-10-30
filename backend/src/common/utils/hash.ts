import bcrypt from 'bcryptjs';
const ROUNDS = 12;

export const hashPassword = (plain: string) => bcrypt.hash(plain, ROUNDS);
export const comparePassword = (plain: string, hash: string) => bcrypt.compare(plain, hash);

// hash generic (refresh token)
export const hashValue = (v: string) => bcrypt.hash(v, ROUNDS);
export const compareValue = (v: string, hash: string) => bcrypt.compare(v, hash);
