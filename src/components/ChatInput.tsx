import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { FC, HTMLAttributes, useContext, useState, useRef } from "react";
import TextAreaAutosize from "react-textarea-autosize";
import { nanoid } from "nanoid";
import { Message } from "@/lib/validators/message";
import { MessagesContext } from "@/context/messages";

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {}

const ChatInput: FC<ChatInputProps> = ({ className, ...props }) => {
    const [input, setInput] = useState<string>("");
    const {
        messages,
        addMessage,
        removeMessage,
        updateMessage,
        setIsMessageUpdating,
    } = useContext(MessagesContext);

    // const textareaRef = useRef<null | HTMLTextAreaElement>(null);

    const { mutate: sendMessage, isPending } = useMutation({
        mutationFn: async (message: Message) => {
            const response = await fetch("/api/message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ messages: [message] }),
            });
            return response.body;
        },
        // optimistic update to messages area
        onMutate(message) {
            addMessage(message);
        },
        onSuccess: async (stream) => {
            if (!stream) throw new Error("No stream found");
            console.log("success");

            const id = nanoid();
            const responseMessage: Message = {
                id,
                isUserMessage: false,
                text: "",
            };

            addMessage(responseMessage);
            setIsMessageUpdating(true);

            const reader = stream.getReader();
            const decoder = new TextDecoder();
            let done = false;

            while (!done) {
                const { value, done: doneReading } = await reader.read();
                done = doneReading;
                const chunkValue = decoder.decode(value);
                console.log(chunkValue);
                updateMessage(id, (prev) => prev + chunkValue);
            }
            // clean up
            setIsMessageUpdating(false);
            setInput("");
            // textareaRef.current?.focus();

            // setTimeout(() => {
            //     textareaRef.current?.focus()
            // }, 10)
        },
    });

    return (
        <div {...props} className={cn("border-t border-zinc-300", className)}>
            <div className="relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none">
                <TextAreaAutosize
                    // ref={textareaRef}
                    minRows={1}
                    maxRows={4}
                    autoFocus
                    placeholder="Type a message"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            const message = {
                                id: nanoid(),
                                isUserMessage: true,
                                text: input,
                            };
                            sendMessage(message);
                        }
                    }}
                    className="peer disabled:opacity-50 pr-14 resize-none block w-full border-0 bg-zinc-100 py-1.5 text-gray-900 focus:ring-0 text-sm sm:leading-6"
                />
            </div>
        </div>
    );
};

export default ChatInput;
