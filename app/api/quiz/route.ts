let quiz = { scoreA: 0, scoreB: 0, scoreC: 0, scoreD: 0, scoreE: 0, scoreF: 0, timer: 0, previousWinner: null };

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
    if (body.scoreC !== undefined) {
        quiz.scoreC = body.scoreC;
    }
    if (body.scoreD !== undefined) {
        quiz.scoreD = body.scoreD;
    }
    if (body.scoreE !== undefined) {
        quiz.scoreE = body.scoreE;
    }
    if (body.scoreF !== undefined) {
        quiz.scoreF = body.scoreF;
    }
    if (body.timer !== undefined) {
        quiz.timer = body.timer;
    }
    if (body.previousWinner !== undefined) {
        quiz.previousWinner = body.previousWinner;
    }
    return new Response(JSON.stringify(quiz), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
