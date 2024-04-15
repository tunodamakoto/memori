import styles from "@/styles/headerNav.module.scss";

export default function HeaderNav() {
    return(
        <div className={styles.module}>
            <div className={styles.inner}>
                <p className={styles.text}>ログイン・アカウント登録はこちらから</p>
            </div>
        </div>
    )
}