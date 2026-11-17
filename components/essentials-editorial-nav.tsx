import Link from "next/link";

/**
 * Collection-local navigation. This is editorial navigation only and never
 * bypasses the server-side commerce readiness gates.
 */
export function EssentialsEditorialNav({ active }: { active: "collection" | "story" | "product" }) {
  const links = [
    { href: "/ja/essentials", label: "COLLECTION", key: "collection" },
    { href: "/ja/essentials/story", label: "OUR STORY", key: "story" },
    { href: "/ja/essentials#the-process", label: "OUR PROCESS", key: "process" },
    { href: "/ja/essentials#shop-information", label: "INFORMATION", key: "information" },
  ] as const;

  return (
    <nav aria-label="RBA ESSENTIALS ショップメニュー" className="essentials-editorial-nav">
      <Link className="essentials-editorial-nav-brand" href="/ja/essentials" aria-label="RBA ESSENTIALS コレクションのトップへ">
        RBA <span>ESSENTIALS</span>
      </Link>
      <div className="essentials-editorial-nav-links">
        {links.map((link) => (
          <Link key={link.key} href={link.href}
            aria-current={active === link.key ? "page" : undefined}>
            {link.label}
          </Link>
        ))}
      </div>
      <span className="essentials-editorial-nav-status">FIRST DROP / IN DEVELOPMENT</span>
    </nav>
  );
}
