// Import the Pinecone library
const { Pinecone } = require('@pinecone-database/pinecone')

// Initialize a Pinecone client with your API key
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });


const chatGptIndex = pc.index("chat-gpt");

const createMemory = async ({ vector, metadata, messageId }) => {
    await chatGptIndex.upsert([
        {
            id: messageId,
            values: vector,
            metadata
        }
    ])

}

const queryMemory = async ({ queryvector, limit = 5, metadata }) => {
    const data = await chatGptIndex.query(
        {
            topK: limit,
            vector: queryvector,
            filter: metadata ? { metadata } : undefined,
            includeMetadata: true

        }
    )
    return data.matches

}

module.exports = {
    createMemory,
    queryMemory
}