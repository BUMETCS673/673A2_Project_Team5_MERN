import { OpenAI } from "langchain/llms/openai"
import { PromptTemplate } from "langchain/prompts"
import * as dotenv from "dotenv"

dotenv.config()

const llm = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
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
  notes: "a statistics course about linear regression",
})

console.log(formattedPrompt)

const llmResult = await llm.call(formattedPrompt)

console.log(llmResult)
