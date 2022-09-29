import IToken from '../interfaces/IToken';
import UserModel from '../database/models/user.model';
import IUser from '../interfaces/IUser';
import createToken from '../helpers/token';
import validatePassword from '../helpers/bcrypt';

export default class User {
  model = UserModel;

  public login = async (email: string, password: string): Promise<IToken> => {
    const result = await this.model.findOne({
      where: { email },
      raw: true,
    }) as IUser;
    if (!result) {
      throw new Error('Invalid username or password');
    }
    const isValid = validatePassword(password, result.password);
    if (!isValid) {
      throw new Error('Invalid password');
    }
    const token = createToken(result);
    return token as unknown as IToken;
  };
}
