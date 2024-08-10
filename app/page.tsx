import Link from 'next/link';
import { FaArrowRightLong } from 'react-icons/fa6';
import { MdOutlineScreenshotMonitor } from 'react-icons/md';
import { RiUserSettingsLine } from 'react-icons/ri';

export default function Home() {
    return (
        <main className="flex flex-col container items-center lg:h-screen py-10 overflow-hidden">
            <nav className="w-full md:py-8 py-4 md:mb-8 mb-4 rounded-2xl bg-white shadow-lg flex items-center justify-center">
                <h1 className="md:text-4xl text-2xl font-bold text-primary">Choose Your Role</h1>
            </nav>
            <div className="grid lg:grid-cols-2 grid-cols-1 md:gap-8 gap-4 h-full">
                <Link
                    href="/player"
                    className="flex-1 shadow-lg md:py-20 pt-8 pb-16 text-center bg-gradient-to-br from-secondary to-primary rounded-2xl transform transition-transform duration-300 hover:scale-105"
                >
                    <div className="md:text-4xl text-3xl text-white font-bold">Player</div>

                    <div className="h-32 w-32 m-auto my-8 bg-white rounded-full flex items-center justify-center">
                        <MdOutlineScreenshotMonitor className="h-16 w-16 text-primary" />
                    </div>

                    <div className="md:text-lg md:mx-20 mx-8 text-white">Halaman ini adalah dashboard untuk menampilkan skor peserta</div>
                    <div className="absolute bottom-4 right-6 text-white">
                        <FaArrowRightLong className="h-8 w-8" />
                    </div>
                </Link>
                <Link
                    href="/referee"
                    className="flex-1 shadow-lg md:py-20 pt-8 pb-16 text-center bg-gradient-to-br from-quaternary to-tertiary rounded-2xl transform transition-transform duration-300 hover:scale-105"
                >
                    <div className="md:text-4xl text-3xl text-white font-bold">Referee</div>

                    <div className="h-32 w-32 m-auto my-8 bg-white rounded-full flex items-center justify-center">
                        <div className="w-16">
                            <RiUserSettingsLine className="h-16 w-16 text-tertiary" />
                        </div>
                    </div>

                    <div className="md:text-lg md:mx-20 mx-8 text-white">Halaman ini adalah menu untuk juri mengatur skor dan jalannya permainan</div>
                    <div className="absolute bottom-4 right-6 text-white">
                        <FaArrowRightLong className="h-8 w-8" />
                    </div>
                </Link>
            </div>
        </main>
    );
}
