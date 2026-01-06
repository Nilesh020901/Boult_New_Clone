import { NextResponse } from "next/server";
import { chatSession } from "@/config/AIModel";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const result = await chatSession.sendMessage(prompt);
    const AIResp = result.response.text();

    return NextResponse.json({ result: AIResp });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message });
  }
}
