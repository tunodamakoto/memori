import styles from "@/styles/edit/setting.module.scss";
import { useEffect, useState } from "react";
import FadeTransition from "../animation/FadeTransition";

export default function Setting(props) {

    const {smallCateValue, setSmallCateValue, bigCateValue, setBigCateValue, questionValue, answerValues, setRelease} = props;

    const [smallShowForm, setSmallShowForm] = useState(false);

    const [bigShowForm, setBigShowForm] = useState(false);

    useEffect(() => {
        if(smallCateValue === "create"){
            setSmallShowForm(true);
        } else {
            setSmallShowForm(false);
        }
    }, [smallCateValue]);

    const handleSmallSelectChange = (e) => {
        setSmallCateValue(e.target.value);
    };

    useEffect(() => {
        if(bigCateValue === "create"){
            setBigShowForm(true);
        } else {
            setBigShowForm(false);
        }
    }, [bigCateValue]);

    const handleBigSelectChange = (e) => {
        setBigCateValue(e.target.value);
    };

    useEffect(() => {
        if(smallCateValue !== "" &&  smallCateValue !== "non" && smallCateValue !== "create" && bigCateValue !== "" &&  bigCateValue !== "non" && bigCateValue !== "create"){
            setRelease(true);
        } else {
            setRelease(false);
        }
    }, [smallCateValue, bigCateValue])

    return(
        <>
            <div className={styles.module}>
                <h2 className={styles.question}>{questionValue}</h2>
                <ul className={styles.answer}>
                    {answerValues.map(answerValue => (
                        <li className={styles["answer__item"]} key={answerValue.id}>{answerValue.value}</li>
                    ))}
                </ul>
                <div className={styles.form}>
                    <div className={styles["form__select"]}>
                        <label htmlFor="small" className={styles["form__label"]}>小カテゴリー</label>
                        <div className={styles["form__select__inner"]}>
                            <select name="small" id="small" value={smallCateValue} onChange={handleSmallSelectChange}>
                                <option value="non">選択してください</option>
                                <option value="1">原理・研究法・歴史</option>
                                <option value="2">学習・認知・知覚</option>
                                <option value="3">発達・教育</option>
                                <option value="create">小カテゴリーを作成</option>
                            </select>
                        </div>
                        <FadeTransition show={smallShowForm}>
                            <div className={styles["form__input"]}>
                                <input type="text" placeholder="小カテゴリーの作成" />
                            </div>
                        </FadeTransition>
                    </div>
                    <div className={styles["form__select"]}>
                        <label htmlFor="big" className={styles["form__label"]}>大カテゴリー</label>
                        <div className={styles["form__select__inner"]}>
                            <select name="big" id="big" value={bigCateValue} onChange={handleBigSelectChange}>
                                <option value="non">選択してください</option>
                                <option value="1">心理学検定</option>
                                <option value="2">英単語</option>
                                <option value="3">数学の公式</option>
                                <option value="create">大カテゴリーを作成</option>
                            </select>
                        </div>
                        <FadeTransition show={bigShowForm}>
                            <div className={styles["form__input"]}>
                                <input type="text" placeholder="大カテゴリーの作成" />
                            </div>
                        </FadeTransition>
                    </div>
                </div>
            </div>
        </>
    )
}