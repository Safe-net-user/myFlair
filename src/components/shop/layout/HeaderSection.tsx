import { Playfair_Display } from 'next/font/google';

const playfair_Display = Playfair_Display({
  subsets: ['latin'],
});

export default function HeaderSection({
  children,
  title,
}: Readonly<{
  children?: React.ReactNode;
  title: string;
}>) {
  return (
    <div
      className="bg-cover bg-center py-24"
      style={{
        background:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.75)), url('/nail-salon.webp')",
      }}
    >
      <div className="flex flex-col items-center justify-center px-6 text-center">
        <h1
          className={`${playfair_Display.className} text-[44px] font-bold leading-[34px] tracking-tight text-white`}
        >
          {title}
        </h1>
        {children && (
          <div className="mt-16 flex flex-col space-y-8 md:flex-row md:space-x-8 md:space-y-0">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
