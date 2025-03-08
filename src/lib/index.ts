export async function getPokemonData(search:string) {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=1000`
    );
    if (!res.ok) {
        throw new Error("Failed to fetch data!");
      }
    
    const jsonResponse=await res.json()
    
    const completeData=jsonResponse.results?.map((pokemon:{name:string},index:number)=>{
        const id=('00' +(index+1)).slice(-3)
        const image=`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png`
        return {pokemon,image}
    })
    const searchFilter = (pokemonList:{pokemon:{name:string}}[]) => {
      return pokemonList.filter(
          (pokemon: any) => pokemon?.pokemon?.name.toLowerCase().includes(search.toLowerCase())
      )
  }
  const filteredPokemonList = search===''? completeData: searchFilter(completeData);
    return filteredPokemonList
  }


  export async function getPokemonDataByName(name:string) {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    if (!res.ok) {
        throw new Error("Failed to fetch data!");
      }
    
    return await res.json()
    
  }