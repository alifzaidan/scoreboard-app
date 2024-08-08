'use client';

import { useEffect, useState } from 'react';
import useSWR from 'swr';

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
    if (!data) return <div>Loading...</div>;

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
        <main className="flex flex-col items-center h-screen py-4 overflow-hidden bg-white">
            <nav className="w-[1080px] h-[101px] mb-4 rounded-2xl bg-white shadow-lg flex items-center justify-between px-8">
                {/* <div className="flex items-center justify-space-x-4"> */}
                    <img src="/assets/icons/logo-bri.png" alt="Logo" className="h-12 w-32" />
                    <h1 className="text-3xl font-bold text-blue-800">QUIZ bank BRI</h1>
                {/* </div> */}
            </nav>
            <div className="flex space-x-4 mb-4">
                <button onClick={resetAll} className="w-[150px] h-[80px] flex justify-center items-center bg-yellow-500 rounded-lg hover:bg-yellow-600">
                    <span className="text-center font-semibold">Reset</span>
                </button>
                <button onClick={startTimer} className="w-[150px] h-[80px] flex justify-center items-center bg-blue-500 rounded-lg hover:bg-blue-600">
                    <span className="text-center font-semibold">Start Timer</span>
                </button>
                <button onClick={finishGame} className="w-[150px] h-[80px] flex justify-center items-center bg-red-500 rounded-lg hover:bg-red-600">
                    <span className="text-center font-semibold">Finish Game</span>
                </button>
            </div>
            <div className="flex space-x-8">
                <div className="flex-1">
                    <div className="block h-[400px] w-[520px] shadow-lg p-8 text-center bg-slate-200 rounded-2xl border-4 border-blue-800">
                        <div className="text-3xl font-bold text-blue-800 mb-4">Team A</div>
                        <div className="border-2 h-[230px] bg-white p-4 rounded-lg flex flex-col items-center justify-between">
                            <div className="text-xl font-bold text-blue-800 mb-2">Score Sementara:</div>
                            <div className="flex-grow flex items-center justify-center">
                                <div className="text-7xl font-bold text-blue-800">{scoreA}</div>
                            </div>
                        </div>
                        <div className="flex justify-between mt-4">
                            <button onClick={undoScoreA} className="bg-gray-400 hover:bg-gray-500 px-4 py-2 rounded-lg">Undo</button>
                            <div className="flex space-x-2">
                                <button onClick={() => updateScoreA(scoreA - 50)} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg">Salah</button>
                                <button onClick={() => updateScoreA(scoreA + 100)} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg">Benar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="block h-[400px] w-[520px] shadow-lg p-8 text-center bg-slate-200 rounded-2xl border-4 border-orange-500">
                        <div className="text-3xl font-bold text-blue-800 mb-4">Team B</div>
                        <div className="border-2 h-[230px] bg-white p-4 rounded-lg flex flex-col items-center justify-between">
                            <div className="text-xl font-bold text-blue-800 mb-2">Score Sementara:</div>
                            <div className="flex-grow flex items-center justify-center">
                                <div className="text-7xl font-bold text-blue-800">{scoreB}</div>
                            </div>
                        </div>
                        <div className="flex justify-between mt-4">
                            <button onClick={undoScoreB} className="bg-gray-400 hover:bg-gray-500 px-4 py-2 rounded-lg">Undo</button>
                            <div className="flex space-x-2">
                                <button onClick={() => updateScoreB(scoreB - 50)} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg">Salah</button>
                                <button onClick={() => updateScoreB(scoreB + 100)} className="bg-green-600  hover:bg-green-700 px-4 py-2 rounded-lg">Benar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
