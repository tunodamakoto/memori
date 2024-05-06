import styles from "@/styles/edit/setting.module.scss";
import { useEffect, useState } from "react";
import FadeTransition from "../animation/FadeTransition";
import { AddCard } from "../popup";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/libs/firebase";
import { useAuth } from "@/context/auth";

export default function Setting(props) {

    const { questionValue, answerValues, card, setCard, setRelease} = props;
    const [toggleCard, setToggleCard] = useState(false);
    const [categories, setCategories] = useState([]);
    const [cards, setCards] = useState([]);
    const user = useAuth();

    const handleAddCard = () => {
        setToggleCard(true)
    }

    useEffect(() => {
        const getCategories = async () => {
            try {
                const q = query(collection(db, "categories"));
                const categoriesSnapShot = await getDocs(q);
                const categoriesData = categoriesSnapShot.docs.map(doc => doc.data());
                const userCategory = categoriesData.filter(data => data.userId === user.userId);
                setCategories(userCategory)
            } catch (error) {
                console.error("Error fetching users:", error)
            }
        }
        const getCards = async () => {
            try {
                const q = query(collection(db, "cards"));
                const cardsSnapShot = await getDocs(q);
                const cardsData = cardsSnapShot.docs.map(doc => doc.data());
                const userCard = cardsData.filter(data => data.userId === user.userId);
                setCards(userCard);
            } catch (error) {
                console.error("Error fetching users:", error)
            }
        };
        getCategories();
        getCards();
    },[cards])

    useEffect(() => {
        if (card.length === 0) {
            setRelease(false);
        } else if(card.length !== 0) {
            setRelease(true);
        }
    }, [card])

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
                    <ul className={styles["form__categories"]}>
                        {categories.slice().reverse().map((data) => (
                            <li className={styles["form__categories__item"]} key={data.id}>
                                <p className={styles["form__categories__item__title"]}>{data.name}</p>
                                <div className={styles["form__radio"]}>
                                    <ul className={styles["form__radio__list"]}>
                                        {cards.filter(card => card.category.id === data.id).map((data) => (
                                            <li className={styles["form__radio__item"]} key={data.id}>
                                                <label htmlFor={data.id}>
                                                    <input type="radio" name="cards" id={data.id} onChange={(e) => setCard({id: data.id, name: data.name, category_id: data.category.id, category_name: data.category.name})} checked={data.id === card.id}  />
                                                    {data.name}
                                                </label>
                                            </li>                                
                                        ))}
                                    </ul>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className={styles["form__add"]}>
                        <button onClick={handleAddCard}></button>
                    </div>
                </div>
            </div>
            <FadeTransition show={toggleCard}>
                <AddCard setToggleCard={setToggleCard} />
            </FadeTransition>
        </>
    )
}