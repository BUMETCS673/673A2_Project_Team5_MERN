import verifyToken from '../middleware/verifyToken.js';
import jwt from 'jsonwebtoken';
import sinon from 'sinon';
import { expect } from 'chai';
import User from '../model/users.js';
import Document from '../model/document.js';
import mongoose from 'mongoose';

describe('verifyToken', () => {
    it('should decode the token and call next', async () => {
        const payload = { user_id: '123', user_name: 'John', user_pic: 'https://scontent-lga3-1.xx.fbcdn.net/v/t39.30808-6/352519779_195377433066589_763832747468691902_n.png?_nc_cat=102&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=zhzlWPtCZ94AX8f-YSq&_nc_ht=scontent-lga3-1.xx&oh=00_AfBOU_DSShots0o1BHAu928hmVb6HZo7SZbbLxUy__GdVQ&oe=657350DF' };
        const secretKey = 'testestest';
        const token = jwt.sign(payload, secretKey);

        const req = { headers: { authorization: token } };
        const res = { status: sinon.spy(), json: sinon.spy() };
        const next = sinon.spy();

        await verifyToken(req, res, next);

        expect(req.user).to.be.an('object');
        expect(next.calledOnce).to.be.true;
    });

    it('should send a 401 status code when no token is provided', async () => {
        const req = { headers: {} };
        const res = {
            status: sinon.stub().returns({ json: sinon.spy() }),
            json: sinon.spy()
        };
        const next = sinon.spy();

        await verifyToken(req, res, next);

        expect(res.status.calledWith(401)).to.be.true;
    });
});