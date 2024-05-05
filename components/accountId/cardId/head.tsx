import FadeTransition from "@/components/animation/FadeTransition";
import styles from "@/styles/accountId/cardId/head.module.scss";
import { useState } from "react";

export default function Head(props) {

    const { card } = props;

    const [toggleNav, setToggleNav] = useState(false);
    const handleToggleNav = () => {
        setToggleNav(!toggleNav);
    }

    return (
        <>
            <div className={styles.head}>
                <h2 className={styles["head__title"]}>{card.name}</h2>
                <button className={`${styles["head__edit"]} ${toggleNav ? styles.on : ""}`} onClick={handleToggleNav}></button>
                <FadeTransition show={toggleNav}>
                    <ul className={styles["head__nav"]}>
                        <li className={`${styles["head__nav__item"]} ${styles["head__nav__item-edit"]}`}>編集</li>
                        <li className={`${styles["head__nav__item"]} ${styles["head__nav__item-delete"]}`}>削除</li>
                    </ul>
                </FadeTransition>
            </div>
            <p className={styles.text}>{card.explain}</p>
            <p className={styles.cate}>{card.category.name}</p>
        </>
    )
}