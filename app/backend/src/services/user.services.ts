import IToken from '../interfaces/IToken';
import UserModel from '../database/models/user.model';
import IUser from '../interfaces/IUser';
import Token from '../helpers/token';
import validatePassword from '../helpers/bcrypt';

export default class User {
  model = UserModel;

  public login = async (email: string, password: string): Promise<IToken> => {
    const result = await this.model.findOne({
      where: { email },
      raw: true,
    }) as IUser;
    if (!result) {
      throw new Error('Incorrect email or password');
    }
    const isValid = validatePassword(password, result.password);
    if (!isValid) {
      throw new Error('Incorrect email or password');
    }
    const token = Token.createToken(result);
    return token as unknown as IToken;
  };

  public getUser = async (email: string): Promise<IUser> => {
    const result = await this.model.findOne({
      where: { email },
      raw: true,
    }) as IUser;
    if (!result) {
      throw new Error('User not found');
    }
    return result.role as unknown as IUser;
  };
}
