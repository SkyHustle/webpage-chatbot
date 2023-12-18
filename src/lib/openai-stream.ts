import {
    ParsedEvent,
    ReconnectInterval,
    createParser,
} from "eventsource-parser";

export type ChatGPTAgent = "user" | "system";

export interface ChatGPTMessage {
    role: ChatGPTAgent;
    content: string;
}

export interface OpenAiStreamPayload {
    messages: ChatGPTMessage[]; // Required
    model: string; // Required
    // frequency_penalty: number; // Optional, default: 0
    // logit_bias: null; // Optional, default: null
    // logprobs: boolean; // Optional, default: false
    // top_logprobs: number; // Optional
    // max_tokens: number; // Optional
    // n: number; // Optional, default: 1
    // presence_penalty: number; // Optional, default: 0
    // response_format: object; // Optional
    // seed: number; // Optional
    // stop: string | string[]; // Optional, default: null
    stream: boolean; // Optional, default: false
    // temperature: number; // Optional, default: 1
    // top_p: number; // Optional, default: 1
    // tools: string[]; // Optional
    // tool_choice: string | object; // Optional
    // user: string; // Optional
}

// Crux of application
export async function OpenAIStream(payload: OpenAiStreamPayload) {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    // let counter = 0;

    const stream = new ReadableStream({
        async start(controller) {
            function onParse(event: ParsedEvent | ReconnectInterval) {
                if (event.type === "event") {
                    const data = event.data;

                    if (data === "[DONE]") {
                        controller.close();
                        return;
                    }
                    try {
                        // data to text logic
                        const json = JSON.parse(data);
                        console.log("JSON \n", json);
                        const text = json.choices[0].delta?.content || "";
                        console.log("TEXT \n", text);

                        // if (counter < 2 && (text.match(/\n/) || []).length) {
                        //     return;
                        // }
                        const queue = encoder.encode(text);
                        console.log("QUEUE \n", queue);
                        controller.enqueue(queue);
                        // counter++;
                    } catch (error) {
                        controller.error(error);
                    }
                }
            }
            const parser = createParser(onParse);
            for await (const chunk of res.body as any) {
                parser.feed(decoder.decode(chunk));
            }
        },
    });

    return stream;
}
