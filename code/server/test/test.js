const sinon = require('sinon');
const { expect } = require('chai');
const User = require('../model/users');
const Document = require('../model/document');
const { getUser } = require('../controller/user');

describe('getUser', () => {
    it('should find user and documents', async () => {
        const req = {
            body: {
                sub: 'test-sub'
            }
        };
        const res = {
            json: sinon.spy()
        };

        const userStub = sinon.stub(User, 'findOne');
        const docsStub = sinon.stub(Document, 'find');

        const mockUser = { _id: 'userid0' };
        const mockDocs = [{ author: '654405c2e588fdd7faa0bef8' }];

        userStub.returns(mockUser);
        docsStub.returns(mockDocs);

        await getUser(req, res);

        expect(userStub.calledWith({ user_id: req.body.sub })).to.be.true;
        expect(docsStub.calledWith({ author: mockUser._id })).to.be.true;
        expect(res.json.calledWith({ user: mockUser, docs: mockDocs })).to.be.true;

        userStub.restore();
        docsStub.restore();
    });
});







// const chai = require('chai');
// const assert = require('assert');
// // const chaiHttp = require('chai-http');
// // const app = require('./app');
// const should = chai.should();

// describe('Test', () => {
//     describe('GET /getUser', () => {
//         it('should get the user and their docs', (done) => {
//             chai
//                 .request('/localhost:8000/user')
//                 .get('/getUser')
//                 .send({ sub: 'userid0' })
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.be.a('object');
//                     res.body.should.have.property('User');
//                     res.body.should.have.property('Document');
//                     done();
//                 });
//         });
//     });
// });