import styles from "@/styles/btn.module.scss";
import Link from 'next/link';
import { useAuth } from "@/context/auth";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "@/libs/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { v4 } from "uuid";
import FadeTransition from "./animation/FadeTransition";

export const AddBtn = () => {
    
    const user = useAuth();
    const router = useRouter();
    const [uuid, setUuid] = useState(v4());

    const addBtn = async () => {
        if(user !== undefined || user !== null){
            await setDoc(doc(db, "memores", uuid), {
                id: uuid,
                userId: user.userId,
                question: "",
                answer: [],
                card: {},
                category: {},
            })
            router.push(`/edit/${user.userId}/${uuid}`);
        }
    }

    return (
        user === null ? (
            <></>
        ) : (
            <div className={styles.add}>
                <button onClick={addBtn}></button>
            </div>
        )
    )
}

export const StartBtn = ({ memores, card }) => {

    const [data, setData] = useState(memores);
    const router = useRouter();

    const handleMemoriShuffle = () => {
        const newData = [...data];
        for (let i = newData.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newData[i], newData[j]] = [newData[j], newData[i]];
        }
        setData(newData);
        localStorage.setItem('memores', JSON.stringify(newData));
        router.push(`/memori/${newData[0].id}`)
    }

    return(
        <div className={styles.start}>
            <button onClick={handleMemoriShuffle}><span>START</span></button>            
        </div>
    )
}

export const EditBackBtn = (props) => {

    const {contentState, switchQuestion, switchAnswer} = props;

    return(
        <>
            <FadeTransition show={contentState === "answer"}>
                <div className={`${styles.editBack} ${styles.editBtn}`}>
                    <button onClick={switchQuestion}></button>
                </div>
            </FadeTransition>
            <FadeTransition show={contentState === "setting"}>
                <div className={`${styles.editBack} ${styles.editBtn}`}>
                    <button onClick={switchAnswer}></button>
                </div>
            </FadeTransition>
        </>
    )
}

export const EditNextBtn = (props) => {

    const {contentState, switchAnswer, switchSetting} = props;

    return(
        <>
            <FadeTransition show={contentState === "question"}>
                <div className={`${styles.editNext} ${styles.editBtn}`}>
                    <button onClick={switchAnswer}></button>
                </div>
            </FadeTransition>
            <FadeTransition show={contentState === "answer"}>
                <div className={`${styles.editNext} ${styles.editBtn}`}>
                    <button onClick={switchSetting}></button>
                </div>
            </FadeTransition>
        </>
    )
}

export const EditReleaseBtn = (props) => {

    const {editId, questionValue, answerValues, card, setQuestionValue, setAnswerValues, setCard} = props;

    const user = useAuth();

    const router = useRouter();

    const handleSubmit = async () => {
        if(card.id === undefined && card.name === undefined){
            alert("カテゴリーを選択してください。")
            return;
        } else {
            let result = confirm("MEMORIを作成してもいいでしょうか？");
            if(result){
                await updateDoc(doc(db, "memores", editId),{
                    question: questionValue,
                    answer: answerValues,
                    card: {id: card.id, name: card.name},
                    category: {id: card.category_id, name: card.category_name},
                })
                const q = query(collection(db, "memores"));
                const memoresSnapShot = await getDocs(q);
                const memoresData = memoresSnapShot.docs.map(doc => doc.data());
                const userMemori = memoresData.filter(data => data.userId === user.userId);
                const count = userMemori.filter(data => data.card.id === card.id).length;
                await updateDoc(doc(db, "cards", card.id),{
                    memori_num: count,
                })
                setQuestionValue("");
                setAnswerValues([]);
                setCard([]);
                router.push(`/${user.userId}`);
            }
        }
    }

    return(
        <div className={styles.editRelease}>
            <button onClick={handleSubmit}><span>RELEASE</span></button>
        </div>
    )
}

export const MemoriNextBtn = ({ nextMemori }) => {

    const router = useRouter();

    const handleNextMemori = () => {
        router.push(`/memori/${nextMemori.id}`);
    }

    return (
        <div className={`${styles.memoriBtn} ${styles["memoriBtn-next"]}`}>
            <button onClick={handleNextMemori}></button>
        </div>
    )
}

export const MemoriBackBtn = ({ previousMemori }) => {

    const router = useRouter();


    const handleBackMemori = () => {
        router.push(`/memori/${previousMemori.id}`);
    }

    return (
        <div className={`${styles.memoriBtn} ${styles["memoriBtn-back"]}`}>
            <button onClick={handleBackMemori}></button>
        </div>
    )
}

export const MemoriOpenBtn = ({ setMemoriOpen }) => {

    const handleOpenMemori = () => {
        setMemoriOpen(true);
    }

    return (
        <div className={`${styles.memoriBtn} ${styles["memoriBtn-open"]}`}>
            <button onClick={handleOpenMemori}></button>
        </div>
    )
}

export const MemoriCloseBtn = ({ setMemoriOpen }) => {

    const handleCloseMemori = () => {
        setMemoriOpen(false);
    }

    return (
        <div className={`${styles.memoriBtn} ${styles["memoriBtn-close"]}`}>
            <button onClick={handleCloseMemori}></button>
        </div>
    )
}