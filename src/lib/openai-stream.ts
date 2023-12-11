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
    model: string;
    messages: ChatGPTMessage[];
    temperature: number; // creativity,
    top_p: number;
    frequency_penalty: number; // how often certain word will apear
    presence_penalty: number; // if words are already present in prompt, hight presence penalty(0-2) less likely to use those words
    max_tokens: number; // 1 token roughly equals 4 letters
    stream: boolean;
    n: number;
}

// Crux of application
export async function OpenAIStream(payload: OpenAiStreamPayload) {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    let counter = 0;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify(payload),
    });

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
                        console.log("json", json);
                        const text = json.choices[0].delta?.content || "";
                        console.log("text", text);

                        if (counter < 2 && (text.match(/\n/) || []).length) {
                            return;
                        }

                        const queue = encoder.encode(text);
                        controller.enqueue(queue);
                        counter++;
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
