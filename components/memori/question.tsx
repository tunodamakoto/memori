import styles from "@/styles/memori/content.module.scss";

export default function Question({ memori }) {

    return(
        <div className={styles.module}>
            <h2 className={styles.title}>{memori.question}</h2>
        </div>
    )
}