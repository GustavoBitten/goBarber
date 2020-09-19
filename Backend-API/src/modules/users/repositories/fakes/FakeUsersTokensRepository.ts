import { uuid } from 'uuidv4';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import IUsersTokensRepository from '../IUsersTokensRepository';

class FakeUsersTokensRepository implements IUsersTokensRepository {
  private userToken: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
    });

    this.userToken.push(userToken);

    return userToken;
  }
}

export default FakeUsersTokensRepository;
