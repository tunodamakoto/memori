import styles from "@/styles/btn.module.scss";
import Link from 'next/link';
import { useAuth } from "@/context/auth";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc } from "firebase/firestore";
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
            await updateDoc(doc(db, "memores", user.userId), {
                memori: arrayUnion({
                    id: uuid,
                    userId: user.userId,
                })
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

export const EditNextBtn = (props) => {

    const {contentState, switchAnswer} = props;

    return(
        <>
            <FadeTransition show={contentState === "question"}>
                <div className={styles.editNext}>
                    <button onClick={switchAnswer}></button>
                </div>
            </FadeTransition>
            <FadeTransition show={contentState === "answer"}>
                <div className={styles.editNext}>
                    <button></button>
                </div>
            </FadeTransition>
        </>
    )
}

export const EditBtn = () => {
    return(
        <div className={styles.edit}>
            <div className={styles["edit__inner"]}>
                <div className={styles["edit__back"]}>
                    <button></button>
                </div>
                <div className={styles["edit__release"]}>
                    <button><span>RELEASE</span></button>
                </div>
                <div className={styles["edit__next"]}>
                    <button></button>
                </div>
            </div>
        </div>
    )
}