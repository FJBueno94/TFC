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
    
    // before(async () => {
    //   Sinon
    //   .stub(Users, 'findOne')
    //   .resolves({
    //     email: 'test@test.com',
    //     password: '123456',
    //   } as Users)
    // });

    afterEach(() => {
      (Users.findOne as Sinon.SinonStub).restore();
    });

    it('Valida login como sucesso', async () => {
      Sinon
      .stub(Users, 'findOne')
      .resolves({
        email: 'test@test.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
      } as Users)

      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'test@test.com',
        password: 'secret_admin',
      });
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.have.property('token');
    });

    it('valida login como credenciais invalidas', async () => {
      Sinon
      .stub(Users, 'findOne')
      .throws('nao era para ser chamado')

      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'test',
        password: '123',
      });
      expect((Users.findOne as Sinon.SinonStub).notCalled).to.be.true;
      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse).to.have.property('error');
    });

    it('valida login sem credenciais', async () => {
      Sinon
      .stub(Users, 'findOne')
      .throws('nao era para ser chamado')

      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: '',
        password: '',
      });

      expect((Users.findOne as Sinon.SinonStub).notCalled).to.be.true;
      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse).to.have.property('error');
    });

    it('valida login com credenciais não existentes', async () => {
      Sinon
      .stub(Users, 'findOne')
      .resolves(null)

      
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'teste@teste.com',
        password: '123456',
      });

      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse).to.have.property('error');
    });
  }) 
});
