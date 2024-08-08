// app/api/score/route.ts

// Menyimpan skor dalam memori
let quiz = { scoreA: 0, scoreB: 0 };

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
    return new Response(JSON.stringify(quiz), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
