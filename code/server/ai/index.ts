const dotenv = require("dotenv")
dotenv.config()

const { OpenAI } = require("langchain/llms/openai")
const { PromptTemplate } = require("langchain/prompts")

const llm = new OpenAI({
  openAIApiKey: process.env.OPENAI_KEY,
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

console.log(formattedPrompt)

const llmResult = await llm.call(formattedPrompt, { timeout: 1000 })

console.log(llmResult)
