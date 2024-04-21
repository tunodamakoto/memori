import { HeaderMemori } from "@/components/header";
import styles from "@/styles/layout/memori.module.scss";

export default function Layout({ children }) {
    return (
        <>
            <HeaderMemori />
            <main className={styles.module}>
                <div className={styles.inner}>
                    { children }
                </div>
            </main>
        </>
    )
}