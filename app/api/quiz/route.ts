let quiz = { scoreA: 0, scoreB: 0, timer: 0, previousWinner: null };

export async function GET() {
    return new Response(JSON.stringify(quiz), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function POST(req: Request) {
    const body = await req.json();
    if (body.scoreA !== undefined) {
        quiz.scoreA = body.scoreA;
    }
    if (body.scoreB !== undefined) {
        quiz.scoreB = body.scoreB;
    }
    if (body.timer !== undefined) {
        quiz.timer = body.timer;
        const timerInterval = setInterval(() => {
            if (quiz.timer > 0) {
                quiz.timer -= 1;
            } else {
                clearInterval(timerInterval);
            }
        }, 1000);
    }
    if (body.previousWinner !== undefined) {
        quiz.previousWinner = body.previousWinner;
    }
    return new Response(JSON.stringify(quiz), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
