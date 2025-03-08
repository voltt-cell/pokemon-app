"use client";

import { useRouter } from "next/navigation";
import { useTransition, useState } from "react";
import { XCircleIcon } from "lucide-react";

export function Search({ defaultValue }: { defaultValue: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState(defaultValue);

  function handleSearch(term: string) {
    setSearchTerm(term);
    const params = new URLSearchParams(window.location.search);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    startTransition(() => {
      router.replace(`/?${params.toString()}`);
    });
  }

  function clearSearch() {
    setSearchTerm("");
    handleSearch("");
  }

  return (
    <div className="relative">
      <input
        type="text"
        name="search"
        id="search"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        className="block w-full rounded-full border-0 bg-white/90 py-4 pl-12 pr-12 text-gray-900 shadow-lg ring-1 ring-inset ring-white/40 placeholder:text-gray-400 focus:ring-2 focus:ring-red-500 text-base transition-all duration-300 focus:shadow-red-500/20"
        placeholder="Search for a Pokémon..."
        autoComplete="off"
      />
      {searchTerm && (
        <button
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-red-500 transition-colors"
        >
          <XCircleIcon className="h-5 w-5" />
        </button>
      )}
      {isPending && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-4">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-red-500"></div>
        </div>
      )}
    </div>
  );
}
