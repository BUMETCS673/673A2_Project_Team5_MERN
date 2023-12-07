import sinon from 'sinon';
import { expect } from 'chai';
import User from '../model/users.js';
import Document from '../model/document.js';
import DocumentMethods from '../controller/document.js';
import mongoose from 'mongoose';
import AIMethods from '../ai/ai.js';


describe('getDocument', () => {
  it('should find document details', async () => {
    const documentId = '123456789';
    const documentContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    const mockDocument = {
      _id: new mongoose.Types.ObjectId(),
      document_id: documentId,
      content: documentContent
    };

    const req = {
      params: {
        docId: documentId,
      }
    }

    const res = {
      json: sinon.spy()
    }

    const findByIdStub = sinon.stub(Document, 'findOne');
    findByIdStub.withArgs({ document_id: documentId }).returns(mockDocument);

    try {
      await DocumentMethods.getDocument(req, res);

      expect(findByIdStub.calledWith({ document_id: documentId })).to.be.true;
      expect(res.json.calledWith({ docs: mockDocument })).to.be.true;
    } finally {
      // Always restore stubs to avoid side effects on other tests
      findByIdStub.restore();
    }
  });
});

describe('updateContent', () => {
  it('should update the documents content', async () => {
    const req = {
      body: {
        content: 'updated content',
        docId: '123456789',
      }
    }
    const res = {
      json: sinon.spy(),
    }
    const updatedDocument = { _id: req.body.docId, content: req.body.content };

    const findOneAndUpdateStub = sinon.stub(Document, 'findOneAndUpdate');
    findOneAndUpdateStub.withArgs(
      { document_id: updatedDocument._id },
      { content: updatedDocument.content },
    ).returns(updatedDocument);

    try {
      await DocumentMethods.updateContent(req, res);
      expect(findOneAndUpdateStub.calledWith({ document_id: updatedDocument._id }, { content: updatedDocument.content })).to.be.true;
      expect(res.json.calledWith({ doc: updatedDocument })).to.be.true;
      //expect(result).to.deep.equal(updatedDocument);
    } finally {
      // Always restore stubs to avoid side effects on other tests
      findOneAndUpdateStub.restore();
    }
  });
});

describe('updateSummary', () => {
  it('should update and return a document summary', async () => {

    const req = { body: { documentId: '123' } };
    const res = { json: sinon.spy() };
    const docContent = { content: 'This is the content of the document.' };

    sinon.stub(Document, 'findOne').resolves(docContent);
    sinon.stub(Document, 'findOneAndUpdate').resolves();

    // Act
    await DocumentMethods.updateSummary(req, res);

    // Assert
    expect(Document.findOne.calledWith({ document_id: '123' }, 'content')).to.be.true;
    expect(Document.findOneAndUpdate.calledWith({ document_id: '123' })).to.be.true;
    expect(res.json.calledOnce).to.be.true;

    // Restore the stubs
    Document.findOne.restore();
    Document.findOneAndUpdate.restore();
  });
});
