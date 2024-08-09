'use client';

import Image from 'next/image';
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
        <main className="flex flex-col items-center h-full py-[36px] overflow-hidden bg-white">
            <nav className="w-[1080px] h-[101px] mb-8 rounded-2xl bg-white shadow-lg flex items-center justify-between px-8">
                <div className="w-28">
                    <Image src="/assets/img/logo-bri.png" alt="Logo" width={200} height={200} />
                </div>
                <div className="text-3xl font-bold text-blue-800 absolute left-1/2 transform -translate-x-1/2">QUIZ bank BRI</div>
                <div className="text-3xl font-bold text-blue-800">Timer: {timer > 0 ? timer : "Time's up!"}</div>
            </nav>
            <div className="flex space-x-8">
                <div className="flex-1">
                    <div className="block h-[470px] w-[520px] shadow-lg p-8 text-center bg-slate-200 rounded-2xl border-4 border-blue-800">
                        <div className="text-3xl font-bold text-black mb-4">Team A</div>
                        <div className="border-2 h-[350px] bg-white p-4 rounded-lg flex flex-col items-center justify-between">
                            <div className="text-xl font-bold text-black mb-2">Score Sementara:</div>
                            <div className="flex-grow flex items-center justify-center">
                                <div className="text-7xl font-bold text-black">{data.scoreA}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="block h-[470px] w-[520px] shadow-lg p-8 text-center bg-slate-200 rounded-2xl border-4 border-orange-500">
                        <div className="text-3xl font-bold text-black mb-4">Team B</div>
                        <div className="border-2 h-[350px] bg-white p-4 rounded-lg flex flex-col items-center justify-between">
                            <div className="text-xl font-bold text-black mb-2">Score Sementara:</div>
                            <div className="flex-grow flex items-center justify-center">
                                <div className="text-7xl font-bold text-black">{data.scoreB}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
