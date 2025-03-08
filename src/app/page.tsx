import { getPokemonData } from "@/lib";
import { Search } from "./_components/Search";
import { PokemonList } from "./_components/PokemonList";

export default async function Page({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const value = await searchParams;
  const search = value.search ?? "";
  const pokemonData = await getPokemonData(search);
  return (
    <div className="h-[100vh] bg-white">
      <h1 className="w-full text-center p-4 font-bold text-3xl">
        NextPokéDex: Your Next.js Pokémon Explorer
      </h1>
      <main className="mx-auto flex h-[90vh] max-w-2xl flex-col gap-4 py-4">
        <Search defaultValue={search} />
        <PokemonList data={pokemonData} />
      </main>
    </div>
  );
}
