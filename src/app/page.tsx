"use client";

import React, { useState } from "react";
import Image from "next/image";
import InputFilter from "@/app/components/inputFilter";

const App: React.FC = () => {
  const [filter, setFilter] = useState("");

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="row-start-2 flex items-center gap-8 sm:items-start">
        <div className="flex">
          <div className="flex flex-col">
            <InputFilter
              label="Filter:"
              value={filter}
              onChange={handleFilterChange}
            />
            <p>Current Filter: {filter}</p>
          </div>
          <div className="flex flex-col">
            <InputFilter
              label="Filter:"
              value={filter}
              onChange={handleFilterChange}
            />

            <p>Current Filter: {filter}</p>
          </div>
          <div className="flex flex-col">
            <InputFilter
              label="Filter:"
              value={filter}
              onChange={handleFilterChange}
            />
            <p>Current Filter: {filter}</p>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
};

export default App;
