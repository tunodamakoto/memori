import Layout from "@/components/layout/memori";
import styles from "@/styles/account/memori.module.scss";

const AccountCardMemori = () => {
    return(
        <>
            <Layout>
                <div className={styles.module}>
                    <h2 className={styles.title}>法則定立的とは？</h2>
                    <p className={styles.page}>1/8</p>
                </div>
            </Layout>
        </>
    )
}

export default AccountCardMemori;