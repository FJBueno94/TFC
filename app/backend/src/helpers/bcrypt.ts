import * as bcrypt from 'bcryptjs';

const validatePassword = (pwd: string, hash: string): boolean => bcrypt.compareSync(pwd, hash);

export default validatePassword;
