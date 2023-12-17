import { MessageArraySchema } from "@/lib/validators/message";
import {
    ChatGPTMessage,
    OpenAiStreamPayload,
    OpenAIStream,
} from "@/lib/openai-stream";
import { chatbotPrompt } from "@/helpers/constants/chatbot-prompt";

export async function POST(req: Request) {
    // get messages from request body
    const { messages } = await req.json();

    // validate messages array using zod
    const parsedMessages = MessageArraySchema.parse(messages);

    const outboundMessages: ChatGPTMessage[] = parsedMessages.map(
        (message) => ({
            role: message.isUserMessage ? "user" : "system",
            content: message.text,
        })
    );

    // add system prompt to outbound messages
    outboundMessages.unshift({
        role: "system",
        content: chatbotPrompt,
    });

    // create payload for openai
    const payload: OpenAiStreamPayload = {
        messages: outboundMessages,
        model: "gpt-3.5-turbo",
        stream: true,
    };

    // create readable stream
    const stream = await OpenAIStream(payload);

    return new Response(stream);
}
