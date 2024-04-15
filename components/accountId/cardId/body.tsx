import Link from 'next/link';
import styles from "@/styles/accountId/cardId/body.module.scss";

export default function Body() {
    return (
        <ul className={styles.list}>
            <li className={styles.item}>
                <article className={styles.memori}>
                    <Link href="/MAKO/111/memori">
                        <h3 className={styles["memori__title"]}>法則定立的とは？</h3>
                    </Link>
                    <div className={styles["memori__switch"]}>
                        <div className={styles["memori__switch__inner"]}>
                            <input type="checkbox" />
                        </div>
                    </div>
                </article>
            </li>
            <li className={styles.item}>
                <article className={styles.memori}>
                    <Link href="/MAKO/111/memori">
                        <h3 className={styles["memori__title"]}>個性記述的研究とは？</h3>
                    </Link>
                    <div className={styles["memori__switch"]}>
                        <div className={styles["memori__switch__inner"]}>
                            <input type="checkbox" />
                        </div>
                    </div>
                </article>
            </li>
            <li className={styles.item}>
                <article className={styles.memori}>
                    <Link href="/MAKO/111/memori">
                        <h3 className={styles["memori__title"]}>横断的研究とは？</h3>
                    </Link>
                    <div className={styles["memori__switch"]}>
                        <div className={styles["memori__switch__inner"]}>
                            <input type="checkbox" />
                        </div>
                    </div>
                </article>
            </li>
            <li className={styles.item}>
                <article className={styles.memori}>
                    <Link href="/MAKO/111/memori">
                        <h3 className={styles["memori__title"]}>縦断的研究とは？</h3>
                    </Link>
                    <div className={styles["memori__switch"]}>
                        <div className={styles["memori__switch__inner"]}>
                            <input type="checkbox" />
                        </div>
                    </div>
                </article>
            </li>
            <li className={styles.item}>
                <article className={styles.memori}>
                    <Link href="/MAKO/111/memori">
                        <h3 className={styles["memori__title"]}>独立変数とは？</h3>
                    </Link>
                    <div className={styles["memori__switch"]}>
                        <div className={styles["memori__switch__inner"]}>
                            <input type="checkbox" />
                        </div>
                    </div>
                </article>
            </li>
            <li className={styles.item}>
                <article className={styles.memori}>
                    <Link href="/MAKO/111/memori">
                        <h3 className={styles["memori__title"]}>従属変数とは？</h3>
                    </Link>
                    <div className={styles["memori__switch"]}>
                        <div className={styles["memori__switch__inner"]}>
                            <input type="checkbox" />
                        </div>
                    </div>
                </article>
            </li>
            <li className={styles.item}>
                <article className={styles.memori}>
                    <Link href="/MAKO/111/memori">
                        <h3 className={styles["memori__title"]}>媒介変数とは？</h3>
                    </Link>
                    <div className={styles["memori__switch"]}>
                        <div className={styles["memori__switch__inner"]}>
                            <input type="checkbox" />
                        </div>
                    </div>
                </article>
            </li>
        </ul>
    )
}