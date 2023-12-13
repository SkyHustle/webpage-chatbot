import { FC, HTMLAttributes } from "react";

// allows us to pass any prop that a normal div would take
interface ChatMessagesProps extends HTMLAttributes<HTMLDivElement> {}

const ChatMessages: FC<ChatMessagesProps> = ({ className, ...props }) => {
    return <div {...props}>ChatMessages</div>;
};

export default ChatMessages;
