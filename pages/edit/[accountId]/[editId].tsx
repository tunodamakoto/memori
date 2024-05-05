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

const EditId = (props) => {

    const editId = props.editId;
    const memori = props.memori;

    const [questionValue, setQuestionValue] = useState(memori?.question);
    const [answerValues, setAnswerValues] = useState(memori.answer.length === 0 ? [{ id: 1, value: "", height: 40 }] : memori.answer);
    const [card, setCard] = useState({id: memori?.card.id, name: memori?.card.name, category_id: memori?.category.id, category_name: memori?.category.name});

    const [nextShow, setNextShow] = useState(!!memori.question);
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
                    <Setting questionValue={questionValue} answerValues={answerValues} card={card} setCard={setCard} setRelease={setRelease} />
                </FadeTransition>
                <FadeTransition show={backShow}>
                    <EditBackBtn contentState={contentState} switchQuestion={switchQuestion} switchAnswer={switchAnswer} />
                </FadeTransition>
                <FadeTransition show={nextShow}>
                    <EditNextBtn contentState={contentState} switchAnswer={switchAnswer} switchSetting={switchSetting} />
                </FadeTransition>
                <FadeTransition show={releaseShow && contentState === "setting"}>
                    <EditReleaseBtn editId={editId} questionValue={questionValue} answerValues={answerValues} card={card} setQuestionValue={setQuestionValue} setAnswerValues={setAnswerValues} setCard={setCard} />
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
    return { paths, fallback: true };
}

export const getStaticProps = async ({ params }) => {
    const { editId } = params;
    const memoriRef = doc(db, "memores", editId);
    const memoriSnap = await getDoc(memoriRef);
    const memori = memoriSnap.exists() ? memoriSnap.data() : null;
    return {
        props: {
            editId: editId,
            memori: memori,
        }
    }
}

export default EditId;