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
        <div>
            <h1>Player 1: {scoreA}</h1>
            <button onClick={() => updateScoreA(scoreA + 100)}>Benar</button>
            <br />
            <button onClick={() => updateScoreA(scoreA - 50)}>Salah</button>
            <br />
            <button onClick={undoScoreA}>Undo</button>
            <br />
            <br />
            <br />
            <h1>Player 2: {scoreB}</h1>
            <button onClick={() => updateScoreB(scoreB + 100)}>Benar</button>
            <br />
            <button onClick={() => updateScoreB(scoreB - 50)}>Salah</button>
            <br />
            <button onClick={undoScoreB}>Undo</button>
            <br />
            <br />
            <br />
            <button onClick={startTimer}>Start Timer</button>
            <br />
            <button onClick={resetAll}>Reset</button>
            <br />
            <button onClick={finishGame}>Finish Game</button>
        </div>
    );
}
