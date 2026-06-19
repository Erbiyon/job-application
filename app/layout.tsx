import type { Metadata } from "next";
import { Google_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"

const googleSans = Google_Sans({
    variable: "--font-google-sans",
    subsets: ["latin"],
    weight: ["400", "500", "700"]
});

export const metadata: Metadata = {
    title: "MyJob Application",
    description: "อนาคตของการสมัครงานของคุณ",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${googleSans.className} h-full antialiased`}
            suppressHydrationWarning
        >
            <body className="min-h-full flex flex-col">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
