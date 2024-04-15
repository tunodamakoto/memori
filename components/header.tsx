import Link from 'next/link';
import styles from "@/styles/header.module.scss";
import { Baloo } from "@/styles/font";

export default function Header() {
    return(
        <header className={styles.module}>
            <div className={styles.inner}>
                <Link href="/">
                    <h1 className={`${styles.title} ${Baloo.className}`}>MEMORI</h1>
                </Link>
            </div>
        </header>
    )
}