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
                userId: user.userId
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

export const StartBtn = () => {
    return(
        <div className={styles.start}>
            <Link href="#"><span>START</span></Link>            
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

    const {editId, questionValue, answerValues, smallCateValue, bigCateValue, setQuestionValue, setAnswerValues, setSmallCateValue, setBigCateValue} = props;

    const user = useAuth();

    const router = useRouter();

    const handleSubmit = async () => {
        let result = confirm("MEMORIを作成してもいいでしょうか？");
        if(result){
            await updateDoc(doc(db, "memores", editId.editId),{
                question: questionValue,
                answer: answerValues,
                smallCate: smallCateValue,
                bigCate: bigCateValue,
            })
            setQuestionValue("");
            setAnswerValues([]);
            setSmallCateValue("");
            setBigCateValue("");
            router.push(`/${user.userId}`);
        }
    }

    return(
        <div className={styles.editRelease}>
            <button onClick={handleSubmit}><span>RELEASE</span></button>
        </div>
    )
}