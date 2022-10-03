import { app } from '../app';
import * as Sinon from 'sinon';
import * as chai from 'chai';
//@ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent'

chai.use(chaiHttp);

const { expect } = chai;

describe('/MATCHES', () => {
  let chaiHttpResponse: Response;

  describe('GETALL', () => {
    
    before(async () => {
      chaiHttpResponse = await chai.request(app).get('/matches');
    });

    it('Valida retorno de matches como sucesso', async () => {
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.an('array');
      expect(chaiHttpResponse.body[0]).to.have.property('homeTeam');
      expect(chaiHttpResponse.body[0]).to.have.property('awayTeam');
    });
  });
});
