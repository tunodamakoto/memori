import Link from 'next/link';
import styles from "@/styles/account/category.module.scss";

export default function Category() {
    return(
        <div className={styles.module}>
            <ul className={styles.list}>
                <li className={`${styles.item} ${styles.on}`}>
                    <Link href="#">全て</Link>
                </li>
                <li className={`${styles.item}`}>
                    <Link href="#">心理学検定</Link>
                </li>
                <li className={`${styles.item}`}>
                    <Link href="#">生物学</Link>
                </li>
                <li className={`${styles.item}`}>
                    <Link href="#">プログラミング</Link>
                </li>
                <li className={`${styles.item}`}>
                    <Link href="#">英単語</Link>
                </li>
                <li className={`${styles.item}`}>
                    <Link href="#">数学の公式</Link>
                </li>
            </ul>
        </div>
    )
}