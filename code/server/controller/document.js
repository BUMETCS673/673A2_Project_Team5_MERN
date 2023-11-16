// const Document = require('../model/document');
// const useOpenAi = require('../ai/ai');

import Document from '../model/document.js';
import useOpenAi from '../ai/ai.js';

/**
 * Req
 * @param document_id
 */
const getDocument = async (req, res) => {
  try {
    const docs = await Document.findOne({ document_id: req.params.docId });
    res.json({ docs });
  } catch (err) {
    console.log(err);
    return res.json({ error: 'Error occur! Unable to get user.' });
  }
}


/**
 * Req
 * @param content
 * @param document_id
 */
const updateContent = async (req, res) => {
  try {
    //const { documentId: docId, contentData: content } = req.body
    const content = req.body.content;
    const docId = req.body.docId;

    //const doc = await Document.findOneAndUpdate({ document_id : docId }, { content });
    const doc = await Document.findOneAndUpdate({ document_id: docId }, { content });

    // const doc = await Document.findOne({ document_id: docid });
    res.json({ doc });
  } catch (err) {
    console.log(err);
    return res.json({ error: 'Unable to undate content' });
  }
}

/**
 * Req
 * @param document_id
 */

const updateSummary = async (req, res) => {
  try {
    const { documentId: docId } = req.body;
    const docContent = await Document.findOne({ document_id: docId }, 'content');

    const updatedSummary = await useOpenAi(docContent.content);

    await Document.findOneAndUpdate({ document_id: docId }, { summary: updatedSummary });

    // Split the text into bullet points
    const bulletPoints = updatedSummary.match(/• (.*?)\n/g).map((bullet) => bullet.replace(/• /, '').trim());

    // Output is a list of bullet points
    res.json({ summary: bulletPoints });
    // return res.json({ summary: updatedSummary });
  } catch (err) {
    return res.json({ error: err });
  }
}

export default { getDocument, updateContent, updateSummary };
