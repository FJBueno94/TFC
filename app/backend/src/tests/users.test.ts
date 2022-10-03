import { app } from '../app';
import * as Sinon from 'sinon';
import * as chai from 'chai';
//@ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent'
import Users from '../database/models/user.model';

chai.use(chaiHttp);

const { expect } = chai;

describe('/POST', () => {
  describe('/LOGIN', () => {
    let chaiHttpResponse: Response;
    
    before(async () => {
      Sinon
      .stub(Users, 'findOne')
      .resolves({} as Users)
    });

    after(() => {
      (Users.findOne as Sinon.SinonStub).restore();
    });

    it('Valida login como sucesso', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'test@test.com',
        password: '123456',
      });
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.have.property('token');
    });

    it('valida login como credenciais invalidas', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'test',
        password: '123',
      });

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse).to.have.property('error');
    });

    it('valida login sem credenciais', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: '',
        password: '',
      });

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse).to.have.property('error');
    });

    it('valida login com credenciais não existentes', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'teste@teste.com',
        password: '123456',
      });

      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse).to.have.property('error');
    });
  }) 
});
