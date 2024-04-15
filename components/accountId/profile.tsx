import styles from "@/styles/accountId/profile.module.scss";

export default function Profile() {
    return(
        <div className={styles.module}>
            <div className={`${styles.icon} ${styles.red}`}></div>
            <h2 className={styles.title}>Mako</h2>
            <p className={styles.position}>webクリエイター</p>
        </div>
    )
}