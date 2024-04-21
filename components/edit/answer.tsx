import styles from "@/styles/edit/answer.module.scss";
import { useEffect, useRef, useState } from "react";
import { EditNextBtn } from "@/components/btn";
import FadeTransition from "@/components/animation/FadeTransition";

export default function Answer({ questionValue }) {

    const [texts, setTexts] = useState(['']);

    // const handleKeyDown = (e, index) => {
    //     if (e.key === 'Enter') {
    //         e.preventDefault();
    //         if(e.target.value.trim() !== ''){
    //             if (e.getModifierState('Shift')) {
    //                 e.preventDefault();
    //                 const newTextArea = [...texts];
    //                 newTextArea.splice(index + 1, 0, '');
    //                 setTexts(newTextArea);
    //             }
    //         }
    //     }
    // };

    // const handleChange = (e, index) => {
    //     const newTextArea = [...texts];
    //     newTextArea[index] = e.target.value;
    //     setTexts(newTextArea);
    // };

    // TODO：textareaの追加ボタンをつける
    // ・記入すると追加ボタンが出現

    return(
        <>
            <div className={styles.module}>
                <h2 className={styles.title}>{questionValue}</h2>
                <div className={styles.form}>
                {texts.map((text, index) => (
                    <div className={styles["form__textarea"]} key={index}>
                        <textarea
                            value={text}
                            placeholder="解答を記入"
                            // onKeyDown={(e) => handleKeyDown(e, index)}
                            // onChange={(e) => handleChange(e, index)}
                        >
                        </textarea>
                    </div>
                ))}
                </div>
            </div>
        </>
    )
}