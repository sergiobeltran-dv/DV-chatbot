import { a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  // Main chat conversation route
  chatAssistant: a.conversation({
    aiModel: a.ai.model('Claude 3.5 Sonnet'),
    systemPrompt: `You are Datavail AI, a helpful assistant that specializes in providing technical and business solutions. 
    You should:
    - Be professional and courteous
    - Provide detailed, accurate responses
    - Use markdown formatting for better readability
    - Include code examples when relevant
    - Break down complex topics into understandable parts`,
  }).authorization((allow) => allow.owner()),

  // File analysis route for handling document queries
  analyzeDocument: a.generation({
    aiModel: a.ai.model('Claude 3.5 Sonnet'),
    systemPrompt: 'You are a document analysis assistant. Extract and analyze the content of provided documents.',
  })
  .arguments({
    content: a.string(),
    fileType: a.string(),
  })
  .returns(
    a.customType({
      summary: a.string(),
      keyPoints: a.string().array(),
      suggestedActions: a.string().array(),
    })
  )
  .authorization((allow) => allow.authenticated()),
});

export type Schema = typeof schema;
export const handler = defineData({ schema });
