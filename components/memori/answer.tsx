import styles from "@/styles/memori/content.module.scss";

export default function Answer({ memori }) {

    return(
        <div className={styles.module}>
            <h2 className={styles.title}>{memori.question}</h2>
            <ul className={styles.list}>
                {memori.answer.map((data) => (
                    <li className={styles["list__item"]} key={data.id}>{data.value}</li>
                ))}
            </ul>
        </div>
    )
}