import fetch from "node-fetch";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;

  try {
    const targetUrl = searchParams.get("o") || "";

    // Forward the request to the target URL
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: req.headers,
    });

    console.log("aaa", targetUrl, req.body);

    // Forward the response from the target URL to the client
    const data = await response.json();

    // Set the appropriate response headers
    return NextResponse.json(data, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in proxy handler:", error);
    return NextResponse.json("Internal Server Error..", {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;

  try {
    const targetUrl = searchParams.get("o") || "";
    const text = await req.text();

    console.log("aaa", targetUrl, text);

    // Forward the request to the target URL
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: req.headers,
      body: req.method === "POST" ? text : undefined,
    });

    // Forward the response from the target URL to the client
    const data = await response.json();

    // Set the appropriate response headers
    return NextResponse.json(data, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in proxy handler:", error);
    return NextResponse.json("Internal Server Error..", {
      status: 500,
    });
  }
}
