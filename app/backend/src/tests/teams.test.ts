import { app } from '../app';
import * as Sinon from 'sinon';
import * as chai from 'chai';
//@ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent'
import Users from '../database/models/user.model';

chai.use(chaiHttp);

const { expect } = chai;

describe('/GET', () => {
  let chaiHttpResponse: Response;

  describe('/TEAMS', () => {
    
    before(async () => {
      chaiHttpResponse = await chai.request(app).get('/teams');
    });

    it('Valida retorno de teams como sucesso', async () => {

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.an('array');
      expect(chaiHttpResponse.body[0]).to.have.property('teamName');
    });
  });
});
