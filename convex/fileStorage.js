import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});

export const AddFileEntryToDb = mutation({
    args: {
        fileId: v.string(),
        storageId: v.string(),
        fileName: v.string(),
        createBy: v.string(),
        fileUrl:v.string()
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.insert('pfdFiles', {
            fileId: args.fileId,
            fileName: args.fileName,
            storageId: args.storageId,
            fileUrl:args.fileUrl,
            createBy: args.createBy
        })
        return 'Inserted'
    }
})

export const getFileUrl = mutation({
    args: {
        storageId: v.string(),
    },
    handler: async (ctx,args) => {
        const url = await ctx.storage.getUrl(args.storageId);
        return url;
    }
})