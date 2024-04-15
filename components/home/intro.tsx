import { useAuth } from "@/context/auth";
import { login } from "@/libs/auth";
import { useState } from "react";
import Link from 'next/link';
import styles from "@/styles/home/intro.module.scss";

export default function Intro() {

    const user = useAuth();
    const [waiting, setWaiting] = useState<boolean>(false);
  
    const signIn = () => {
      setWaiting(true);
  
      login()
        .catch((error) => {
            console.error(error?.code);
        })
        .finally(() => {
            setWaiting(false);
        });
    };

    return(
        <div className={styles.module}>
            <p className={styles.text}>「MEMORI」はシンプルで使いやすさを重視した暗記帳アプリです。<br />あなたの勉強の小道具として使っていただけたら幸いです。<br />（※本アプリはテスト版なため、急遽アプリを閉鎖することがあります。）</p>
            {user === null && !waiting && <button onClick={signIn} className={styles.btn}>はじめる</button>}
            {user && <Link href="#" className={styles.btn}>マイページ</Link>}
        </div>
    )
}