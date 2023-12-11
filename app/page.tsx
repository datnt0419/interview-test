'use client';

import { DatasetView } from './components';
import { QueryGenerationProvider } from './contexts';

export default function Home() {
  return (
    <QueryGenerationProvider>
      <main className=" flex h-screen flex-col items-center justify-center space-y-8   overflow-hidden  bg-gradient-to-r from-[#8EC5FC] to-[#E0C3FC]  p-24">
        <h1 className="text-2xl font-semibold">Generate SQL Query</h1>

        <DatasetView />
      </main>
    </QueryGenerationProvider>
  );
}
