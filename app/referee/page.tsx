'use client';

import { useEffect, useState } from 'react';
import { FaUndo } from 'react-icons/fa';
import useSWR from 'swr';
import Loading from '../loading';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function Referee() {
    const [scoreA, setScoreA] = useState(0);
    const [previousScoreA, setPreviousScoreA] = useState(0);
    const [scoreB, setScoreB] = useState(0);
    const [previousScoreB, setPreviousScoreB] = useState(0);
    const { data, error } = useSWR('/api/quiz', fetcher);

    useEffect(() => {
        if (data) {
            setScoreA(data.scoreA);
            setScoreB(data.scoreB);
        }
    }, [data]);

    if (error) return <div>Failed to load score</div>;
    if (!data) return Loading();

    const updateScoreA = async (newScore: any) => {
        setPreviousScoreA(scoreA);
        setScoreA(newScore);
        await fetch('/api/quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ scoreA: newScore }),
        });
    };

    const undoScoreA = async () => {
        setScoreA(previousScoreA);
        await fetch('/api/quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ scoreA: previousScoreA }),
        });
    };

    const updateScoreB = (newScore: number) => {
        setPreviousScoreB(scoreB);
        setScoreB(newScore);
        fetch('/api/quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ scoreB: newScore }),
        });
    };

    const undoScoreB = () => {
        setScoreB(previousScoreB);
        fetch('/api/quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ scoreB: previousScoreB }),
        });
    };

    const resetAll = () => {
        setPreviousScoreA(scoreA);
        setPreviousScoreB(scoreB);
        setScoreA(0);
        setScoreB(0);
        fetch('/api/quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ scoreA: 0, scoreB: 0, timer: 0, previousWinner: null }),
        });
    };

    const finishGame = () => {
        let winner = 'Draw';
        if (scoreA > scoreB) {
            winner = 'Tim A';
        } else if (scoreB > scoreA) {
            winner = 'Tim B';
        }

        setPreviousScoreA(scoreA);
        setPreviousScoreB(scoreB);
        setScoreA(0);
        setScoreB(0);
        fetch('/api/quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ scoreA: 0, scoreB: 0, previousWinner: winner }),
        });
    };

    const startTimer = () => {
        fetch('/api/quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ timer: 10 }),
        });
    };

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
                            <h2 className="text-4xl font-bold text-primary">{scoreA}</h2>
                        </div>
                        <div className="flex justify-between gap-3 sm:mt-12 mt-8">
                            <button
                                onClick={undoScoreA}
                                className="basis-1/5 w-full text-center text-white bg-gray-400 hover:bg-gray-500 sm:py-4 py-2 rounded-lg"
                            >
                                <FaUndo className="m-auto" />
                            </button>
                            <button
                                onClick={() => updateScoreA(scoreA - 50)}
                                className="basis-1/2 w-full text-white md:text-xl font-semibold bg-red-500 hover:bg-red-600 sm:py-4 py-2 rounded-lg"
                            >
                                Salah
                            </button>
                            <button
                                onClick={() => updateScoreA(scoreA + 100)}
                                className="basis-1/2 w-full text-white md:text-xl font-semibold bg-green-500 hover:bg-green-600 sm:py-4 py-2 rounded-lg"
                            >
                                Benar
                            </button>
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
                            <h2 className="text-4xl font-bold text-primary">{scoreB}</h2>
                        </div>
                        <div className="flex justify-between gap-3 sm:mt-12 mt-8">
                            <button
                                onClick={undoScoreB}
                                className="basis-1/5 w-full text-white bg-gray-400 hover:bg-gray-500 transition duration-200 sm:py-4 py-2 rounded-lg"
                            >
                                <FaUndo className="m-auto" />
                            </button>
                            <button
                                onClick={() => updateScoreB(scoreB - 50)}
                                className="basis-1/2 w-full text-white md:text-xl font-semibold bg-red-500 hover:bg-red-600 transition duration-200 sm:py-4 py-2 rounded-lg"
                            >
                                Salah
                            </button>
                            <button
                                onClick={() => updateScoreB(scoreB + 100)}
                                className="basis-1/2 w-full text-white md:text-xl font-semibold bg-green-500 hover:bg-green-600 transition duration-200 sm:py-4 py-2 rounded-lg"
                            >
                                Benar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="w-full sm:p-4 p-2 rounded-2xl bg-slate-200 shadow-lg flex sm:gap-4 gap-2 items-center justify-center">
                <button
                    onClick={resetAll}
                    className="w-full p-4 flex justify-center items-center bg-tertiary rounded-xl hover:scale-105 transition duration-200"
                >
                    <span className="text-white md:text-xl text-center font-semibold">Reset Data</span>
                </button>
                <button
                    onClick={startTimer}
                    className="w-full p-4 flex justify-center items-center bg-primary rounded-xl  hover:scale-105 transition duration-200"
                >
                    <span className="text-white md:text-xl text-center font-semibold">Start Timer</span>
                </button>
                <button
                    onClick={finishGame}
                    className="w-full p-4 flex justify-center items-center bg-green-500 rounded-xl hover:scale-105 transition duration-200"
                >
                    <span className="text-white md:text-xl text-center font-semibold">Finish Game</span>
                </button>
            </footer>
        </main>
    );
}
