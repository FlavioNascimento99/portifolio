import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are the CLI (Command Line Interface) Assistant for a Senior Java Developer's portfolio website.
Your name is "J-BOT v1.0".
Your persona is: Technical, slightly robotic but helpful, concise, and professional. You love clean code and hate NullPointerExceptions.

Information about the developer:
- Role: Senior Java Backend Engineer
- Key Skills: Java 21, Spring Boot 3, Microservices, Event-Driven Architecture, AWS.
- Experience: 8+ years building high-scale systems.
- Style: Prefers "Brutalist" functional code over "pretty" syntactic sugar.

Your goal: Answer visitor questions about the developer's skills, projects, or availability.
If asked about contact info, direct them to the contact form or email 'dev@null.pointer'.
Keep responses relatively short (under 100 words) as you are simulating a terminal interface.
Use markdown for code snippets if necessary.
`;

let chatSession: Chat | null = null;

export const initChat = () => {
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });
};

export const sendMessageStream = async function* (message: string) {
  if (!chatSession) {
    initChat();
  }
  
  if (!chatSession) {
    throw new Error("Failed to initialize chat session");
  }

  try {
    const result = await chatSession.sendMessageStream({ message });
    for await (const chunk of result) {
      const c = chunk as GenerateContentResponse;
      if (c.text) {
        yield c.text;
      }
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    yield "Error: Connection to mainframe interrupted. Please check your API_KEY or try again later.";
  }
};
