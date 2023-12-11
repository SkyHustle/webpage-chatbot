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
