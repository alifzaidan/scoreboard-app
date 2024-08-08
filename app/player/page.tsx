'use client';

import { useEffect, useState } from 'react';
import useSWR from 'swr';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function Player() {
    const { data, error } = useSWR('http://localhost:3000/api/score', fetcher, { refreshInterval: 1000 });

    const [timer, setTimer] = useState(0);

    useEffect(() => {
        if (data?.timer > 0) {
            setTimer(data.timer);
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [data]);

    if (error) return <div>Failed to load score</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div>
            <h1>Tim A: {data.scoreA}</h1>
            <h1>Tim B: {data.scoreB}</h1>
            <h2>Timer: {timer > 0 ? timer : "Time's up!"}</h2>
        </div>
    );
}
