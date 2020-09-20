import { injectable, inject } from 'tsyringe';
import IMailProvider from '@shared/container/provider/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUsersTokensRepository from '../repositories/IUsersTokensRepository';

interface IRequestDTO {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
  ) {}

  public async execute({ email }: IRequestDTO): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const { token } = await this.usersTokensRepository.generate(user.id);

    await this.mailProvider.sendMail(
      email,
      `Pedido de recuperação de senha ${token}`,
    );
  }
}

export default SendForgotPasswordEmailService;
