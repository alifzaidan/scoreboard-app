'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function Player() {
    const [timer, setTimer] = useState(0);
    const { data, error } = useSWR('/api/quiz', fetcher, { refreshInterval: 1000 });

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
        <main className="flex flex-col space-y-8 container items-center lg:h-screen py-10 overflow-hidden">
            <nav className="w-full p-4 rounded-2xl bg-slate-200 shadow-lg flex gap-4 items-center justify-center">
                <div className="bg-quaternary w-1/2 h-full py-4 rounded-full">
                    <h2 className="md:text-2xl text-lg text-primary font-bold text-center">Team A</h2>
                </div>
                <div className="bg-secondary w-full h-full py-4 rounded-full">
                    <h2 className="md:text-2xl text-lg text-primary font-bold text-center">Team B</h2>
                </div>
            </nav>
            <div className="grid w-full lg:grid-cols-2 grid-cols-1 gap-8 h-full">
                <div className="w-full bg-quaternary shadow-lg sm:p-8 p-4 rounded-2xl">
                    <div className="h-full sm:p-8 p-4 text-center bg-slate-200 rounded-2xl">
                        <div className="flex justify-between items-center border-b border-primary pb-4">
                            <div className="text-start">
                                <h1 className="text-3xl font-bold text-primary">Team A</h1>
                                <h4 className="text-lg font-medium text-primary">2 Player</h4>
                            </div>
                            <h2 className="text-primary">icons</h2>
                        </div>
                        <div className="flex flex-col items-center justify-center h-full">
                            <h2 className="text-9xl font-bold text-primary"style={{ marginTop: '-72px' }}>{data.scoreA}</h2>
                        </div>
                    </div>
                </div>
                <div className="w-full bg-secondary shadow-lg sm:p-8 p-4 rounded-2xl">
                    <div className="h-full sm:p-8 p-4 text-center bg-slate-200 rounded-2xl">
                        <div className="flex justify-between items-center border-b border-primary pb-4">
                            <div className="text-start">
                                <h1 className="text-3xl font-bold text-primary">Team B</h1>
                                <h4 className="text-lg font-medium text-primary">2 Player</h4>
                            </div>
                            <h2 className="text-primary">icons</h2>
                        </div>
                        <div className="flex flex-col items-center justify-center h-full">
                            <h2 className="text-9xl font-bold text-primary"style={{ marginTop: '-72px' }}>{data.scoreB}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
