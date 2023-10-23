import { OpenAI } from "langchain/llms/openai"
import { PromptTemplate } from "langchain/prompts"

const llm = new OpenAI({
    openAIApiKey: "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",
    // temperature: 0,
    maxRetries: 10,
})

// Prompting
const prompt = new PromptTemplate({
    inputVariables: ["notes"],
    template:
        "You are a helpful study assistant that summarises {notes} into a summary of bullet points.",
})

const formattedPrompt = await prompt.format({
    // notes is received from the input in frontend
    // notes: getNotesContent,
    notes: "",
})

module.exports.summary = async (req, res) => {
    const note = req.body.note;
    const llmResult = await llm.call(note, { timeout: 1000 })
    res.json({ outcome: llmResult })
}

console.log(formattedPrompt)


