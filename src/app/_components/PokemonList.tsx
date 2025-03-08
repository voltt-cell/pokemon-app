import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon, SearchIcon } from "lucide-react";

interface PokemonProps {
  pokemon: { name: string };
  image: string;
}

export function PokemonList({ data }: { data: PokemonProps[] }) {
  return (
    <>
      <ul className="h-full max-h-full flex flex-col gap-4 p-4 overflow-auto border border-gray-100 bg-white shadow-sm  sm:rounded-xl">
        {data?.length > 0 ? (
          data?.map((pokemon: PokemonProps, index: number) => {
            return (
              <li key={index}>
                <Link
                  href={`/pokemon/${pokemon?.pokemon?.name}`}
                  className="hover:bg-gray-100 rounded-md shadow-md dark:hover:bg-gray-300 flex justify-between gap-x-6 px-4 py-5 sm:px-6"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      className={`bg-gray-200 h-12 w-12 rounded-full `}
                      src={pokemon?.image}
                      height={48}
                      width={48}
                      alt=""
                      unoptimized
                    />
                    <p className="text-slate-12 text-sm font-semibold capitalize flex leading-6">
                      {pokemon?.pokemon?.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-x-4">
                    <ChevronRightIcon
                      className="text-slate-11 h-5 w-5 flex-none"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              </li>
            );
          })
        ) : (
          <li className="flex h-full flex-col items-center justify-center">
            <SearchIcon
              className="text-gray-11 mx-auto h-12 w-12"
              aria-hidden="true"
            />
            <h3 className="text-gray-12 mt-2 text-sm font-semibold">
              No Pokémon
            </h3>
          </li>
        )}
      </ul>
    </>
  );
}
