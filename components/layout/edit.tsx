import { HeaderEdit } from "@/components/header";
import styles from "@/styles/layout/edit.module.scss";

export default function Layout({ children, contentState }) {
    return (
        <>
            <HeaderEdit contentState={contentState} />
            <main className={`${styles.module} ${contentState === "setting" ? styles.setting : ""}`}>
                <div className={styles.inner}>
                    { children }
                </div>
            </main>
        </>
    )
}