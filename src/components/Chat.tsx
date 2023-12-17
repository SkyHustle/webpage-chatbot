"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./ui/accordion";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

const Chat = () => {
    return (
        <Accordion
            type="single"
            collapsible
            className="relative bg-white z-40 shadow"
        >
            <AccordionItem value="item-1">
                <div className="fixed right-8 w-80 bottom-8 bg-white border border-gray-200 rounded-md overflow-hidden">
                    <div className="w-full h-full flex flex-col">
                        <AccordionTrigger className="px-6 border-b border-zinc-300">
                            <div className="w-full flex gap-3 justify-start items-center text-zinc-800">
                                <div className="flex flex-col items-start text-sm">
                                    <p className="text-xs">Chat with</p>

                                    <div className="relative inline-flex">
                                        <p className="inline-flex items-center px-4 py-2 text-sm leading-6  transition duration-150 ease-in-out">
                                            Support Bot
                                        </p>
                                        <span className="absolute left-0 top-5 -mr-1 -mt-1 flex h-2 w-2">
                                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col h-80">
                                <ChatMessages className="px-2 py-3 flex-1" />
                                <ChatInput />
                            </div>
                        </AccordionContent>
                    </div>
                </div>
            </AccordionItem>
        </Accordion>
    );
};

export default Chat;
