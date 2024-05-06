import { HeaderEditCate } from "@/components/header";
import styles from "@/styles/layout/edit.module.scss";

export default function Layout({ children }) {
    return (
        <>
            <HeaderEditCate />
            <main className={styles.module}>
                <div className={styles.inner}>
                    { children }
                </div>
            </main>
        </>
    )
}