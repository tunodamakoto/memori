import Layout from "@/components/layout/edit";
import Question from "@/components/edit/question";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/libs/firebase";
import { useRouter } from "next/router";
import { useAuth } from "@/context/auth";
import { useEffect, useState } from "react";
import FadeTransition from "@/components/animation/FadeTransition";
import { EditNextBtn } from "@/components/btn";
import Answer from "@/components/edit/answer";
import Setting from "@/components/edit/setting";

const EditId = (props) => {

    const [questionValue, setQuestionValue] = useState("");
    const [answerValue, setAnswerValue] = useState("");

    const [showForm, setShowForm] = useState(false);

    const [contentState, setContentState] = useState("question");

    const handleChangeValue = (e) =>{
        setQuestionValue(e.target.value);
        if(e.target.value.length > 0){
            setShowForm(true);
        } else {
            setShowForm(false);
        }
    }
    
    const switchQuestion = () => {
        setContentState("question");
    }
    
    const switchAnswer = () => {
        setContentState("answer");
    }
    
    const switchSetting = () => {
        setContentState("setting");
    }

    return(
        <>
            <Layout contentState={contentState}>
                <FadeTransition show={contentState === "question"}>
                    <Question questionValue={questionValue} handleChangeValue={handleChangeValue} />
                </FadeTransition>
                <FadeTransition show={contentState === "answer"}>
                    <Answer questionValue={questionValue} />
                </FadeTransition>
                <FadeTransition show={contentState === "setting"}>
                    <Setting />
                </FadeTransition>
                <FadeTransition show={showForm && contentState === "question"}>
                    <EditNextBtn contentState={contentState} switchAnswer={switchAnswer} />
                </FadeTransition>
            </Layout>
        </>
    )
}

export const getStaticPaths = async () => {
    const q = query(collection(db, "memores"));
    const memoresSnapShot = await getDocs(q);
    const memoresData = memoresSnapShot.docs.map(doc => doc.data());
    const memoriArray = memoresData.map((data) => (data.memori));
    const paths = memoriArray.flatMap(innerArray => {
        return innerArray.map(item => {
            return { params: { accountId: item.userId, editId: item.id } };
        });
    });
    return { paths, fallback: false };
}

// TODO
export const getStaticProps = async (context) => {
    const { editId } = context.params;
    // const q = query(collection(db, "memores"), where("id", "==", editId));
    // const memoresSnapShot = await getDocs(q)
    // const memoriRef = doc(db, "memores");
    // const memoriSnap = await getDoc(memoriRef);
    // const memori = memoriSnap.exists() ? memoriSnap.data() : null;
    return {
        props: {
            memori: editId,
        }
    }
}

export default EditId;