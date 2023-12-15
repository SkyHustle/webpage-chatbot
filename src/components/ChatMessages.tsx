import { MessagesContext } from "@/context/messages";
import { cn } from "@/lib/utils";
import { FC, HTMLAttributes, useContext } from "react";

// allows us to pass any prop that a normal div would take
interface ChatMessagesProps extends HTMLAttributes<HTMLDivElement> {}

const ChatMessages: FC<ChatMessagesProps> = ({ className, ...props }) => {
    const { messages } = useContext(MessagesContext);
    const inverseMessages = [...messages].reverse();

    return (
        <div
            {...props}
            className={cn(
                "flex flex-col-reverse gap-3 overflow-y-auto scrollbar-thumb-blue scorllbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch",
                className
            )}
        >
            <div className="flex-1 flex-grow" />
            {inverseMessages.map((message) => (
                <div key={message.id} id="chat-message">
                    <div
                        className={cn("flex items-end", {
                            // if user message, display on right hand side
                            "justify-end": message.isUserMessage,
                        })}
                    >
                        {/* overflow-x-hidden for long links not to mess up the chat display */}
                        {/* conditional classNames go inside the second argument as an object */}
                        <div
                            className={cn(
                                "flex flex-col space-y-2 text-sm max-w-xs mx-2 overflow-x-hidden",
                                {
                                    "bg-blue-600 text-white":
                                        message.isUserMessage,
                                    "bg-gray-200 text-gray-900":
                                        !message.isUserMessage,
                                }
                            )}
                        >
                            {message.text}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChatMessages;
