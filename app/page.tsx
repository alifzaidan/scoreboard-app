import Link from 'next/link';

export default function Home() {
    return (
        <main className="flex flex-col items-center h-screen py-[36px] overflow-hidden bg-white">
            <nav className="w-[1080px] h-[101px] mb-8 rounded-2xl bg-white shadow-lg flex items-center justify-center">
                <h1 className="text-5xl font-bold text-blue-800">Choose Your Role</h1>
            </nav>
            <div className="flex space-x-8">
                <div className="flex-1">
                    <Link href="/player" className="block h-[470px] w-[520px] shadow-lg p-8 text-center bg-gradient-to-br from-blue-900 to-blue-500 rounded-2xl transform transition-transform duration-800 hover:scale-110 hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-900">
                        <div className="text-3xl font-bold mb-4">Player</div>
                        <div className="flex justify-center mb-4">
                            <div className="h-32 w-32 bg-white rounded-full flex items-center justify-center">
                            <img src="/assets/icons/desktop.svg" alt="Player Icon" className="h-16 w-16" />
                            </div>
                        </div>
                        <div className="text-lg text-white">
                            Halaman ini adalah halaman untuk menampilkan score peserta
                        </div>
                        <div className="absolute bottom-4 right-4">
                            <img src="/assets/icons/arrow-right.svg" alt="Arrow Right" className="h-6 w-6" />
                        </div>
                    </Link>
                </div>
                <div className="flex-1 shadow-lg">
                    <Link href="/referee" className="block h-[470px] w-[520px] p-8 text-center bg-gradient-to-br from-orange-700 to-orange-400 rounded-2xl transform transition-transform duration-800 hover:scale-110 hover:bg-gradient-to-br hover:from-orange-500 hover:to-orange-800">
                    <div className="text-3xl font-bold mb-4">Referee</div>
                        <div className="flex justify-center mb-4">
                            <div className="h-32 w-32 bg-white rounded-full flex items-center justify-center">
                            <img src="/assets/icons/user orange.svg" alt="Player Icon" className="h-16 w-16" />
                            </div>
                        </div>
                        <div className="text-lg text-white">
                            Halaman ini adalah halaman untuk Juri menambah dan mengurangi score peserta
                        </div>
                        <div className="absolute bottom-4 right-4">
                            <img src="/assets/icons/arrow-right.svg" alt="Arrow Right" className="h-6 w-6" />
                        </div>
                    </Link>
                </div>
            </div>
        </main>
    );
}