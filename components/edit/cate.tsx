import styles from "@/styles/edit/cate.module.scss";
import { CreateCategory, EditCategory } from "@/components/popup"
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/libs/firebase";
import { useAuth } from "@/context/auth";
import FadeTransition from "../animation/FadeTransition";

export default function Cate(){

    const [toggleCreate, setToggleCreate] = useState(false);
    const [toddleEdit, setToddleEdit] = useState(false);
    const [categories, setCategories] = useState([]);
    const [value, setValue] = useState({});
    const user = useAuth();

    const [toggleNavs, setToggleNavs] = useState({});
    const handleToggleNav = (id) => {
        setToggleNavs(prevState => {
            const updatedState = { ...prevState };
            if (updatedState[id] === false || updatedState[id] === true || updatedState[id] === "") {
                updatedState[id] = !prevState[id];
                Object.keys(updatedState).forEach(key => {
                    if (key !== id) {
                        updatedState[key] = false;
                    }
                });
            } else {
                updatedState[id] = true;
            }
            return updatedState;
        });
    };

    const handleAddCategory = () => {
        setToggleCreate(true);
    }

    useEffect(() => {
        const getCategories = async () => {
            try {
                const q = query(collection(db, "categories"));
                const categoriesSnapShot = await getDocs(q);
                const categoriesData = categoriesSnapShot.docs.map(doc => doc.data());
                const userCategory = categoriesData.filter(data => data.userId === user.userId);
                setCategories(userCategory);
            } catch (error) {
                console.error("Error fetching users:", error)
            }
        };
        getCategories();
    }, [categories])

    const handleEdit = (id, name) => {
        setToddleEdit(true);
        setValue({ id: id, name: name });
    }

    const handleCateDelete = async (id, name) => {
        const result = confirm(`「${name}」を削除してもいいでしょうか？（※作成したMEMORIも削除されます）`)
        if(result) {
            const memoresSnapShot = await getDocs(query(collection(db, "memores"), where("category.id", "==", id)));
            const memoresData = memoresSnapShot.docs.map(doc => doc.data());
            const memores = memoresData.filter(data => data.userId === user.userId);
            memores.map(async(data) => (
                await deleteDoc(doc(db, "memores", data.id))
            ))
            const cardsSnapShot = await getDocs(query(collection(db, "cards"), where("category.id", "==", id)));
            const cardsData = cardsSnapShot.docs.map(doc => doc.data());
            const cards = cardsData.filter(data => data.userId === user.userId);
            cards.map(async(data) => (
                await deleteDoc(doc(db, "cards", data.id))
            ))
            await deleteDoc(doc(db, "categories", id));
        }
    }

    return(
        <>
            <div className={styles.module}>
                {categories.length === 0 && (
                    <p className={styles.empty}>カテゴリーを作ろう！</p>
                )}
                <ul className={styles.list}>
                    {categories.map((data) => (
                        <li className={styles.item} key={data.id}>
                            <span className={styles["item__title"]}>{data.name}</span>
                            <button className={`${styles["item__btn"]} ${toggleNavs[data.id] ? styles.on : ""}`} onClick={() => handleToggleNav(data.id)}></button>
                            <FadeTransition show={toggleNavs[data.id]}>
                                <ul className={styles["item__nav"]}>
                                    <li className={`${styles["item__nav__item"]} ${styles["item__nav__item-edit"]}`} onClick={() => handleEdit(data.id, data.name)}>編集</li>
                                    <li className={`${styles["item__nav__item"]} ${styles["item__nav__item-delete"]}`} onClick={() => handleCateDelete(data.id, data.name)}>削除</li>
                                </ul>
                            </FadeTransition>
                        </li>
                    ))}
                </ul>
                <div className={styles.add}>
                    <button onClick={handleAddCategory}></button>
                </div>
            </div>
            <FadeTransition show={toggleCreate}>
                <CreateCategory setToggleCreate={setToggleCreate} />
            </FadeTransition>
            <FadeTransition show={toddleEdit}>
                <EditCategory setToddleEdit={setToddleEdit} setToggleNavs={setToggleNavs} value={value} setValue={setValue} />
            </FadeTransition>
        </>
    )
}