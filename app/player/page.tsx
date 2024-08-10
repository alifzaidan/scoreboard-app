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
    const [modalVisible, setModalVisible] = useState(false);
    const { data, error } = useSWR('/api/quiz', fetcher, { refreshInterval: 1000 });

    useEffect(() => {
        if (data?.timer > 0) {
            setTimer(data.timer);
            setShowCountdown(true);
            setTimeout(() => setModalVisible(true))}
    }, [data]);

    useEffect(() => {
        if (showCountdown && timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [showCountdown, timer]);

    useEffect(() => {
        if (timer === 0 && showCountdown) {
            setModalVisible(false); 
            setTimeout(() => {
                setShowCountdown(false); 
            }, 300); 
        }
    }, [timer, showCountdown]);

    useEffect(() => {
        if (data?.previousWinner) {
            setShowWinner(true);
            const timeout = setTimeout(() => {
                setShowWinner(false);
            }, 10000);
            return () => clearTimeout(timeout);
        }
    }, [data]);

    if (error) return <div>Failed to load score</div>;
    if (!data) return Loading();

    return (
        <main className="flex flex-col gap-8 container items-center lg:h-screen py-10 overflow-hidden">
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
                            <RiShieldFlashFill className="text-primary w-10 h-10" />
                        </div>
                        <div className="flex flex-col items-center justify-center h-full pb-16">
                            <h2 className="text-9xl font-bold text-primary">{data.scoreA}</h2>
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
                            <RiShieldStarFill className="text-primary w-10 h-10" />
                        </div>
                        <div className="flex flex-col items-center justify-center h-full pb-16">
                            <h2 className="text-9xl font-bold text-primary">{data.scoreB}</h2>
                        </div>
                    </div>
                </div>
            </div>
            {showCountdown && (
                <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease ${modalVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="sm:w-1/2 w-full h-2/3 rounded-2xl shadow-lg bg-pattern-dark sm:p-8 p-6 mx-8">
                        <div className="h-full flex flex-col justify-center items-center bg-slate-200 rounded-2xl">
                            <div className="sm:text-4xl text-3xl text-primary font-bold">Let&apos;s Go!!!</div>
                            <div className="text-[10rem] text-tertiary font-bold">{timer}</div>
                        </div>
                    </div>
                </div>
            )}
            {showWinner && (
                <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out ${showWinner ? 'opacity-100 ' : 'opacity-0 '}`}>
                    <div className="lg:w-1/2 w-full h-2/3 rounded-2xl shadow-lg bg-pattern-dark sm:p-8 p-6 mx-8">
                        {data.previousWinner === 'Draw' ? (
                            <div className="h-full flex flex-col justify-center items-center gap-4 bg-slate-200 rounded-2xl p-2">
                                <div className="sm:text-4xl text-3xl text-primary font-bold">Oh noo.. Your score is</div>
                                <div className="sm:text-9xl text-8xl text-center text-tertiary font-bold">{data.previousWinner}</div>
                                <div className="sm:text-xl text-lg text-center text-primary font-bold">Don&apos;t give up and never surrender!</div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col justify-center items-center gap-4 bg-white rounded-2xl p-2">
                                <div className="flex items-center justify-center gap-4">
                                    <div className="sm:text-4xl text-3xl text-primary font-bold">The Winner is,</div>
                                    <Image src="/assets/img/winner.gif" alt="trophy" width={100} height={100} />
                                </div>
                                <div className="sm:text-9xl text-8xl text-center text-tertiary font-bold">{data.previousWinner}</div>
                                <div className="sm:text-xl text-lg text-center text-primary font-bold">Well done, your victory is well-deserved!</div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </main>
    );
}
