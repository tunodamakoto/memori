import { HeaderEdit } from "@/components/header";
import styles from "@/styles/layout/memori.module.scss";

export default function Layout({ children, contentState }) {
    return (
        <>
            <HeaderEdit contentState={contentState} />
            <main className={styles.module}>
                <div className={styles.inner}>
                    { children }
                </div>
            </main>
        </>
    )
}