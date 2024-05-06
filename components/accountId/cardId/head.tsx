import FadeTransition from "@/components/animation/FadeTransition";
import { useAuth } from "@/context/auth";
import { db } from "@/libs/firebase";
import styles from "@/styles/accountId/cardId/head.module.scss";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Head(props) {

    const { card } = props;
    const user = useAuth();
    const router = useRouter();

    const [toggleNav, setToggleNav] = useState(false);
    const handleToggleNav = () => {
        setToggleNav(!toggleNav);
    }

    const handleCardDelete = async () => {
        const result = confirm(`「${card.name}」を削除してもいいでしょうか？（※作成したMEMORIも削除されます）`)
        if(result) {
            const memoresSnapShot = await getDocs(query(collection(db, "memores"), where("cards.id", "==", card.id)));
            const memoresData = memoresSnapShot.docs.map(doc => doc.data());
            const memores = memoresData.filter(data => data.userId === user.userId);
            memores.map(async(data) => (
                await deleteDoc(doc(db, "memores", data.id))
            ))
            await deleteDoc(doc(db, "cards", card.id))
            router.push(`/${user.userId}`);
        }
    }

    return (
        <>
            <div className={styles.head}>
                <h2 className={styles["head__title"]}>{card.name}</h2>
                {user && user.userId === router.query.accountId && (
                    <>
                        <button className={`${styles["head__edit"]} ${toggleNav ? styles.on : ""}`} onClick={handleToggleNav}></button>
                        <FadeTransition show={toggleNav}>
                            <ul className={styles["head__nav"]}>
                                <li className={`${styles["head__nav__item"]} ${styles["head__nav__item-edit"]}`}>編集</li>
                                <li className={`${styles["head__nav__item"]} ${styles["head__nav__item-delete"]}`} onClick={handleCardDelete}>削除</li>
                            </ul>
                        </FadeTransition>
                    </>
                )}
            </div>
            <p className={styles.text}>{card.explain}</p>
            <p className={styles.cate}>{card.category.name}</p>
        </>
    )
}