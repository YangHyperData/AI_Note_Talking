

import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";

export const ingest = action({
    args: {
        splitText: v.array(v.string()), 
        fileId: v.string()
    },
    handler: async (ctx, args) => {
        // Process embedding with strings only
        await ConvexVectorStore.fromTexts(
            args.splitText, 
            args.fileId, 
            new GoogleGenerativeAIEmbeddings({
                apiKey: 'AIzaSyDPSqwsrdtBmwgl8pVIevjqCaO4OIE2YIs',
                model: "text-embedding-004",
                taskType: TaskType.RETRIEVAL_DOCUMENT,
                title: "Document title",
            }),
            { ctx }
        );
        return "Completed...";
    },
});