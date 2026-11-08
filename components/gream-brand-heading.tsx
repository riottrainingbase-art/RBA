import Image from "next/image";
import styles from "./gream-brand-heading.module.css";

type GreamBrandHeadingProps = {
  id?: string;
  team?: "GREAM SENDAI" | "DSM GREAM AKITA";
};

export function GreamBrandHeading({ id, team }: GreamBrandHeadingProps) {
  return (
    <h1 id={id} className={styles.heading}>
      {/* Wordmark cropped from the original 2026 Shizugawa joint camp poster. */}
      <Image
        src="/media/gream/gream-wordmark-shizugawa.png"
        alt={team ? "" : "GREAM"}
        width={575}
        height={206}
        unoptimized
        loading="eager"
        className={styles.wordmark}
      />
      <span className={styles.label}>
        {team ? <>{team} <small>U15</small></> : "DEVELOPMENT PROJECT"}
      </span>
    </h1>
  );
}
