// const OpenAI = require('langchain/llms/openai')
// const PromptTemplate = require('langchain/prompts')
// const dotenv = require('dotenv')

import { OpenAI } from "langchain/llms/openai"
import { PromptTemplate } from "langchain/prompts"
import { LLMChain } from 'langchain/chains'
import * as dotenv from 'dotenv';

dotenv.config()

const assistantTemplate = 'You are a helpful study assistant that summarises {notes} into a summary of bullet points.'

const apiKey = process.env.OPENAI_API_KEY

const useOpenAi = async (input) => {

  const model = new OpenAI({
    openAIApiKey: apiKey,
    temperature: 0,
    maxRetries: 10,
  })

  // Prompting
  const promptTemplate = new PromptTemplate({
    inputVariables: ['notes'],
    template: assistantTemplate,
  })

  const chain = new LLMChain({
    llm: model,
    prompt: promptTemplate,
  })

  const res = await chain.call({
    notes: input
  })

  // Remove unnecessary line breaks and leading/trailing whitespace
  const formattedText = res.text.trim();

  // Remove the leading '\n' and '+' characters
  const cleanedText = formattedText.replace(/^n+/, '');

  return cleanedText
}

export default useOpenAi;
