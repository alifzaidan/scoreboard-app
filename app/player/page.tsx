'use client';

import { useEffect, useState } from 'react';
import useSWR from 'swr';
import Loading from '../loading';
import { RiShieldFlashFill, RiShieldStarFill } from 'react-icons/ri';
import Image from 'next/image';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function Player() {
    const [timer, setTimer] = useState(0);
    const [showCountdown, setShowCountdown] = useState(false);
    const [showWinner, setShowWinner] = useState(false);
    const { data, error } = useSWR('/api/quiz', fetcher, { refreshInterval: 100 });

    useEffect(() => {
        if (data?.timer > 0) {
            setTimer(data.timer);
            setShowCountdown(true);
            const interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev < 1) {
                        clearInterval(interval);
                        setShowCountdown(false);
                        fetch('/api/quiz', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ timer: 0 }),
                        });
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [data]);

    useEffect(() => {
        if (data?.previousWinner) {
            setShowWinner(true);
            const timeout = setTimeout(() => {
                setShowWinner(false);
                fetch('/api/quiz', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ previousWinner: null }),
                });
            }, 10000);
            return () => clearTimeout(timeout);
        }
    }, [data]);

    if (error) return <div>Failed to load score</div>;
    if (!data) return Loading();

    return (
        <main className="flex flex-col md:gap-8 gap-4 container items-center lg:h-screen py-10 overflow-hidden">
            <nav className="w-full p-4 rounded-2xl bg-slate-200 shadow-lg flex gap-4 items-center justify-center">
                <div className="bg-quaternary w-1/2 h-full py-4 rounded-full">
                    <h2 className="md:text-2xl text-lg text-primary font-bold text-center">Team A</h2>
                </div>
                <div className="bg-secondary w-full h-full py-4 rounded-full">
                    <h2 className="md:text-2xl text-lg text-primary font-bold text-center">Team B</h2>
                </div>
            </nav>
            <div className="grid w-full lg:grid-cols-2 grid-cols-1 md:gap-8 gap-4 h-full">
                <div className="w-full bg-quaternary shadow-lg sm:p-8 p-4 rounded-2xl">
                    <div className="h-full sm:p-8 p-4 text-center bg-slate-200 rounded-2xl">
                        <div className="flex justify-between items-center border-b border-primary pb-4">
                            <div className="text-start">
                                <h1 className="sm:text-3xl text-2xl font-bold text-primary">Team A</h1>
                                <h4 className="sm:text-lg font-medium text-primary">2 Player</h4>
                            </div>
                            <RiShieldFlashFill className="text-primary w-10 h-10" />
                        </div>
                        <div className="flex flex-col items-center justify-center h-full pb-16">
                            <h2 className="sm:text-9xl text-8xl font-bold text-primary">{data.scoreA}</h2>
                        </div>
                    </div>
                </div>
                <div className="w-full bg-secondary shadow-lg sm:p-8 p-4 rounded-2xl">
                    <div className="h-full sm:p-8 p-4 text-center bg-slate-200 rounded-2xl">
                        <div className="flex justify-between items-center border-b border-primary pb-4">
                            <div className="text-start">
                                <h1 className="sm:text-3xl text-2xl font-bold text-primary">Team B</h1>
                                <h4 className="sm:text-lg font-medium text-primary">2 Player</h4>
                            </div>
                            <RiShieldStarFill className="text-primary w-10 h-10" />
                        </div>
                        <div className="flex flex-col items-center justify-center h-full pb-16">
                            <h2 className="sm:text-9xl text-8xl font-bold text-primary">{data.scoreB}</h2>
                        </div>
                    </div>
                </div>
            </div>
            {showCountdown && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="sm:w-1/2 w-full h-2/3 rounded-2xl shadow-lg bg-pattern-dark sm:p-8 p-6 mx-8">
                        <div className="h-full flex flex-col justify-center items-center bg-slate-200 rounded-2xl">
                            <div className="sm:text-4xl text-3xl text-primary text-center font-bold">Let&apos;s Go!!!</div>
                            <div className="text-[10rem] text-tertiary text-center font-bold">{timer}</div>
                        </div>
                    </div>
                </div>
            )}
            {showWinner && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="lg:w-1/2 w-full h-2/3 rounded-2xl shadow-lg bg-pattern-dark sm:p-8 p-6 mx-8">
                        {data.previousWinner === 'Draw' ? (
                            <div className="h-full flex flex-col justify-center items-center gap-4 bg-slate-200 rounded-2xl p-2">
                                <div className="sm:text-4xl text-xl text-primary text-center font-bold">Oh noo.. Your score is</div>
                                <div className="sm:text-9xl text-6xl text-center text-tertiary font-bold">{data.previousWinner}</div>
                                <div className="sm:text-xl text-primary text-center font-bold">Don&apos;t give up and never surrender!</div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col justify-center items-center gap-4 bg-slate-200 rounded-2xl p-2">
                                <div className="flex items-center justify-center gap-4">
                                    <div className="sm:text-4xl text-xl text-center text-primary font-bold">The Winner is,</div>
                                    <Image src="/assets/img/winner.gif" alt="trophy" width={100} height={100} />
                                </div>
                                <div className="sm:text-9xl text-6xl text-center text-tertiary font-bold">{data.previousWinner}</div>
                                <div className="sm:text-xl text-center text-primary font-bold">Well done, your victory is well-deserved!</div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </main>
    );
}
