import { useAuth } from "@/context/auth";
import { login } from "@/libs/auth";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { SignInAccountSetting } from "@/components/popup";
import styles from "@/styles/home/intro.module.scss";
import { useRouter } from "next/router";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { auth, db } from "@/libs/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Intro() {

    const user = useAuth();
    const [waiting, setWaiting] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    const signIn = async () => {
        setWaiting(true);
    
        login()
            .catch((error) => {
                console.error(error?.code);
            })
            .finally(async () => {
                const q = query(collection(db, "users"));
                const usesrSnapShot = await getDocs(q);
                if(!usesrSnapShot.size === undefined){
                    for(let i = 0; i < usesrSnapShot.size; i++){
                        const doc = usesrSnapShot.docs[i];
                        if(doc.data().nickname === undefined) {
                            setIsLoggedIn(true);
                        } else {
                            router.push(`/${doc.data().userId}`);
                        }
                    }
                } else {
                    setIsLoggedIn(true);
                }
                setWaiting(false);
            });
    };
    
    useEffect(() => {
        onAuthStateChanged(auth, async (firebaseUser) => {
            if(firebaseUser){
                if(user === undefined || user === null){
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            }
        });
    }, []);

    return(
        <>
            <div className={styles.module}>
                <p className={styles.text}>「MEMORI」はシンプルで使いやすさを重視した暗記帳アプリです。<br />あなたの勉強の小道具として使っていただけたら幸いです。<br />（※本アプリはテスト版なため、急遽アプリを閉鎖することがあります。）</p>
                {user === undefined || user === null  && !waiting && <button onClick={signIn} className={styles.btn}>はじめる</button>}
                {user && <Link href={`/${user.userId}`} className={styles.btn}>マイページ</Link>}
            </div>
            {isLoggedIn && !user && <SignInAccountSetting />}
        </>
    )
}