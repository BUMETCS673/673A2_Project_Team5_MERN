import { expect } from 'chai';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import User from '../model/users.js';
import LoginMethods from '../controller/login.js';
import { it } from 'node:test';

describe('login', () => {
  it('should return an access token if the user is valid', async () => {
    // Mock the request object
    const req = {
      body: {
        token: jwt.sign({ sub: '123', name: 'Test', picture: 'test.jpg' }, 'testestest'),
      },
    };

    // Mock the response object
    const res = {
      status: sinon.stub().returns({ json: sinon.spy() }),
      json: sinon.spy(),
    };

    // Mock the User model
    const userStub = sinon.stub(User, 'findOne');
    userStub.returns({
      user_name: 'Test',
      user_id: '123',
      user_pic: 'test.jpg',
    });

    // Call the login method
    await LoginMethods.login(req, res);

    // Check the response
    expect(res.json.calledOnce).to.be.true;
    expect(res.json.firstCall.args[0]).have.property('accessToken');

    // Restore the stub
    userStub.restore();
  });
  it('it should return 400 when token is invalid', async () => {
    // Mock the request object
    const req = {
      body: {
        token: 'invalid',
      },
    };

    // Mock the response object
    const res = {
      status: sinon.stub().returns({ json: sinon.spy() }),
      json: sinon.spy(),
    };

    // Call the login method
    await LoginMethods.login(req, res);

    // Check the response
    expect(res.status.calledWith(400)).to.be.true;
  });
});
