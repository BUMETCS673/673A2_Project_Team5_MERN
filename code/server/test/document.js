import sinon from 'sinon';
import { expect } from 'chai';
import User from '../model/users.js';
import Document from '../model/document.js';
import DocumentMethods from '../controller/document.js';
import mongoose from 'mongoose';

describe('getDocument', () => {
  it('should find document details', async () => {
    const documentId = '123456789';
    const documentContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    const document = { _id: documentId, content: documentContent };

    const findByIdStub = sinon.stub(Document, 'findById');
    findByIdStub.withArgs(documentId).returns(document);

    // You may need to stub generateSummary if it has external dependencies
    const generateSummaryStub = sinon.stub(DocumentMethods, 'generateSummary');
    generateSummaryStub.withArgs(documentContent).returns('Lorem ipsum dolor sit amet...');

    try {
      const result = await DocumentMethods.getDocument(documentId);

      expect(findByIdStub.calledWith(documentId)).to.be.true;
      expect(generateSummaryStub.calledWith(documentContent)).to.be.true;
      expect(result).to.deep.equal({ content: documentContent, summary: 'Lorem ipsum dolor sit amet...' });
    } finally {
      // Always restore stubs to avoid side effects on other tests
      findByIdStub.restore();
      generateSummaryStub.restore();
    }
  });
});

describe('updateContent', () => {
  it('should update the documents content', async () => {
    const documentId = '123456789';
    const newContent = 'Updated content';
    const updatedDocument = { _id: documentId, content: newContent };

    const findByIdAndUpdateStub = sinon.stub(Document, 'findByIdAndUpdate');
    findByIdAndUpdateStub.withArgs(documentId, { content: newContent }, { new: true }).returns(updatedDocument);

    try {
      const result = await DocumentMethods.updateContent(documentId, newContent);

      expect(findByIdAndUpdateStub.calledWith(documentId, { content: newContent }, { new: true })).to.be.true;
      expect(result).to.deep.equal(updatedDocument);
    } finally {
      // Always restore stubs to avoid side effects on other tests
      findByIdAndUpdateStub.restore();
    }
  });
});

describe('updateSummary', () => {
  it('should delete a document and return a success message', async () => {
    const documentId = '123456789';
    const newSummary = 'Updated summary';
    const updatedDocument = { _id: documentId, summary: newSummary };

    const findByIdAndUpdateStub = sinon.stub(Document, 'findByIdAndUpdate');
    findByIdAndUpdateStub.withArgs(documentId, { summary: newSummary }, { new: true }).returns(updatedDocument);

    try {
      const result = await DocumentMethods.updateSummary(documentId, newSummary);

      expect(findByIdAndUpdateStub.calledWith(documentId, { summary: newSummary }, { new: true })).to.be.true;
      expect(result).to.deep.equal(updatedDocument);
    } finally {
      // Always restore stubs to avoid side effects on other tests
      findByIdAndUpdateStub.restore();
    }
  });
});
