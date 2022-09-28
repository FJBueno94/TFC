import { app } from '../app';
import Sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { Response } from 'superagent'
import Users from '../database/models/user.model';

chai.use(chaiHttp);

const { expect } = chai;

describe('/POST', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    Sinon
      .stub(Users, 'findOne')
      .resolves({} as Users)
  });

  after(() => {
    Sinon.restore();
  });

  it('Deve ser possivel fazer login', async () => {
    const result = await chai.request(app).post('/login').send({
      email: 'teste2@teste.com',
      password: '123123',
    });
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse).to.have.property('token');
  });
});
