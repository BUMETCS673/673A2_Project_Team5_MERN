const Document = require('../model/document')
const summarise = require('../ai/ai')

/**
 * Req
 * @param document_id
 */

module.exports.getDocument = async (req, res) => {
  try {
    const docs = await Document.findOne({ document_id: req.params.docId });
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
    //const { content, document_id: docId } = req
    const docid = req.params.docId;
    const newContent = req.body.content;

    await Document.findOneAndUpdate({ document_id: docid }, { content: newContent });

    const doc = await Document.findOne({ document_id: docid });
    res.json({ doc });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Unable to undate content" });
  }
}

/**
 * Req
 * @param document_id
 */

module.exports.updateSummary = async (req, res) => {
  try {
    const { document_id: docId } = req
    let updatedSummary

    await Document.findById(docId, 'content', (err, doc) => {
      if (err) {
        // Handle the error here
        res.send(err);
      } else if (doc) {
        const { content } = doc;
        updatedSummary = summarise(content)
      } else {
        res.send('Document not found');
      }
    })

    await Document.findByIdAndUpdate(docId, { summary: updatedSummary })

    res.send('Summary updated!');
    return res.json({ summary: updatedSummary })
  } catch (err) {
    return res.json({ error: err })
  }
}
