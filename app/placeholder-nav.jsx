import Link from "next/link";

export default function PlaceholderNav() {
  return (
    <header className="placeholder-header">
      <Link className="placeholder-brand" href="/">
        <img src="/assets/images/logo-3.webp" alt="Shree Ram Mattress" />
        <span>SHREERAM MATTRESS</span>
      </Link>
      <nav aria-label="Primary navigation">
        <Link href="/">Home</Link>
        <Link href="/layers">Layers</Link>
        <Link href="/collections">Collections</Link>
      </nav>
    </header>
  );
}
