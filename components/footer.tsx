import Link from 'next/link';
import styles from "@/styles/footer.module.scss";
import { Baloo } from "@/styles/font";

export default function Footer() {
    return(
        <footer className={styles.module}>
            <Link href="/">
                <div className={`${styles.title} ${Baloo.className}`}>MEMORI</div>
            </Link>
            <p className={styles.copy}>© 2024 - MEMORI. All rights reserved</p>
        </footer>
    )
}