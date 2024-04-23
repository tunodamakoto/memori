import Layout from "@/components/layout/edit";
import Question from "@/components/edit/question";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/libs/firebase";
import { useRouter } from "next/router";
import { useAuth } from "@/context/auth";
import { useEffect, useState } from "react";
import FadeTransition from "@/components/animation/FadeTransition";
import { EditNextBtn, EditBackBtn, EditReleaseBtn } from "@/components/btn";
import Answer from "@/components/edit/answer";
import Setting from "@/components/edit/setting";

const EditId = (editId) => {
    console.log(editId);

    const [questionValue, setQuestionValue] = useState("");
    const [answerValues, setAnswerValues] = useState([{ id: 1, value: "", height: 40 }]);
    const [smallCateValue, setSmallCateValue] = useState("");
    const [bigCateValue, setBigCateValue] = useState("");

    const [nextShow, setNextShow] = useState(false);
    const [backShow, setBackShow] = useState(false);
    const [releaseShow, setRelease] = useState(false);

    const [contentState, setContentState] = useState("question");

    const handleQuestionValue = (e) =>{ 
        setQuestionValue(e.target.value);
        if(e.target.value !== ""){
            setNextShow(true);
        } else if(e.target.value === "") {
            setNextShow(false);
        }
    }

    const handleAnswerValue = (id, value) => {
        const newAreas = answerValues.map(area =>
            area.id === id ? { ...area, value } : area
        );
        setAnswerValues(newAreas);
    }
    
    const switchQuestion = () => {
        setContentState("question");
        setNextShow(true);
    }
    
    const switchAnswer = () => {
        setContentState("answer");
    }
    
    const switchSetting = () => {
        setContentState("setting");
        setBackShow(true);
    }

    useEffect(() => {
        if(contentState === "answer"){
            let nextJudge = false;
            answerValues.forEach(item => {
                if (item.value === "") {
                    nextJudge = false;
                } else if(item.value !== ""){
                    nextJudge = true;
                }
            });
            if(nextJudge){
                setNextShow(true);
            } else {
                setNextShow(false);
            }
            setBackShow(true);
        }
    }, [answerValues, switchAnswer])

    return(
        <>
            <Layout contentState={contentState}>
                <FadeTransition show={contentState === "question"}>
                    <Question questionValue={questionValue} handleQuestionValue={handleQuestionValue} />
                </FadeTransition>
                <FadeTransition show={contentState === "answer"}>
                    <Answer questionValue={questionValue} answerValues={answerValues} setAnswerValues={setAnswerValues} handleAnswerValue={handleAnswerValue} />
                </FadeTransition>
                <FadeTransition show={contentState === "setting"}>
                    <Setting smallCateValue={smallCateValue} setSmallCateValue={setSmallCateValue} bigCateValue={bigCateValue} setBigCateValue={setBigCateValue} questionValue={questionValue} answerValues={answerValues} setRelease={setRelease} />
                </FadeTransition>
                <FadeTransition show={backShow}>
                    <EditBackBtn contentState={contentState} switchQuestion={switchQuestion} switchAnswer={switchAnswer} />
                </FadeTransition>
                <FadeTransition show={nextShow}>
                    <EditNextBtn contentState={contentState} switchAnswer={switchAnswer} switchSetting={switchSetting} />
                </FadeTransition>
                <FadeTransition show={releaseShow && contentState === "setting"}>
                    <EditReleaseBtn editId={editId} questionValue={questionValue} answerValues={answerValues} smallCateValue={smallCateValue} bigCateValue={bigCateValue} setQuestionValue={setQuestionValue} setAnswerValues={setAnswerValues} setSmallCateValue={setSmallCateValue} setBigCateValue={setBigCateValue} />
                </FadeTransition>
            </Layout>
        </>
    )
}

export const getStaticPaths = async () => {
    const q = query(collection(db, "memores"));
    const memoresSnapShot = await getDocs(q);
    const memoresData = memoresSnapShot.docs.map(doc => doc.data());
    const paths = memoresData.map(data => { return {params: {accountId: data.userId, editId: data.id}}});
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
            editId: editId,
        }
    }
}

export default EditId;