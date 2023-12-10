// const Document = require('../model/document');
// const useOpenAi = require('../ai/ai');

import Document from '../model/document.js';
import useOpenAi from '../ai/ai.js';

/**
 * Req
 * @param document_id
 */
const getDocument = async (req, res, next) => {

  const docs = await Document.findOne({ document_id: req.params.docId });
  res.json({ docs });
  next();
}


/**
 * Req
 * @param content
 * @param document_id
 */
const updateContent = async (req, res) => {

  //const { documentId: docId, contentData: content } = req.body
  const content = req.body.content;
  const docId = req.body.docId;

  //const doc = await Document.findOneAndUpdate({ document_id : docId }, { content });
  const doc = await Document.findOneAndUpdate({ document_id: docId }, { content });

  // const doc = await Document.findOne({ document_id: docid });
  res.json({ doc });

}

/**
 * Req
 * @param document_id
 */

const updateSummary = async (req, res) => {

  const { documentId: docId } = req.body;
  const docContent = await Document.findOne({ document_id: docId }, 'content');

  const updatedSummary = await useOpenAi(docContent.content);

  console.log(updatedSummary)

  await Document.findOneAndUpdate({ document_id: docId }, { summary: updatedSummary });

  // Output is a list of bullet points
  res.json({ summary: updatedSummary });
  // return res.json({ summary: updatedSummary });

}

export default { getDocument, updateContent, updateSummary };
