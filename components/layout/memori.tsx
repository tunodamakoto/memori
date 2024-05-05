import { HeaderMemori } from "@/components/header";
import styles from "@/styles/layout/memori.module.scss";

export default function Layout({ children, card }) {
    return (
        <>
            <HeaderMemori card={card} />
            <main className={styles.module}>
                <div className={styles.inner}>
                    { children }
                </div>
            </main>
        </>
    )
}