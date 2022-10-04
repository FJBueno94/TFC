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

  describe('GETALL IN PROGRESS', () => {
    before(async () => {
      chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');
    });

    it('Valida retorno de matches em andamento como sucesso', async () => {
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.an('array');
      expect(chaiHttpResponse.body[0]).to.have.property('homeTeam');
      expect(chaiHttpResponse.body[0]).to.have.property('awayTeam');
    });
  });

  describe('GETALL NOT IN PROGRESS', () => {
    before(async () => {
      chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false');
    });

    it('Valida retorno de matches não em andamento como sucesso', async () => {
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.an('array');
      expect(chaiHttpResponse.body[0]).to.have.property('homeTeam');
      expect(chaiHttpResponse.body[0]).to.have.property('awayTeam');
    });
  });

  describe('POST PARTIDA INPROGRESS', () => {
    before(async () => {
      chaiHttpResponse = await chai.request(app).post('/matches').send({
        homeTeam: 1,
        awayTeam: 2,
        homeTeamGoals: 0,
        awayTeamGoals: 2,
        inProgress: 1,
      });
    });

    it('Valida retorno de partida em andamento como sucesso', async () => {
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.have.property('homeTeam');
      expect(chaiHttpResponse.body).to.have.property('awayTeam');
      expect(chaiHttpResponse.body).to.have.property('homeTeamGoals');
      expect(chaiHttpResponse.body).to.have.property('awayTeamGoals');
      expect(chaiHttpResponse.body).to.have.property('inProgress');
    });
  });
});
