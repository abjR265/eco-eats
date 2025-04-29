// src/app/api/food-news/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.NEWS_API_KEY; // store it in .env.local
  const url = `https://newsapi.org/v2/everything?q=food%20waste%20OR%20sustainability%20OR%20climate%20food&language=en&pageSize=5&sortBy=publishedAt&apiKey=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    return NextResponse.json({ articles: data.articles });
  } catch (error) {
    console.error('News fetch error:', error);
    return NextResponse.json({ articles: [] }, { status: 500 });
  }
}
