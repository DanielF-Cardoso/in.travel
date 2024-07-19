export function NotFound() {
    return (
        <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
            <div className="max-w-3xl w-full px-6 text-center space-y-10">
                <div className="flex flex-col items-center gap-3">
                    <img src="/logo.svg" alt="IN.TRAVEL" className="w-56" />
                    <p className="text-gray-500 text-lg font-semibold">404</p>
                    <p className="text-gray-150 text-2xl font-semibold">Oops, não encontramos essa página.</p>
                </div>
            </div>
        </div>
    )
}