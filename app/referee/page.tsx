'use client';

import { useEffect, useState } from 'react';
import { FaUndo } from 'react-icons/fa';
import useSWR from 'swr';
import Loading from '../loading';
import Image from 'next/image';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function Referee() {
    const [scoreA, setScoreA] = useState(0);
    const [previousScoreA, setPreviousScoreA] = useState(0);
    const [scoreB, setScoreB] = useState(0);
    const [previousScoreB, setPreviousScoreB] = useState(0);
    const [scoreC, setScoreC] = useState(0);
    const [previousScoreC, setPreviousScoreC] = useState(0);
    const [scoreD, setScoreD] = useState(0);
    const [previousScoreD, setPreviousScoreD] = useState(0);
    const [scoreE, setScoreE] = useState(0);
    const [previousScoreE, setPreviousScoreE] = useState(0);
    const [scoreF, setScoreF] = useState(0);
    const [previousScoreF, setPreviousScoreF] = useState(0);
    const [winner, setWinner] = useState<string | null>(null);
    const { data, error } = useSWR('/api/quiz', fetcher);

    useEffect(() => {
        if (data) {
            setScoreA(data.scoreA);
            setScoreB(data.scoreB);
            setWinner(data.previousWinner);
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

    const updateScoreC = (newScore: number) => {
        setPreviousScoreC(scoreC);
        setScoreC(newScore);
        fetch('/api/quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ scoreC: newScore }),
        });
    };

    const undoScoreC = () => {
        setScoreC(previousScoreC);
        fetch('/api/quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ scoreC: previousScoreC }),
        });
    };

    const updateScoreD = (newScore: number) => {
        setPreviousScoreD(scoreD);
        setScoreD(newScore);
        fetch('/api/quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ scoreD: newScore }),
        });
    };

    const undoScoreD = () => {
        setScoreD(previousScoreD);
        fetch('/api/quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ scoreD: previousScoreD }),
        });
    };

    const updateScoreE = (newScore: number) => {
        setPreviousScoreE(scoreE);
        setScoreE(newScore);
        fetch('/api/quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ scoreE: newScore }),
        });
    };

    const undoScoreE = () => {
        setScoreE(previousScoreE);
        fetch('/api/quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ scoreE: previousScoreE }),
        });
    };

    const updateScoreF = (newScore: number) => {
        setPreviousScoreF(scoreF);
        setScoreF(newScore);
        fetch('/api/quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ scoreF: newScore }),
        });
    };

    const undoScoreF = () => {
        setScoreF(previousScoreF);
        fetch('/api/quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ scoreF: previousScoreF }),
        });
    };

    const resetAll = () => {
        setPreviousScoreA(scoreA);
        setPreviousScoreB(scoreB);
        setPreviousScoreC(scoreC);
        setPreviousScoreD(scoreD);
        setPreviousScoreE(scoreE);
        setPreviousScoreF(scoreF);
        setScoreA(0);
        setScoreB(0);
        setScoreC(0);
        setScoreD(0);
        setScoreE(0);
        setScoreF(0);
        setWinner(null);
        fetch('/api/quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ scoreA: 0, scoreB: 0, scoreC: 0, scoreD: 0, scoreE: 0, scoreF: 0, timer: 0, previousWinner: null }),
        });
    };

    const finishGame = () => {
        let winner = 'Draw';
        if (scoreA > scoreB && scoreA > scoreC && scoreA > scoreD && scoreA > scoreE && scoreA > scoreF) {
            winner = 'Team A';
        } else if (scoreB > scoreA && scoreB > scoreC && scoreB > scoreD && scoreB > scoreE && scoreB > scoreF) {
            winner = 'Team B';
        } else if (scoreC > scoreA && scoreC > scoreB && scoreC > scoreD && scoreC > scoreE && scoreC > scoreF) {
            winner = 'Team C';
        } else if (scoreD > scoreA && scoreD > scoreB && scoreD > scoreC && scoreD > scoreE && scoreD > scoreF) {
            winner = 'Team D';
        } else if (scoreE > scoreA && scoreE > scoreB && scoreE > scoreC && scoreE > scoreD && scoreE > scoreF) {
            winner = 'Team E';
        } else if (scoreF > scoreA && scoreF > scoreB && scoreF > scoreC && scoreF > scoreD && scoreF > scoreE) {
            winner = 'Team F';
        }

        setPreviousScoreA(scoreA);
        setPreviousScoreB(scoreB);
        setPreviousScoreC(scoreC);
        setPreviousScoreD(scoreD);
        setPreviousScoreE(scoreE);
        setPreviousScoreF(scoreF);
        setScoreA(0);
        setScoreB(0);
        setScoreC(0);
        setScoreD(0);
        setScoreE(0);
        setScoreF(0);
        setWinner(winner);
        fetch('/api/quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ scoreA: 0, scoreB: 0, scoreC: 0, scoreD: 0, scoreE: 0, scoreF: 0, previousWinner: winner }),
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
        <main className="flex flex-col md:space-y-8 space-y-4 container items-center py-10">
            <nav className="w-full px-8 md:py-2 py-4 rounded-2xl bg-slate-200 shadow-lg flex md:flex-row flex-col gap-4 items-center justify-between">
                <div className="w-28">
                    <Image src="/assets/img/logo-bri.png" alt="Logo" width={200} height={200} />
                </div>
                <h1 className="md:mt-0 mt-2 md:text-3xl text-2xl text-center font-bold text-primary">QUIZ BRI Kanca Sutoyo</h1>
                <div className="text-center md:block flex items-center gap-1 bg-tertiary rounded-xl py-2 px-4">
                    <h1 className="md:text-2xl text-lg font-bold text-white">Pemenang: </h1>
                    <h1 className="md:text-xl text-lg font-bold text-white">{winner ? winner : 'Belum ada'}</h1>
                </div>
            </nav>
            <div className="grid w-full lg:grid-cols-2 grid-cols-1 md:gap-8 gap-4 ">
                <div className="w-full bg-quaternary shadow-lg sm:p-8 p-4 rounded-2xl">
                    <div className="sm:px-8 sm:py-12 p-4 text-center bg-slate-200 rounded-2xl">
                        <div className="flex justify-between items-center border-b border-primary pb-4">
                            <div className="text-start">
                                <h1 className="text-3xl font-bold text-primary">Team A</h1>
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
                    <div className="sm:px-8 sm:py-12 p-4 text-center bg-slate-200 rounded-2xl">
                        <div className="flex justify-between items-center border-b border-primary pb-4">
                            <div className="text-start">
                                <h1 className="text-3xl font-bold text-primary">Team B</h1>
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

                <div className="w-full bg-tertiary shadow-lg sm:p-8 p-4 rounded-2xl">
                    <div className="sm:px-8 sm:py-12 p-4 text-center bg-slate-200 rounded-2xl">
                        <div className="flex justify-between items-center border-b border-primary pb-4">
                            <div className="text-start">
                                <h1 className="text-3xl font-bold text-primary">Team C</h1>
                            </div>
                            <h2 className="text-4xl font-bold text-primary">{scoreC}</h2>
                        </div>
                        <div className="flex justify-between gap-3 sm:mt-12 mt-8">
                            <button
                                onClick={undoScoreC}
                                className="basis-1/5 w-full text-white bg-gray-400 hover:bg-gray-500 transition duration-200 sm:py-4 py-2 rounded-lg"
                            >
                                <FaUndo className="m-auto" />
                            </button>
                            <button
                                onClick={() => updateScoreC(scoreC - 50)}
                                className="basis-1/2 w-full text-white md:text-xl font-semibold bg-red-500 hover:bg-red-600 transition duration-200 sm:py-4 py-2 rounded-lg"
                            >
                                Salah
                            </button>
                            <button
                                onClick={() => updateScoreC(scoreC + 100)}
                                className="basis-1/2 w-full text-white md:text-xl font-semibold bg-green-500 hover:bg-green-600 transition duration-200 sm:py-4 py-2 rounded-lg"
                            >
                                Benar
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full bg-purple-400 shadow-lg sm:p-8 p-4 rounded-2xl">
                    <div className="sm:px-8 sm:py-12 p-4 text-center bg-slate-200 rounded-2xl">
                        <div className="flex justify-between items-center border-b border-primary pb-4">
                            <div className="text-start">
                                <h1 className="text-3xl font-bold text-primary">Team D</h1>
                            </div>
                            <h2 className="text-4xl font-bold text-primary">{scoreD}</h2>
                        </div>
                        <div className="flex justify-between gap-3 sm:mt-12 mt-8">
                            <button
                                onClick={undoScoreD}
                                className="basis-1/5 w-full text-white bg-gray-400 hover:bg-gray-500 transition duration-200 sm:py-4 py-2 rounded-lg"
                            >
                                <FaUndo className="m-auto" />
                            </button>
                            <button
                                onClick={() => updateScoreD(scoreD - 50)}
                                className="basis-1/2 w-full text-white md:text-xl font-semibold bg-red-500 hover:bg-red-600 transition duration-200 sm:py-4 py-2 rounded-lg"
                            >
                                Salah
                            </button>
                            <button
                                onClick={() => updateScoreD(scoreD + 100)}
                                className="basis-1/2 w-full text-white md:text-xl font-semibold bg-green-500 hover:bg-green-600 transition duration-200 sm:py-4 py-2 rounded-lg"
                            >
                                Benar
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full bg-green-400 shadow-lg sm:p-8 p-4 rounded-2xl">
                    <div className="sm:px-8 sm:py-12 p-4 text-center bg-slate-200 rounded-2xl">
                        <div className="flex justify-between items-center border-b border-primary pb-4">
                            <div className="text-start">
                                <h1 className="text-3xl font-bold text-primary">Team E</h1>
                            </div>
                            <h2 className="text-4xl font-bold text-primary">{scoreE}</h2>
                        </div>
                        <div className="flex justify-between gap-3 sm:mt-12 mt-8">
                            <button
                                onClick={undoScoreE}
                                className="basis-1/5 w-full text-white bg-gray-400 hover:bg-gray-500 transition duration-200 sm:py-4 py-2 rounded-lg"
                            >
                                <FaUndo className="m-auto" />
                            </button>
                            <button
                                onClick={() => updateScoreE(scoreE - 50)}
                                className="basis-1/2 w-full text-white md:text-xl font-semibold bg-red-500 hover:bg-red-600 transition duration-200 sm:py-4 py-2 rounded-lg"
                            >
                                Salah
                            </button>
                            <button
                                onClick={() => updateScoreE(scoreE + 100)}
                                className="basis-1/2 w-full text-white md:text-xl font-semibold bg-green-500 hover:bg-green-600 transition duration-200 sm:py-4 py-2 rounded-lg"
                            >
                                Benar
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full bg-gray-400 shadow-lg sm:p-8 p-4 rounded-2xl">
                    <div className="sm:px-8 sm:py-12 p-4 text-center bg-slate-200 rounded-2xl">
                        <div className="flex justify-between items-center border-b border-primary pb-4">
                            <div className="text-start">
                                <h1 className="text-3xl font-bold text-primary">Team F</h1>
                            </div>
                            <h2 className="text-4xl font-bold text-primary">{scoreF}</h2>
                        </div>
                        <div className="flex justify-between gap-3 sm:mt-12 mt-8">
                            <button
                                onClick={undoScoreF}
                                className="basis-1/5 w-full text-white bg-gray-400 hover:bg-gray-500 transition duration-200 sm:py-4 py-2 rounded-lg"
                            >
                                <FaUndo className="m-auto" />
                            </button>
                            <button
                                onClick={() => updateScoreF(scoreF - 50)}
                                className="basis-1/2 w-full text-white md:text-xl font-semibold bg-red-500 hover:bg-red-600 transition duration-200 sm:py-4 py-2 rounded-lg"
                            >
                                Salah
                            </button>
                            <button
                                onClick={() => updateScoreF(scoreF + 100)}
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
