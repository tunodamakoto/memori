import styles from "@/styles/popup.module.scss";
import FadeTransition from "@/components/animation/FadeTransition";
import { useState } from "react";
import { useRouter } from "next/router";
import { collection, query, where, getDocs, doc, setDoc, addDoc, arrayUnion } from "firebase/firestore";
import { auth, db } from "@/libs/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const SignInAccountSetting = () => {

    const [userId, setUserId] = useState("");
    const [nickname, setNickname] = useState("");
    const [post, setPost] = useState("");
    const [icon, setIcon] = useState("");

    const [formType, setFormType] = useState("input");

    const router = useRouter();

    const handleConfirm = async () => {
        if(userId && nickname && post && icon) {
            const q = query(collection(db, "users"));
            const usersSnapshot = await getDocs(q);
            for (let i = 0; i < usersSnapshot.size; i++) {
                const doc = usersSnapshot.docs[i];
                if (doc.data().userId === userId) {
                    alert('ユーザーIDが他の方と同じです。違うIDをご記入ください。');
                    setFormType("input");
                    return;
                }
            }
            onAuthStateChanged(auth, async (firebaseUser) => {
                await setDoc(doc(db, "users", userId), {
                    id: firebaseUser.uid,
                    name: firebaseUser.displayName,
                    email: firebaseUser.email,
                    userId: userId,
                    nickname: nickname,
                    post: post,
                    icon: icon
                });
            });

            await setDoc(doc(db, "memores", userId),{
                memori: arrayUnion({})
            })

            setFormType("confirm");
        } else {
            alert("未記入のフォームがあります。");
        }
    }

    const handleCansel = () => {
        setFormType('input');
    }

    const handleSubmit = () => {
        router.push(`/${userId}`);
    }
    
    return (
        <div className={styles.module}>
            <div className={styles.inner}>
                <FadeTransition show={formType === "input"}>
                    <div className={styles.content}>
                        <p className={styles.title}>アカウント作成</p>
                        <div className={styles.form}>
                            <div className={styles["form__input"]}>
                                <label htmlFor="userId">ユーザーID</label>
                                <input type="text" placeholder="mako_123" onChange={(e) => setUserId(e.target.value)} value={userId} />
                            </div>
                            <div className={styles["form__input"]}>
                                <label htmlFor="nickname">ニックネーム</label>
                                <input type="text" placeholder="MAKO" onChange={(e) => setNickname(e.target.value)} value={nickname} />
                            </div>
                            <div className={styles["form__input"]}>
                                <label htmlFor="post">肩書き</label>
                                <input type="text" placeholder="webクリエイター" onChange={(e) => setPost(e.target.value)} value={post} />
                            </div>
                            <div className={styles["form__icon"]}>
                                <label htmlFor="icon">アイコン</label>
                                <div className={styles["form__icon__list__outer"]}>
                                    <ul className={styles["form__icon__list"]}>
                                        <li className={styles["form__icon__item"]}>
                                            <input type="radio" id="red" name="icon" value="red" className={styles.red} onChange={(e) => setIcon(e.target.value)} checked={icon === "red" ? true : false} />
                                        </li>
                                        <li className={styles["form__icon__item"]}>
                                            <input type="radio" id="yello" name="icon" value="yello" className={styles.yello} onChange={(e) => setIcon(e.target.value)} checked={icon === "yello" ? true : false} />
                                        </li>
                                        <li className={styles["form__icon__item"]}>
                                            <input type="radio" id="green" name="icon" value="green" className={styles.green} onChange={(e) => setIcon(e.target.value)} checked={icon === "green" ? true : false} />
                                        </li>
                                        <li className={styles["form__icon__item"]}>
                                            <input type="radio" id="blue" name="icon" value="blue" className={styles.blue} onChange={(e) => setIcon(e.target.value)} checked={icon === "blue" ? true : false} />
                                        </li>
                                        <li className={styles["form__icon__item"]}>
                                            <input type="radio" id="pink" name="icon" value="pink" className={styles.pink} onChange={(e) => setIcon(e.target.value)} checked={icon === "pink" ? true : false} />
                                        </li>
                                        <li className={styles["form__icon__item"]}>
                                            <input type="radio" id="purple" name="icon" value="purple" className={styles.purple} onChange={(e) => setIcon(e.target.value)} checked={icon === "purple" ? true : false} />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={styles["form__btn"]}>
                                <button onClick={handleConfirm}>確認する</button>
                            </div>
                        </div>
                    </div>
                </FadeTransition>
                <FadeTransition show={formType === "confirm"}>
                    <div className={styles.content}>
                        <p className={styles.title}>アカウント確認</p>
                        <div className={styles.form}>
                            <div className={styles["form__input"]}>
                                <label htmlFor="userId">ユーザーID</label>
                                <input type="text" value={userId} readOnly />
                            </div>
                            <div className={styles["form__input"]}>
                                <label htmlFor="nickname">ニックネーム</label>
                                <input type="text" value={nickname} readOnly />
                            </div>
                            <div className={styles["form__input"]}>
                                <label htmlFor="post">肩書き</label>
                                <input type="text" value={post} readOnly />
                            </div>
                            <div className={styles["form__icon"]}>
                                <label htmlFor="icon">アイコン</label>
                                <div className={styles["form__icon__list__outer"]}>
                                    <ul className={styles["form__icon__list"]}>
                                        <li className={styles["form__icon__item"]}>
                                            <input type="radio" name="icon" value={icon} className={styles[icon]} />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={`${styles["form__btn"]} ${styles["form__btn-col"]}`}>
                                <button onClick={handleCansel}>戻る</button>
                                <button onClick={handleSubmit}>作成する</button>
                            </div>
                        </div>
                    </div>
                </FadeTransition>
            </div>
        </div>
    )
}