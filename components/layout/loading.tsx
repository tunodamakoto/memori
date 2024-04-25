import styles from "@/styles/layout/loading.module.scss";

export default function Layout({ children }) {
    return(
        <>
            <main className={styles.module}>
                <div className={styles.inner}>
                    { children }
                </div>
            </main>
        </>
    )
}