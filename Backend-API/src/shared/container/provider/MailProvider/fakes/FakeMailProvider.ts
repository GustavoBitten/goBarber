import IMailProvider from '../models/IMailProvider';

interface IMessage {
  to: string;
  body: string;
}

class FakeMailProvider implements IMailProvider {
  private storage: IMessage[] = [];

  public async sendMail(to: string, body: string): Promise<void> {
    this.storage.push({
      to,
      body,
    });
  }
}

export default FakeMailProvider;
