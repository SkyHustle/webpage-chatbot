"use client";

import { FC } from "react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./ui/accordion";

const Chat: FC = () => {
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
                                    <div className="flex gap-1.5 items-center">
                                        <p className="w-2 h-2 rounded-full bg-green-500" />
                                        <p className="font-medium">
                                            Support Bot
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col h-80">
                                Chat Messages <br /> Chat Input
                            </div>
                        </AccordionContent>
                    </div>
                </div>
            </AccordionItem>
        </Accordion>
    );
};

export default Chat;
