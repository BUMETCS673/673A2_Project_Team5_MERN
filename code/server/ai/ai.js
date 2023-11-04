const OpenAI = require('langchain/llms/openai')
const PromptTemplate = require('langchain/prompts')
const dotenv = require('dotenv')

// import { OpenAI } from "langchain/llms/openai"
// import { PromptTemplate } from "langchain/prompts"
// import * as dotenv from "dotenv"

dotenv.config()

module.exports.useOpenAi = (input) => {
  const llm = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    // temperature: 0,
    maxRetries: 10,
  })

  // Prompting
  const prompt = new PromptTemplate({
    inputVariables: ['notes'],
    template:
      'You are a helpful study assistant that summarises {notes} into a summary of bullet points.',
  })

  const formattedPrompt = prompt.format({
    // notes is received from the input in frontend
    // notes: getNotesContent,
    notes: input,
  })

  // console.log(formattedPrompt)

  const llmResult = llm.call(formattedPrompt)

  return llmResult
}
