import { MessageArraySchema } from "@/lib/validators/message";

export async function POST(req: Request) {
    const { messages } = await req.json();

    const parsedMessages = MessageArraySchema.parse(messages);
}
