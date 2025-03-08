import { SinglePokemonCard } from "../../_components/SinglePokemonCard";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  return <SinglePokemonCard name={id} />;
}
