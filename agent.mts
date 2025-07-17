import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { RunnableSequence } from "@langchain/core/runnables";
import { Ollama } from "@langchain/ollama";
import readline from "readline";
import "dotenv/config";

const tavily = new TavilySearchResults({
  maxResults: 3,
  apiKey: process.env.TAVILY_API_KEY,
});
const ollama = new Ollama({ model: "llama3.2", temperature: 0.8 });

const chain = RunnableSequence.from([
  // Step 1: Prepare search request
  async (query: string) => {
    const searchRequest = await ollama.invoke(
      `Rewrite the following user query to create a concise, highly relevant search request for a web search. 
      - Make the search request as short and specific as possible.
      - Focus only on the key information needed to get the best search results.
      - Do not include the original query, explanations, or any extra context.
      - Return only the improved search request, nothing else.

      Example:
      User query: "What is the weather in San Francisco?"
      Search request: "weather San Francisco"

      User query: "${query}"
      `
    );
    console.log(`Updated search request: ${searchRequest}`);
    return searchRequest;
  },
  // Step 2: Get search results
  async (query: string) => {
    console.log(`Searching for: ${query}`);
    const searchResults = await tavily.call(query);
    return { query, searchResults };
  },
  // Step 3: Format prompt
  ({ query, searchResults }) => {
    return `Search results for "${query}":\n${JSON.stringify(
      searchResults,
      null,
      2
    )}\n\nAnswer the user's question using the search results above.`;
  },
  // Step 4: Call Ollama
  async (prompt: string) => await ollama.invoke(prompt),
]);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Ask me anything: ", async (userInput) => {
  const result = await chain.invoke(userInput);
  console.log(result);

  rl.close();
});
