import Header from "@/components/header";
import HeaderNav from "@/components/headerNav";
import Footer from "@/components/footer";
import HeaderBread from "@/components/headerBread";
import styles from "@/styles/layout/main.module.scss";

export default function Layout({ children }) {
    return(
        <>
            <Header />
            <HeaderNav />
            <HeaderBread />
            <main className={styles.module}>
                <div className={styles.inner}>
                    { children }
                </div>
            </main>
            <Footer />
        </>
    )
}