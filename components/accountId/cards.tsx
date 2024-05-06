import Link from 'next/link';
import Image from "next/image";
import styles from "@/styles/accountId/cards.module.scss";
import { useRouter } from 'next/router';
import setting from "@/public/setting.svg";
import { useAuth } from '@/context/auth';
import { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '@/libs/firebase';

export default function Cards(props) {

    const {categories, cards} = props;

    const user = useAuth();
    const router = useRouter();
    const url = router.asPath.replace('/', '');
    const [activeCategory, setActiveCategory] = useState(null);

    const handleTabClick = (categoryId) => {
        setActiveCategory(categoryId);
    };

    const filteredCards = activeCategory ? cards.filter(card => card.category.id === activeCategory) : cards;

    return(
        <>
            <div className={styles.category}>
                <ul className={styles["category__list"]}>
                    {user && user.userId === router.query.accountId && (
                        <li className={`${styles["category__item"]} ${styles["category__item-setting"]}`}>
                            <Link href="/edit/category">
                                <Image src={setting} alt="" />
                            </Link>
                        </li>
                    )}
                    <li className={`${styles["category__item"]} ${activeCategory === null ? styles.on : ''}`}>
                        <button onClick={() => handleTabClick(null)}>全て</button>
                    </li>
                    {categories.slice().reverse().map((data) => (
                        <li className={`${styles["category__item"]} ${activeCategory === data.id ? styles.on : ''}`} key={data.id}>
                            <button onClick={() => handleTabClick(data.id)}>{data.name}</button>
                        </li>                    
                    ))}
                </ul>
            </div>
            <div className={styles.card}>
                {filteredCards.length === 0 ? (
                    <p className={styles["card__empty"]}>空です。</p>
                ):(
                    <ul className={styles["card__list"]}>
                        {filteredCards.slice().reverse().map((data) => (
                            <li className={styles["card__item"]} key={data.id}>
                                <article className={styles["card__item"]}>
                                    <Link href={`/${url}/${data.id}`}>
                                        <h3 className={styles["card__item__title"]}>{data.name}（{data.memori_num}）</h3>
                                        <p className={styles["card__item__cate"]}>{data.category.name}</p>
                                    </Link>
                                </article>
                            </li>                        
                        ))}
                    </ul>
                )}
            </div>
        </>
    )
}