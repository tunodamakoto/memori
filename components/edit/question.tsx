import styles from "@/styles/edit/question.module.scss";
import { useEffect, useRef, useState } from "react";
import { EditNextBtn } from "@/components/btn";
import FadeTransition from "@/components/animation/FadeTransition";

export default function Question(props) {

    const {questionValue, handleChangeValue} = props;

    const [ height, setHeight ] = useState(0);

    const textAreaRef = useRef(null)

    useEffect(() => {
        if(textAreaRef.current) {
            setHeight(0);
        }
    }, [questionValue]);
    useEffect(() => {
        if(!height && textAreaRef.current) {
            setHeight(textAreaRef.current.scrollHeight);
        }
    }, [height]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    return(
        <>
            <div className={styles.module}>
                <textarea 
                    className={styles.textarea} 
                    ref={ textAreaRef }
                    value={ questionValue }
                    placeholder="問題を記入" 
                    onChange={handleChangeValue}
                    onKeyDown={handleKeyDown}
                    style={{ height: height ? `${height}px` : '42px' }} 
                ></textarea>
            </div>
        </>
    )
}