import { HeaderEdit } from "@/components/header";
import styles from "@/styles/layout/edit.module.scss";

export default function Layout({ children, contentState, editId, questionValue, answerValues, card }) {
    return (
        <>
            <HeaderEdit contentState={contentState} editId={editId} questionValue={questionValue} answerValues={answerValues} card={card} />
            <main className={`${styles.module} ${contentState === "setting" ? styles.setting : ""} ${contentState === "category" ? styles.category : ""}`}>
                <div className={styles.inner}>
                    { children }
                </div>
            </main>
        </>
    )
}