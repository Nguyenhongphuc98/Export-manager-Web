
import fetch from 'node-fetch';
import { NextResponse } from "next/server";

export async function GET(req) {
  return defaultHandle(req);
}

export async function POST(req) {
  return defaultHandle(req);
}


async function defaultHandle(req) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;

  try {
    const targetUrl = searchParams.get('o');

    // Forward the request to the target URL
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: req.headers,
      body: req.method === 'POST' ? req.body : undefined,
    });

    // console.log('aaa', targetUrl, response);

    // Forward the response from the target URL to the client
    const data = await response.json();

    // Set the appropriate response headers
    return NextResponse.json(data, {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error in proxy handler:', error);
    return NextResponse.json('Internal Server Error', {
      status: 500
    });
  }
}