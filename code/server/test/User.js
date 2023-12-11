import sinon from 'sinon';
import { expect } from 'chai';
import User from '../model/users.js';
import Document from '../model/document.js';
import UserMethods from '../controller/user.js';
import mongoose from 'mongoose';

describe('getUser', () => {
    it('should find user and documents', async () => {
        const req = {
            user: {
                user_id: '102461594228135668650'
            }
        };
        const res = {
            json: sinon.spy()
        };

        const userStub = sinon.stub(User, 'findOne');
        const docsStub = sinon.stub(Document, 'find');

        const mockUser = { user_id: '102461594228135668650' }; //wenhao tian user_id
        const mockDocs = [{ author: '6564fed799d8503332d08fb9' }]; //wenhao tian mongoDB object_id

        userStub.withArgs({ user_id: req.user.user_id }).returns(mockUser);
        docsStub.withArgs({ author: mockUser._id }).returns(mockDocs);

        await UserMethods.getUser(req, res);

        expect(userStub.calledWith({ user_id: req.user.user_id })).to.be.true;
        expect(docsStub.calledWith({ author: mockUser._id })).to.be.true;
        expect(res.json.calledWith({ user: mockUser, docs: mockDocs })).to.be.true;

        userStub.restore();
        docsStub.restore();
    });
});

describe('createDoc', () => {
    it('should create a new document and return its document_id', async () => {
        const mockUser = { _id: new mongoose.Types.ObjectId(), user_id: '102461594228135668650' };
        const mockDoc = { document_id: '123456789', title: 'Test Document', author: mockUser._id };

        const req = {
            body: {
                title: mockDoc.title,
                userId: mockUser.user_id
            }
        };

        const res = {
            json: sinon.spy()
        };

        const userStub = sinon.stub(User, 'findOne').resolves(mockUser);
        const docStub = sinon.stub(Document.prototype, 'save').resolves(mockDoc);

        await UserMethods.createDoc(req, res);

        expect(userStub.calledWith({ user_id: req.body.userId })).to.be.true;
        expect(docStub.calledOnce).to.be.true;
        expect(res.json.calledWith({ document_id: mockDoc.document_id })).to.be.true;

        userStub.restore();
        docStub.restore();
    });
});


describe('deleteDoc', () => {
    it('should delete a document and return a success message', async () => {
        const mockUser = { _id: new mongoose.Types.ObjectId(), user_id: '102461594228135668650' };
        const mockDocId = '123456789';

        const req = {
            params: {
                docId: mockDocId
            },
            user: {
                user_id: mockUser.user_id
            }
        };

        const res = {
            json: sinon.spy()
        };

        const userStub = sinon.stub(User, 'findOne');
        const docStub = sinon.stub(Document, 'deleteOne');

        userStub.withArgs({ user_id: req.user.user_id }).returns(mockUser);
        docStub.withArgs({ document_id: req.params.docId, author: mockUser._id }).returns({ deletedCount: 1 });

        await UserMethods.deleteDoc(req, res);

        expect(userStub.calledWith({ user_id: req.user.user_id })).to.be.true;
        expect(docStub.calledWith({ document_id: req.params.docId, author: mockUser._id })).to.be.true;
        expect(res.json.calledWith({ message: "Successfully deleted the doc" })).to.be.true;

        userStub.restore();
        docStub.restore();
    });
});