import Link from 'next/link';
import styles from "@/styles/accountId/cardId/body.module.scss";
import { useEffect, useState } from 'react';
import FadeTransition from '@/components/animation/FadeTransition';
import { useRouter } from 'next/router';

export default function Body(props) {

    const { memores } = props;

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
        // const startIndex = memores.findIndex(item => item.id === id);
        // const memoresSpecified = startIndex !== -1 ? memores.slice(startIndex) : [];
        localStorage.setItem('memores', JSON.stringify(memores));
        router.push(`/memori/${id}`);
    }

    return (
        <>
            {memores.length === 0 ? (
                <p className={styles.empty}>空です。</p>
            ) : (
                <ul className={styles.list}>
                    {memores.map((data) => (
                        <li className={styles.item} key={data.id}>
                            <article className={styles.memori}>
                                <div className={styles["memori__link"]} onClick={() => handleMemori(data.id)}>
                                    <h3 className={styles["memori__title"]}>{data.question}</h3>
                                </div>
                                <div className={styles["memori__edit"]}>
                                    <button className={`${styles["memori__edit__btn"]} ${toggleNavs[data.id] ? styles.on : ""}`} onClick={() => handleToggleNav(data.id)}></button>
                                </div>
                                <FadeTransition show={toggleNavs[data.id]}>
                                    <div className={styles["memori__nav"]}>
                                        <li className={`${styles["memori__nav__item"]} ${styles["memori__nav__item-edit"]}`} onClick={() => router.push(`/edit/${data.userId}/${data.id}`)}>編集</li>
                                        <li className={`${styles["memori__nav__item"]} ${styles["memori__nav__item-delete"]}`}>削除</li>
                                    </div>
                                </FadeTransition>
                            </article>
                        </li>                
                    ))}
                </ul>
            )}
        </>
    )
}