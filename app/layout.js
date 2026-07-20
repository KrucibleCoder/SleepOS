import "@fontsource-variable/outfit";
import "../css/style.css";
import "../css/responsive.css";

export const metadata = {
  title: "SleepOS",
  description:
    "Premium mattresses crafted for deeper sleep, orthopedic support, and luxurious comfort.",
  icons: {
    icon: "/assets/images/logo-3.webp",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
