import { getPokemonDataByName } from "@/lib";
import Image from "next/image";

type Statistic =
  | "hp"
  | "attack"
  | "defense"
  | "special-attack"
  | "special-defense"
  | "speed";

const StatisticMap: Record<Statistic, { label: string; className: string }> = {
  hp: {
    label: "HP",
    className: "bg-red-600 border-red-600",
  },
  attack: {
    label: "Attack",
    className: "bg-orange-600 border-orange-600",
  },
  defense: {
    label: "Defense",
    className: "bg-yellow-600 border-yellow-600",
  },
  "special-attack": {
    label: "Special attack",
    className: "bg-blue-600 border-blue-600",
  },
  "special-defense": {
    label: "Special defense",
    className: "bg-green-600 border-green-600",
  },
  speed: {
    label: "Speed",
    className: "bg-pink-600 border-pink-600",
  },
};

const StatisticBar = ({
  statistic,
  value,
}: {
  statistic: Statistic;
  value: number;
}) => {
  return (
    <div className="flex items-center text-sm">
      <dt className="flex flex-1 items-center">
        <p className="text-gray-12 w-[110px] font-medium">
          {StatisticMap[statistic].label}
        </p>
        <div className="ml-1 flex flex-1 items-center">
          <div className="relative ml-3 flex-1">
            <div className="border-gray-200 bg-gray-200 h-3 rounded-full border" />
            {value > 0 ? (
              <div
                className={`absolute inset-y-0 rounded-full border ${StatisticMap[statistic].className}`}
                style={{ width: `calc(${value} / ${MAX_VALUE} * 100%)` }}
              />
            ) : null}
          </div>
        </div>
      </dt>
      <dd className="text-gray-600 ml-1 w-10 text-right text-sm tabular-nums">
        {value}
      </dd>
    </div>
  );
};

const MAX_VALUE = 255;

interface PokemonProps {
  name: string;
}

export async function SinglePokemonCard({ name }: PokemonProps) {
  const pokemon = await getPokemonDataByName(name);

  if (!pokemon) {
    return null;
  }

  return (
    <div>
      <h1 className="w-full text-center p-4 font-bold text-3xl">
        Pokémon Profile
      </h1>
      <div className="flex w-full mx-auto max-w-2xl gap-4 p-4 flex-col mt-5 border-gray-200 border rounded-md shadow-md">
        <div className="flex flex-col items-center gap-4">
          <Image
            className="h-[200px] w-[200px]"
            src={pokemon?.sprites?.other["official-artwork"]?.front_default}
            height={200}
            width={200}
            alt=""
            unoptimized
          />
          <div className="flex-col">
            <div className="flex items-center gap-2 leading-5">
              <p className="text-slate-12 text-sm font-semibold capitalize leading-6">
                {pokemon.name}
              </p>
              <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                <circle cx={1} cy={1} r={1} />
              </svg>
              <p className="text-gray-11 text-xs">{pokemon?.weight} kg</p>
              <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                <circle cx={1} cy={1} r={1} />
              </svg>
              <p className="text-gray-11 text-xs">{pokemon?.height * 10} cm</p>
            </div>
            <div className="mt-2 flex gap-x-2">
              {pokemon?.types.map(
                (type: { type: { name: string } }, index: number) => {
                  return (
                    <div
                      key={index}
                      className="text-xs border capitalize  bg-gray-100 rounded-2xl px-2"
                    >
                      {type?.type?.name}
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
        <dl className="space-y-3">
          {pokemon?.stats?.map(
            (
              stat: { base_stat: number; stat: { name: Statistic } },
              index: number
            ) => {
              return (
                <StatisticBar
                  key={index}
                  statistic={stat?.stat?.name}
                  value={stat?.base_stat}
                />
              );
            }
          )}
        </dl>
      </div>
    </div>
  );
}
