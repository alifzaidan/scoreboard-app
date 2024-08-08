'use client';

import useSWR from 'swr';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function Player() {
    const { data, error } = useSWR('http://localhost:3000/api/score', fetcher, { refreshInterval: 1000 });

    if (error) return <div>Failed to load score</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div>
            <h1>Tim A: {data.scoreA}</h1>
            <h1>Tim B: {data.scoreB}</h1>
        </div>
    );
}
