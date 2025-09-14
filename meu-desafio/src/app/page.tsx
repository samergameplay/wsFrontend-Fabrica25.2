// app/page.tsx ou pages/index.tsx
'use client'; // Adicione esta linha se estiver usando a App Router

import React, { useState, useEffect } from 'react';
import './styles.css'; // Importe seu CSS globalmente

// Interfaces e constantes fora do componente para não serem recriadas
interface Colors {
    fire: string;
    grass: string;
    electric: string;
    water: string;
    ground: string;
    rock: string;
    fairy: string;
    poison: string;
    bug: string;
    dragon: string;
    psychic: string;
    flying: string;
    fighting: string;
    normal: string;
}

const colors: Colors = {
    // ...seus códigos de cores aqui...
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
};

const mainTypes: string[] = Object.keys(colors);

interface PokemonType {
    type: {
        name: string;
    };
}

interface PokemonData {
    id: number;
    name: string;
    types: PokemonType[];
}

const Pokedex = () => {
    // 1. Crie um estado para armazenar os dados dos Pokémon
    const [pokemons, setPokemons] = useState<PokemonData[]>([]);

    const fetchPokemons = async () => {
        const fetchedPokemons: PokemonData[] = [];
        for (let i = 1; i <= 151; i++) {
            const data = await getPokemon(i);
            if (data) {
                fetchedPokemons.push(data);
            }
        }
        setPokemons(fetchedPokemons); // 3. Atualize o estado com os dados
    };

    const getPokemon = async (id: number): Promise<PokemonData | null> => {
        try {
            const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
            const resp = await fetch(url);
            if (!resp.ok) {
                throw new Error(`Failed to fetch Pokémon with ID: ${id}`);
            }
            return await resp.json();
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    // 2. Use useEffect para buscar os dados quando o componente for montado
    useEffect(() => {
        fetchPokemons();
    }, []);

    // 4. Renderize os Pokémon a partir do estado
    return (
        <div className="pokeContainer">
            {pokemons.map(poke => {
                const name = poke.name[0].toUpperCase() + poke.name.slice(1);
                const id = poke.id.toString().padStart(3, '0');
                const pokeTypes = poke.types.map(types => types.type.name);
                const type = mainTypes.find(t => pokeTypes.includes(t));
                const color = type ? colors[type as keyof Colors] : '#FFFFFF';

                return (
                    <div className="pokemon" key={poke.id} style={{ backgroundColor: color }}>
                        <div className="imgContainer">
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png`} alt={name} />
                        </div>
                        <div className="info">
                            <span className="number">#{id}</span>
                            <h3 className="name">{name}</h3>
                            <small className="type">Type: <span>{type || 'unknown'}</span></small>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Pokedex;