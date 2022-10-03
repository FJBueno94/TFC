import { app } from '../app';
import * as Sinon from 'sinon';
import * as chai from 'chai';
//@ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent'

chai.use(chaiHttp);

const { expect } = chai;

describe('/TEAMS', () => {
  let chaiHttpResponse: Response;

  describe('FINDALL', () => {
    
    before(async () => {
      chaiHttpResponse = await chai.request(app).get('/teams');
    });

    it('Valida retorno de teams como sucesso', async () => {

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.an('array');
      expect(chaiHttpResponse.body[0]).to.have.property('teamName');
    });
  });

  describe('FINDBYID', () => {
    before(async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/teams/1');
    });

    it('Valida retorno de teams/:id como sucesso', async () => {
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.have.property('teamName');
      expect(chaiHttpResponse.body).to.have.property('id');
    });
  });
});
