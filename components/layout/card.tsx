import { Header, HeaderNav, HeaderBread } from "@/components/header";
import Footer from "@/components/footer";
import { AddBtn } from "@/components/btn";
import styles from "@/styles/layout/main.module.scss";

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <HeaderNav />
            <HeaderBread />
            <main className={styles.module}>
                <div className={styles.inner}>
                    { children }
                </div>
            </main>
            <AddBtn />
            <Footer />
        </>
    )
}