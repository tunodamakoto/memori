import styles from "@/styles/headerMemori.module.scss";

export default function HeaderMemori() {
    return(
        <div className={styles.module}>
            <div className={styles.inner}>
                <button className={styles.cancel}></button>
                <p className={styles.text}>原理・研究法・歴史（心理学検定）</p>
            </div>
        </div>
    )
}