export default function TesLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <h1 className="text-3xl font-bold underline">Hello world!</h1>
            {children}
        </>
    );
}
