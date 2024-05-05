import styles from "@/styles/edit/cate.module.scss";
import { CreateCategory, EditCategory } from "@/components/popup"
import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
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
                                    <li className={`${styles["item__nav__item"]} ${styles["item__nav__item-delete"]}`}>削除</li>
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