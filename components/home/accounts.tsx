import Link from 'next/link';
import styles from "@/styles/home/accounts.module.scss";

export default function Accounts() {
    return (
        <div className={styles.module}>
            <h2 className={styles.title}>他の方のMEMORIを見る</h2>
            <ul className={styles.list}>
                <li className={styles.card}>
                    <Link href="/MAKO">
                        <div className={`${styles["card__icon"]} ${styles.red}`}></div>
                        <div className={styles["card__desc"]}>
                            <h3 className={styles["card__desc__name"]}>MAKO</h3>
                            <p className={styles["card__desc__position"]}>webクリエイター</p>
                        </div>
                    </Link>
                </li>
                <li className={styles.card}>
                    <Link href="/NEKO">
                        <div className={`${styles["card__icon"]} ${styles.yello}`}></div>
                        <div className={styles["card__desc"]}>
                            <h3 className={styles["card__desc__name"]}>NEKO</h3>
                            <p className={styles["card__desc__position"]}>受験生</p>
                        </div>
                    </Link>
                </li>
                <li className={styles.card}>
                    <Link href="/RIKU">
                        <div className={`${styles["card__icon"]} ${styles.green}`}></div>
                        <div className={styles["card__desc"]}>
                            <h3 className={styles["card__desc__name"]}>RIKU</h3>
                            <p className={styles["card__desc__position"]}>心理学者</p>
                        </div>
                    </Link>
                </li>
                <li className={styles.card}>
                    <Link href="/MAKO">
                        <div className={`${styles["card__icon"]} ${styles.blue}`}></div>
                        <div className={styles["card__desc"]}>
                            <h3 className={styles["card__desc__name"]}>MAKO</h3>
                            <p className={styles["card__desc__position"]}>webクリエイター</p>
                        </div>
                    </Link>
                </li>
                <li className={styles.card}>
                    <Link href="/NEKO">
                        <div className={`${styles["card__icon"]} ${styles.pink}`}></div>
                        <div className={styles["card__desc"]}>
                            <h3 className={styles["card__desc__name"]}>NEKO</h3>
                            <p className={styles["card__desc__position"]}>受験生</p>
                        </div>
                    </Link>
                </li>
                <li className={styles.card}>
                    <Link href="/RIKU">
                        <div className={`${styles["card__icon"]} ${styles.purple}`}></div>
                        <div className={styles["card__desc"]}>
                            <h3 className={styles["card__desc__name"]}>RIKU</h3>
                            <p className={styles["card__desc__position"]}>心理学者</p>
                        </div>
                    </Link>
                </li>
            </ul>
        </div>
    )
}