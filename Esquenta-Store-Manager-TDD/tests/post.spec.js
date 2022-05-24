require('dotenv').config();

const chai = require('chai');
const chaiHttp = require('chai-http');
const mysql = require('mysql2/promise');
const Importer = require('mysql-import');

const app = require('../index');

const { expect } = chai;
chai.use(chaiHttp);

const TASK_ENDPOINT = '/task';

describe('Implemente o endpoint POST /task', () => {
  let connection;

  before(async () => {
    connection = mysql.createPool({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
    });

    const importer = new Importer({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
    });

    await importer.import('./tasks.sql');

    importer.disconnect();
  });

  after(async () => {
    await connection.execute('DROP DATABASE Tasks_Manager');
    await connection.end();
  });

  it('Será validado que é possível cadastrar uma tarefa com sucesso', async () => {
    const response = await chai
      .request(app)
      .post(TASK_ENDPOINT)
      .set('Authorization', 'Bearer_123')
      .send({
        title: 'Começar o Talker Manager',
        description: 'Começar o projeto do bloco 22',
        completed: false,
      });

    expect(response.status).to.equal(201);

    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('id');

    expect(response.body).to.be.deep.equal({
      id: 5,
      title: 'Começar o Talker Manager',
      description: 'Começar o projeto do bloco 22',
      completed: false,
    });
  });

  it('Será validado que não é possível cadastrar uma tarefa sem título', async () => {
    const response = await chai
      .request(app)
      .post(TASK_ENDPOINT)
      .set('Authorization', 'Bearer_123')
      .send({
        description: 'Começar o projeto do bloco 22',
        completed: false,
      });

    expect(response.status).to.equal(400);

    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('message');

    expect(response.body).to.be.deep.equal({
      message: '"title" is required',
    });
  });

  it('Será validado que não é possível cadastrar uma tarefa sem descrição', async () => {
    const response = await chai
      .request(app)
      .post(TASK_ENDPOINT)
      .set('Authorization', 'Bearer_123')
      .send({
        title: 'Começar o Talker Manager',
        completed: false,
      });

    expect(response.status).to.equal(400);

    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('message');

    expect(response.body).to.be.deep.equal({
      message: '"description" is required',
    });
  });

  it('Será validado que não é possível cadastrar uma tarefa sem status', async () => {
    const response = await chai
      .request(app)
      .post(TASK_ENDPOINT)
      .set('Authorization', 'Bearer_123')
      .send({
        title: 'Começar o Talker Manager',
        description: 'Começar o projeto do bloco 22',
      });

    expect(response.status).to.equal(400);

    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('message');

    expect(response.body).to.be.deep.equal({
      message: '"completed" is required',
    });
  });

  it('Será validado que não é possível cadastrar uma tarefa com status inválido', async () => {
    const response = await chai
      .request(app)
      .post(TASK_ENDPOINT)
      .set('Authorization', 'Bearer_123')
      .send({
        title: 'Começar o Talker Manager',
        description: 'Começar o projeto do bloco 22',
        completed: 'invalid',
      });

    expect(response.status).to.equal(400);

    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('message');

    expect(response.body).to.be.deep.equal({
      message: '"completed" must be a boolean',
    });
  });

  it('Será validado que não é possível cadastrar uma tarefa com título com menos de 3 caracteres', async () => {
    const response = await chai
      .request(app)
      .post(TASK_ENDPOINT)
      .set('Authorization', 'Bearer_123')
      .send({
        title: 'Co',
        description: 'Começar o projeto do bloco 22',
        completed: false,
      });

    expect(response.status).to.equal(400);

    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('message');

    expect(response.body).to.be.deep.equal({
      message: '"title" length must be at least 3 characters long',
    });
  });

  it('Será validado que não é possível cadastrar uma tarefa sem autenticação', async () => {
    const response = await chai.request(app).post(TASK_ENDPOINT).send({
      title: 'Começar o Talker Manager',
      description: 'Começar o projeto do bloco 22',
      completed: false,
    });

    expect(response.status).to.equal(401);

    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('message');

    expect(response.body).to.be.deep.equal({
      message: 'Token não encontrado',
    });
  });
});
