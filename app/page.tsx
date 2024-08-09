import Link from 'next/link';
import { FaArrowRightLong } from 'react-icons/fa6';
import { MdOutlineScreenshotMonitor } from 'react-icons/md';
import { RiUserSettingsLine } from 'react-icons/ri';

export default function Home() {
    return (
        <main className="flex flex-col container items-center lg:h-screen py-10 overflow-hidden">
            <nav className="w-full py-8 mb-8 rounded-2xl bg-white shadow-lg flex items-center justify-center">
                <h1 className="text-4xl font-bold text-primary">Choose Your Role</h1>
            </nav>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 h-full">
                <Link
                    href="/player"
                    className="flex-1 shadow-lg py-20 text-center gap-8 bg-gradient-to-br from-secondary to-primary rounded-2xl transform transition-transform duration-300 hover:scale-105"
                >
                    <div className="text-4xl text-white font-bold mb-4">Player</div>

                    <div className="h-32 w-32 m-auto my-8 bg-white rounded-full flex items-center justify-center">
                        <MdOutlineScreenshotMonitor className="h-16 w-16 text-primary" />
                    </div>

                    <div className="text-lg mx-20 text-white">Halaman ini adalah halaman untuk menampilkan score peserta</div>
                    <div className="absolute bottom-4 right-6 text-white">
                        <FaArrowRightLong className="h-8 w-8" />
                    </div>
                </Link>
                <Link
                    href="/referee"
                    className="flex-1 shadow-lg py-20 text-center gap-8 bg-gradient-to-br from-quaternary to-tertiary rounded-2xl transform transition-transform duration-300 hover:scale-105"
                >
                    <div className="text-4xl text-white font-bold mb-4">Referee</div>

                    <div className="h-32 w-32 m-auto my-8 bg-white rounded-full flex items-center justify-center">
                        <div className="w-16">
                            <RiUserSettingsLine className="h-16 w-16 text-tertiary" />
                        </div>
                    </div>

                    <div className="text-lg mx-20 text-white">Halaman ini adalah halaman untuk Juri menambah dan mengurangi score peserta</div>
                    <div className="absolute bottom-4 right-6 text-white">
                        <FaArrowRightLong className="h-8 w-8" />
                    </div>
                </Link>
            </div>
        </main>
    );
}
