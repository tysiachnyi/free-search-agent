# LangGraph Manual Agent

This project is a Node.js agent that combines a local LLM (Ollama) with web search capabilities (Tavily) using LangChain and LangGraph tools.

## Features

- Uses Ollama for local, private language model inference
- Automatically rewrites user queries for optimal web search
- Fetches relevant web results using Tavily
- Combines search results and LLM reasoning for better answers
- Interactive terminal interface
- API keys managed securely with dotenv

## How It Works

1. User enters a question in the terminal
2. Ollama rewrites the question to a concise search request
3. Tavily performs a web search using the rewritten request
4. Search results are combined with the original question
5. Ollama generates a final answer using both the search results and the question

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Create a `.env` file in the project root:
   ```
   TAVILY_API_KEY=your-tavily-api-key-here
   ```
3. Make sure you have Ollama installed and running locally

## Usage

Run the agent:

```sh
npx tsx agent.mts
```

Type your question when prompted.

## Example

```
Ask me anything: Who is the president of France?
Updated search request: "president France"
Searching for: "president France"
... (search results and answer)
```

## Technologies

- Node.js
- LangChain
- Ollama
- Tavily
- dotenv

## License

MIT
