import Link from 'next/link';
import Image from "next/image";
import styles from "@/styles/accountId/category.module.scss";
import setting from "@/public/setting.svg";
import { useAuth } from '@/context/auth';
import { useRouter } from 'next/router';

export default function Category() {

    const user = useAuth();
    const router = useRouter();

    return(
        <div className={styles.module}>
            <ul className={styles.list}>
                {user.userId === router.query.accountId && (
                    <li className={`${styles.item} ${styles["item-setting"]}`}>
                        <Link href="/edit/category">
                            <Image src={setting} alt="" />
                        </Link>
                    </li>
                )}
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