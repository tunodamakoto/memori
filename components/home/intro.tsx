import styles from "@/styles/home/intro.module.scss";

export default function Intro() {
    return(
        <div className={styles.module}>
            <p className={styles.text}>「MEMORI」はシンプルで使いやすさを重視した暗記帳アプリです。<br />あなたの勉強の小道具として使っていただけたら幸いです。<br />（※本アプリはテスト版なため、急遽アプリを閉鎖することがあります。）</p>
            <button className={styles.btn}>はじめる</button>
        </div>
    )
}