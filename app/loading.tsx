export default function Loading() {
    return (
        <div className="h-screen">
            <div className="h-screen flex flex-col items-center justify-center">
                <div className="text-4xl text-tertiary font-bold mb-4">Loading...</div>
                <div className="w-12 h-12 border-8 border-t-8 border-t-tertiary border-gray-200 rounded-full animate-spin"></div>
            </div>
        </div>
    );
}
