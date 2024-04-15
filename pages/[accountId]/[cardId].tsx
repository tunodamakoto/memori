import Link from 'next/link';
import Layout from "@/components/layout/main";
import styles from "@/styles/account/card.module.scss";

const AccountCard = () => {
    return(
        <>
            <Layout>
                <h2 className={styles.title}>原理・研究法・歴史</h2>
                <p className={styles.text}>テキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキスト</p>
                <p className={styles.cate}>心理学検定</p>
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
            </Layout>
        </>
    )
}

export default AccountCard;