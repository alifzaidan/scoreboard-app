import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    return (
        <main>
            <h1>Home</h1>
            <Link href={'/player'}>Player</Link>
            <br />
            <Link href={'/referee'}>Referee</Link>
        </main>
    );
}
