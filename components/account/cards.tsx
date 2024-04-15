import Link from 'next/link';
import styles from "@/styles/account/cards.module.scss";

export default function Cards() {
    return(
        <div className={styles.module}>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <article className={styles.card}>
                        <Link href="/MAKO/111">
                            <h3 className={styles.title}>原理・研究法・歴史（8）</h3>
                            <p className={styles.cate}>心理学検定</p>
                        </Link>
                    </article>
                </li>
                <li className={styles.item}>
                    <article className={styles.card}>
                        <Link href="/MAKO/111">
                            <h3 className={styles.title}>学習・認知・知覚（12）</h3>
                            <p className={styles.cate}>心理学検定</p>
                        </Link>
                    </article>
                </li>
                <li className={styles.item}>
                    <article className={styles.card}>
                        <Link href="/MAKO/111">
                            <h3 className={styles.title}>発達・教育（6）</h3>
                            <p className={styles.cate}>心理学検定</p>
                        </Link>
                    </article>
                </li>
                <li className={styles.item}>
                    <article className={styles.card}>
                        <Link href="/MAKO/111">
                            <h3 className={styles.title}>社会・感情・性格（9）</h3>
                            <p className={styles.cate}>心理学検定</p>
                        </Link>
                    </article>
                </li>
                <li className={styles.item}>
                    <article className={styles.card}>
                        <Link href="/MAKO/111">
                            <h3 className={styles.title}>臨床・障害（11）</h3>
                            <p className={styles.cate}>心理学検定</p>
                        </Link>
                    </article>
                </li>
                <li className={styles.item}>
                    <article className={styles.card}>
                        <Link href="/MAKO/111">
                            <h3 className={styles.title}>神経・生理（14）</h3>
                            <p className={styles.cate}>心理学検定</p>
                        </Link>
                    </article>
                </li>
                <li className={styles.item}>
                    <article className={styles.card}>
                        <Link href="/MAKO/111">
                            <h3 className={styles.title}>統計・測定・評価（4）</h3>
                            <p className={styles.cate}>心理学検定</p>
                        </Link>
                    </article>
                </li>
                <li className={styles.item}>
                    <article className={styles.card}>
                        <Link href="/MAKO/111">
                            <h3 className={styles.title}>産業・組織（10）</h3>
                            <p className={styles.cate}>心理学検定</p>
                        </Link>
                    </article>
                </li>
                <li className={styles.item}>
                    <article className={styles.card}>
                        <Link href="/MAKO/111">
                            <h3 className={styles.title}>健康・福祉（11）</h3>
                            <p className={styles.cate}>心理学検定</p>
                        </Link>
                    </article>
                </li>
                <li className={styles.item}>
                    <article className={styles.card}>
                        <Link href="/MAKO/111">
                            <h3 className={styles.title}>犯行・非行（9）</h3>
                            <p className={styles.cate}>心理学検定</p>
                        </Link>
                    </article>
                </li>
            </ul>
        </div>
    )
}