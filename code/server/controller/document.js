const Document = require('../model/document')
const useOpenAi = require('../ai/ai')

/**
 * Req
 * @param document_id
 */

module.exports.getDocument = async (req, res) => {
  try {
    const docs = await Document.find({ document_id: req.params.docId });
    res.json({ docs });
  } catch (err) {
    console.log(err);
    return res.json({ error: 'Error occur! Unable to get user.' })
  }
}

/**
 * Req
 * @param content
 * @param document_id
 */

module.exports.updateContent = async (req, res) => {
  try {
    //const { documentId: docId, contentData: content } = req.body
    const content = req.body.content
    const docId = req.body.docId
    console.log('docId, content', docId, content)
    //const doc = await Document.findOneAndUpdate({ document_id : docId }, { content });
    const doc = await Document.findOneAndUpdate(docId, content );
    console.log(doc);

    res.send('Document content updated!');
  } catch (err) {
    return res.json({ error: err })
  }
}

/**
 * Req
 * @param document_id
 */

module.exports.updateSummary = async (req, res) => {
  try {
    const { documentId: docId } = req.body
    let updatedSummary = ""

    const docContent = await Document.findOne({ document_id : docId }, 'content')
    console.log('docContent', docContent)

    updatedSummary = await useOpenAi(docContent.content)
    // (err, doc) => {
    //   console.log("im here")
    //   if (err) {
    //     // Handle the error here
    //     res.send(err);
    //   } else if (doc) {
    //     console.log('doc', doc)
    //     const { content } = doc;
    //     updatedSummary = summarise(content)
    //     console.log('updatedSummary', updatedSummary)
    //   } else {
    //     res.send('Document not found');
    //   }
    // }

    console.log('updatedSummary', updatedSummary)

    await Document.findOneAndUpdate({ document_id : docId }, { summary: updatedSummary })

    res.send('Summary updated!');
    return res.json({ summary: updatedSummary })
  } catch (err) {
    return res.json({ error: err })
  }
}
