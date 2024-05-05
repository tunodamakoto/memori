import styles from "@/styles/edit/answer.module.scss";
import { useEffect, useRef, useState } from "react";
import { EditNextBtn } from "@/components/btn";
import FadeTransition from "@/components/animation/FadeTransition";

export default function Answer(props) {

    const {questionValue, answerValues, setAnswerValues, handleAnswerValue} = props;
    let addJudge = false;

    const textAreaRef = useRef(null);

    useEffect(() => {
        if(textAreaRef.current){
            textAreaRef.current.style.height = "40px";
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, [answerValues])

    const handleAddAnswer = () => {
        answerValues.forEach(item => {
            if (item.value === "") {
                addJudge = false;
            } else if(item.value !== ""){
                addJudge = true;
            }
        });
        if(addJudge){
            const lastId = answerValues[answerValues.length - 1].id;
            setAnswerValues([...answerValues, { id: lastId + 1, value: '', height: 40 }]);
        } else {
            alert("未記入のフォームがあります。");
        }
    }

    const handleDeleteAnswer = (id) => {
        const filteredAreas = answerValues.filter(area => area.id !== id);
        setAnswerValues(filteredAreas);
    }
    
    const handleKeyDown = (e, id) => {
        if(e.key === "Enter"){
            e.preventDefault();
        } else if(e.key === "Backspace" && e.target.value === "" && answerValues.length >= 2) {
            e.preventDefault();
            handleDeleteAnswer(id);
        }
    }

    const handleTextareaHeight = (e, id) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
        const newHeight = e.target.scrollHeight;
        setAnswerValues(prevValues => {
            return( prevValues.map(value => {
                if(value.id === id) {
                    return { ...value, height: newHeight };
                }
                return value;
            }))
        });
    }

    return(
        <>
            <div className={styles.module}>
                <h2 className={styles.title}>{questionValue}</h2>
                <div className={styles.form}>
                    {answerValues.map(answerValue => (
                        <div className={styles["form__textarea"]} key={answerValue.id}>
                            <textarea
                                ref={textAreaRef}
                                value={answerValue.value}
                                onChange={e => {
                                    handleAnswerValue(answerValue.id, e.target.value);
                                    handleTextareaHeight(e, answerValue.id);
                                }}
                                onKeyDown={(e) => handleKeyDown(e, answerValue.id)}
                                placeholder="解答を記入"
                                style={{ height: answerValue.height ? `${answerValue.height}px` : '40px' }}
                            ></textarea>
                        </div>
                    ))}
                </div>
                <div className={styles.add}>
                    <button onClick={handleAddAnswer}></button>
                </div>
            </div>
        </>
    )
}
