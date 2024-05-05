import Link from 'next/link';
import styles from "@/styles/header.module.scss";
import { Baloo } from "@/styles/font";
import { useAuth } from '@/context/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { login } from '@/libs/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/libs/firebase';
import { SignInAccountSetting } from '@/components/popup';
import FadeTransition from './animation/FadeTransition';

export const Header = () => {
    return(
        <header className={styles.header}>
            <div className={styles["header__inner"]}>
                <Link href="/">
                    <h1 className={`${styles["header__title"]} ${Baloo.className}`}>MEMORI</h1>
                </Link>
            </div>
        </header>
    )
}


export const HeaderNav = () => {

    const user = useAuth();
    const [isHeaderNav, setIsHeaderNav] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if(user === null) {
            setIsHeaderNav(true);
        } else if(user === undefined) {
            setIsHeaderNav(true);
        } else {
            setIsHeaderNav(false);
        }
    }, [user])

    const signIn = async () => {
    
        login()
            .catch((error) => {
                console.error(error?.code);
            })
            .finally(async () => {
                const q = query(collection(db, "users"));
                const usesrSnapShot = await getDocs(q);
                for(let i = 0; i < usesrSnapShot.size; i++){
                    const doc = usesrSnapShot.docs[i];
                    if(doc.data().nickname === undefined) {
                        setIsLoggedIn(true);
                    } else {
                        router.push(`/${doc.data().userId}`);
                    }
                }
            });
    };

    return(
        <>
            {isHeaderNav ? (
                <>
                    <div className={styles.headerNav} onClick={signIn}>
                        <div className={styles["headerNav__inner"]}>
                            <p className={styles["headerNav__text"]}>ログイン・アカウント登録はこちらから</p>
                        </div>
                    </div>
                    {isLoggedIn && <SignInAccountSetting />}
                </>
            ):(
                <>
                    <div className={styles.headerNav}>
                        <div className={styles["headerNav__inner"]}>
                            <p className={styles["headerNav__text"]}>本アプリについてのご要望はこちらから</p>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}


export const HeaderBread = () => {

    const [user, setUser] = useState([]);

    const router = useRouter();

    useEffect(() => {
        const URL = router.asPath.replace(/^\/(.*?)\/?/, '');
        const url = URL.split('/')[0];
        const getUsers = async () => {
            const q = query(collection(db, "users"), where("userId", "==", url ));
            const usersSnapshot = await getDocs(q);
            const usersData = usersSnapshot.docs.map(doc => doc.data());
            setUser(usersData);
        };
        getUsers();
    }, [router.asPath]);

    return(
        <div className={styles.headerBread}>
            <div className={styles["headerBread__inner"]}>
                <ul className={styles["headerBread__bread"]}>
                    <li className={`${styles["headerBread__bread__item"]} ${styles["bread__item-home"]}`}>
                        <Link href={`/${user[0]?.userId}`}>
                            <span className={`${styles.icon} ${styles[user[0]?.icon]}`}></span>
                            <span>{user[0]?.nickname}</span>
                        </Link>
                    </li>
                    <li className={styles["headerBread__bread__item"]}>
                        <Link href="#">心理学検定</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}


export const HeaderEdit = ({ contentState }) => {
    return (
        <>
        <FadeTransition show={contentState === "question"}>
            <div className={styles.headerEdit}>
                <div className={styles["headerEdit__inner"]}>
                    <button className={styles["headerEdit__cancel"]}></button>
                    <p className={styles["headerEdit__text"]}>問題を記入</p>
                </div>
            </div>
        </FadeTransition>
        <FadeTransition show={contentState === "answer"}>
            <div className={styles.headerEdit}>
                <div className={styles["headerEdit__inner"]}>
                    <button className={styles["headerEdit__cancel"]}></button>
                    <p className={styles["headerEdit__text"]}>解答を記入</p>
                </div>
            </div>
        </FadeTransition>
        <FadeTransition show={contentState === "setting"}>
            <div className={styles.headerEdit}>
                <div className={styles["headerEdit__inner"]}>
                    <button className={styles["headerEdit__cancel"]}></button>
                    <p className={styles["headerEdit__text"]}>設定</p>
                </div>
            </div>
        </FadeTransition>
        <FadeTransition show={contentState === "category"}>
            <div className={styles.headerEdit}>
                <div className={styles["headerEdit__inner"]}>
                    <button className={styles["headerEdit__cancel"]}></button>
                    <p className={styles["headerEdit__text"]}>カテゴリーの編集</p>
                </div>
            </div>
        </FadeTransition>
        </>
    )
}


export const HeaderMemori = ({ card }) => {
    return(
        <div className={styles.headerMemori}>
            <div className={styles["headerMemori__inner"]}>
                <button className={styles["headerMemori__cancel"]}></button>
                <p className={styles["headerMemori__text"]}>{card.name}（{card.category.name}）</p>
            </div>
        </div>
    )    
}