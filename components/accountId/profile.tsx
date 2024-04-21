import styles from "@/styles/accountId/profile.module.scss";

export default function Profile({ user }) {

    return(
        <div className={styles.module}>
            <div className={`${styles.icon} ${styles[user?.icon]}`}></div>
            <h2 className={styles.title}>{user?.nickname}</h2>
            <p className={styles.position}>{user?.post}</p>
        </div>
    )
}