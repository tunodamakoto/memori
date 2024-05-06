import Link from 'next/link';
import styles from "@/styles/accountId/cardId/body.module.scss";
import { useEffect, useState } from 'react';
import FadeTransition from '@/components/animation/FadeTransition';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/auth';
import { collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc } from 'firebase/firestore';
import { db } from '@/libs/firebase';

export default function Body(props) {

    const { memores } = props;
    const user = useAuth();

    const [toggleNavs, setToggleNavs] = useState({});
    const router = useRouter();

    const handleToggleNav = (id) => {
        setToggleNavs(prevState => {
            const updatedState = { ...prevState };
            if (updatedState[id] === false || updatedState[id] === true || updatedState[id] === "") {
                updatedState[id] = !prevState[id];
                Object.keys(updatedState).forEach(key => {
                    if (key !== id) {
                        updatedState[key] = false;
                    }
                });
            } else {
                updatedState[id] = true;
            }
            return updatedState;
        });
    }

    const handleMemori = (id) => {
        localStorage.setItem('memores', JSON.stringify(memores));
        router.push(`/memori/${id}`);
    }

    const handleMemoriDelete = async (id) => {
        const memoriSnap = await getDoc(doc(db, "memores", id));
        const memori = memoriSnap.data();
        let result = confirm(`「${memori.question}」を削除してもいいでしょうか？`);
        if(result){
            await deleteDoc(doc(db, "memores", id));
            const q = query(collection(db, "memores"));
            const memoresSnapShot = await getDocs(q);
            const memoresData = memoresSnapShot.docs.map(doc => doc.data());
            const userMemori = memoresData.filter(data => data.userId === user.userId);
            const count = userMemori.filter(data => data.card.id === memori.card.id).length;
            await updateDoc(doc(db, "cards", memori.card.id),{
                memori_num: count,
            })
            router.reload();
        }
    }

    return (
        <>
            {memores.length === 0 ? (
                <p className={styles.empty}>空です。</p>
            ) : (
                <ul className={styles.list}>
                    {memores.slice().reverse().map((data) => (
                        <li className={styles.item} key={data.id}>
                            <article className={styles.memori}>
                                <div className={styles["memori__link"]} onClick={() => handleMemori(data.id)}>
                                    <h3 className={styles["memori__title"]}>{data.question}</h3>
                                </div>
                                {user && user.userId === router.query.accountId && (
                                    <>
                                        <div className={styles["memori__edit"]}>
                                            <button className={`${styles["memori__edit__btn"]} ${toggleNavs[data.id] ? styles.on : ""}`} onClick={() => handleToggleNav(data.id)}></button>
                                        </div>
                                        <FadeTransition show={toggleNavs[data.id]}>
                                            <div className={styles["memori__nav"]}>
                                                <li className={`${styles["memori__nav__item"]} ${styles["memori__nav__item-edit"]}`} onClick={() => router.push(`/edit/${data.userId}/${data.id}`)}>編集</li>
                                                <li className={`${styles["memori__nav__item"]} ${styles["memori__nav__item-delete"]}`} onClick={() => handleMemoriDelete(data.id)}>削除</li>
                                            </div>
                                        </FadeTransition>
                                    </>
                                )}
                            </article>
                        </li>                
                    ))}
                </ul>
            )}
        </>
    )
}