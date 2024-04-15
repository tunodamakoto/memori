import Link from 'next/link';
import styles from "@/styles/headerBread.module.scss";

export default function HeaderBread() {
    return(
        <div className={styles.module}>
            <div className={styles.inner}>
                <ul className={styles.bread}>
                    <li className={`${styles["bread__item"]} ${styles["bread__item-home"]}`}>
                        <Link href="#">
                            <span className={`${styles.icon} ${styles.red}`}></span>
                            <span>Mako</span>
                        </Link>
                    </li>
                    <li className={styles["bread__item"]}>
                        <Link href="#">心理学検定</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}