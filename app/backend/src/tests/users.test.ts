import { app } from '../app';
import Sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
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
      Sinon.restore();
    });

    it('Valida login como sucesso', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'teste2@teste.com',
        password: '123123',
      });
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse).to.have.property('token');
    });

    it('valida login como falha', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'test',
        password: '123',
      });

      expect(chaiHttpResponse).to.have.status(422);
      expect(chaiHttpResponse).to.have.property('error');
    });
  }) 
});