import { Poppins } from 'next/font/google';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div className={`${poppins.className} bg-pattern-dark h-full`}>{children}</div>;
}
