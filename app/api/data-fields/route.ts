import Error from 'next/error';
import { NextRequest, NextResponse } from 'next/server';

function generateData(dataset: string) {
  return [...Array(10)].map((_, index) => {
    return {
      label: `${dataset}_${index + 1}`,
      value: `${dataset}_${index + 1}`,
    };
  });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const dataset = searchParams.get('dataset');
  const type = searchParams.get('type');

  if (!dataset) {
    return new Response('Invalid dataset', {
      status: 500,
    });
  }

  const data = generateData(dataset);
  const response = type === 'all' ? data : data.slice(0, 3);

  return NextResponse.json(response);
}
