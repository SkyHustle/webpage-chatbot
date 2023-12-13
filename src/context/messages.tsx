import { Message } from "@/lib/validators/message";
import { nanoid } from "nanoid";
import { ReactNode, createContext, useState } from "react";

export const MessagesContext = createContext<{
    messages: Message[];
    isMessageUpdating: boolean;
    setIsMessageUpdating: (isUpdating: boolean) => void;
    addMessage: (message: Message) => void;
    removeMessage: (id: string) => void;
    updateMessage: (id: string, updateFn: (prevText: string) => string) => void;
}>({
    messages: [],
    isMessageUpdating: false,
    setIsMessageUpdating: () => {},
    addMessage: () => {},
    removeMessage: () => {},
    updateMessage: () => {},
});

export function MessagesProvider({ children }: { children: ReactNode }) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: nanoid(),
            text: "Howdy! How can I help you?",
            isUserMessage: false,
        },
    ]);
    const [isMessageUpdating, setIsMessageUpdating] = useState<boolean>(false);

    const addMessage = (message: Message) => {
        setMessages((prev) => [...prev, message]);
    };

    const removeMessage = (id: string) => {
        setMessages((prev) => prev.filter((message) => message.id !== id));
    };

    const updateMessage = (
        id: string,
        updateFn: (prevText: string) => string
    ) => {
        setMessages((prev) =>
            prev.map((message) => {
                if (message.id === id) {
                    return { ...message, text: updateFn(message.text) };
                }
                return message;
            })
        );
    };

    return (
        <MessagesContext.Provider
            value={{
                messages,
                isMessageUpdating,
                setIsMessageUpdating,
                addMessage,
                removeMessage,
                updateMessage,
            }}
        >
            {children}
        </MessagesContext.Provider>
    );
}
