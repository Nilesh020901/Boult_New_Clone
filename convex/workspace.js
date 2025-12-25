import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const CreateWorkspace = mutation({
  args: {
    message: v.any(),
    fileData: v.optional(v.any()),
    user: v.id("users"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("workspace", {
      message: args.message,
      fileData: args.fileData,
      user: args.user,
    });
    return result;
  },
});

export const GetWorkspace = query({
  args: {
    workspaceId: v.id('workspace')
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.get(args.workspaceId);
    return result;
  }
})