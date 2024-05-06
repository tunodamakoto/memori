import styles from "@/styles/popup.module.scss";
import FadeTransition from "@/components/animation/FadeTransition";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { collection, query, where, getDocs, doc, setDoc, addDoc, arrayUnion, updateDoc } from "firebase/firestore";
import { auth, db } from "@/libs/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { v4 } from "uuid";
import { useAuth } from "@/context/auth";

export const SignInAccountSetting = () => {

    const [userId, setUserId] = useState("");
    const [nickname, setNickname] = useState("");
    const [post, setPost] = useState("");
    const [icon, setIcon] = useState("");

    const [formType, setFormType] = useState("input");

    const router = useRouter();

    const handleConfirm = async () => {
        if(userId && nickname && post && icon) {
            const q = query(collection(db, "users"));
            const usersSnapshot = await getDocs(q);
            for (let i = 0; i < usersSnapshot.size; i++) {
                const doc = usersSnapshot.docs[i];
                if (doc.data().userId === userId) {
                    alert('ユーザーIDが他の方と同じです。違うIDをご記入ください。');
                    setFormType("input");
                    return;
                }
            }
            onAuthStateChanged(auth, async (firebaseUser) => {
                await setDoc(doc(db, "users", userId), {
                    id: firebaseUser.uid,
                    name: firebaseUser.displayName,
                    email: firebaseUser.email,
                    userId: userId,
                    nickname: nickname,
                    post: post,
                    icon: icon
                });
            });

            setFormType("confirm");
        } else {
            alert("未記入のフォームがあります。");
        }
    }

    const handleCansel = () => {
        setFormType('input');
    }

    const handleSubmit = () => {
        router.push(`/${userId}`);
    }
    
    return (
        <div className={styles.module}>
            <div className={styles.inner}>
                <FadeTransition show={formType === "input"}>
                    <div className={styles.content}>
                        <p className={styles.title}>アカウント作成</p>
                        <div className={styles.form}>
                            <div className={styles["form__input"]}>
                                <label htmlFor="userId">ユーザーID</label>
                                <input type="text" placeholder="mako_123" onChange={(e) => setUserId(e.target.value)} value={userId} />
                            </div>
                            <div className={styles["form__input"]}>
                                <label htmlFor="nickname">ニックネーム</label>
                                <input type="text" placeholder="MAKO" onChange={(e) => setNickname(e.target.value)} value={nickname} />
                            </div>
                            <div className={styles["form__input"]}>
                                <label htmlFor="post">肩書き</label>
                                <input type="text" placeholder="webクリエイター" onChange={(e) => setPost(e.target.value)} value={post} />
                            </div>
                            <div className={styles["form__icon"]}>
                                <label htmlFor="icon">アイコン</label>
                                <div className={styles["form__icon__list__outer"]}>
                                    <ul className={styles["form__icon__list"]}>
                                        <li className={styles["form__icon__item"]}>
                                            <input type="radio" id="red" name="icon" value="red" className={styles.red} onChange={(e) => setIcon(e.target.value)} checked={icon === "red" ? true : false} />
                                        </li>
                                        <li className={styles["form__icon__item"]}>
                                            <input type="radio" id="yello" name="icon" value="yello" className={styles.yello} onChange={(e) => setIcon(e.target.value)} checked={icon === "yello" ? true : false} />
                                        </li>
                                        <li className={styles["form__icon__item"]}>
                                            <input type="radio" id="green" name="icon" value="green" className={styles.green} onChange={(e) => setIcon(e.target.value)} checked={icon === "green" ? true : false} />
                                        </li>
                                        <li className={styles["form__icon__item"]}>
                                            <input type="radio" id="blue" name="icon" value="blue" className={styles.blue} onChange={(e) => setIcon(e.target.value)} checked={icon === "blue" ? true : false} />
                                        </li>
                                        <li className={styles["form__icon__item"]}>
                                            <input type="radio" id="pink" name="icon" value="pink" className={styles.pink} onChange={(e) => setIcon(e.target.value)} checked={icon === "pink" ? true : false} />
                                        </li>
                                        <li className={styles["form__icon__item"]}>
                                            <input type="radio" id="purple" name="icon" value="purple" className={styles.purple} onChange={(e) => setIcon(e.target.value)} checked={icon === "purple" ? true : false} />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={styles["form__btn"]}>
                                <button onClick={handleConfirm}>確認する</button>
                            </div>
                        </div>
                    </div>
                </FadeTransition>
                <FadeTransition show={formType === "confirm"}>
                    <div className={styles.content}>
                        <p className={styles.title}>アカウント確認</p>
                        <div className={styles.form}>
                            <div className={styles["form__input"]}>
                                <label htmlFor="userId">ユーザーID</label>
                                <input type="text" value={userId} readOnly />
                            </div>
                            <div className={styles["form__input"]}>
                                <label htmlFor="nickname">ニックネーム</label>
                                <input type="text" value={nickname} readOnly />
                            </div>
                            <div className={styles["form__input"]}>
                                <label htmlFor="post">肩書き</label>
                                <input type="text" value={post} readOnly />
                            </div>
                            <div className={styles["form__icon"]}>
                                <label htmlFor="icon">アイコン</label>
                                <div className={styles["form__icon__list__outer"]}>
                                    <ul className={styles["form__icon__list"]}>
                                        <li className={styles["form__icon__item"]}>
                                            <input type="radio" name="icon" value={icon} className={styles[icon]} />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={`${styles["form__btn"]} ${styles["form__btn-col"]}`}>
                                <button onClick={handleCansel}>戻る</button>
                                <button onClick={handleSubmit}>作成する</button>
                            </div>
                        </div>
                    </div>
                </FadeTransition>
                <div className={styles.bg}></div>_
            </div>
        </div>
    )
}

export const CreateCategory = (props) => {

    const {setToggleCreate} = props;
    const [name, setName] = useState("");
    const [uuid, setUuid] = useState(v4());
    const user = useAuth();

    const handleCancelPopup = () => {
        setToggleCreate(false);
    }

    const handleSubmit = async () => {
        if(name !== ""){
            const q = query(collection(db, "categories"));
            const categoriesSnapShot = await getDocs(q);
            for (let i = 0; i < categoriesSnapShot.size; i++) {
                const doc = categoriesSnapShot.docs[i];
                if(doc.data().name === name) {
                    alert("すでに存在します。");
                    setName("");
                    return;
                }
            }
            let result = confirm(`「${name}」で作成してもいいでしょうか？`);
            if(result) {
                await setDoc(doc(db, "categories", uuid), {
                    id: uuid,
                    name: name,
                    userId: user.userId
                })
            }
            setToggleCreate(false)
        } 
    }
    
    return(
        <div className={styles.module}>
            <div className={styles.inner}>
                <div className={styles.content}>
                    <p className={styles.title}>作成</p>
                    <div className={styles.form}>
                        <div className={styles["form__input"]}>
                            <input type="text" placeholder="カテゴリー名を記入" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className={styles["form__btn"]}>
                            <button onClick={handleSubmit}>作成する</button>
                        </div>
                    </div>
                </div>
                <div className={styles.bg} onClick={handleCancelPopup}></div>
            </div>
        </div>
    )
}

export const EditCategory = (props) => {

    const {setToddleEdit, setToggleNavs, value} = props;
    const [name, setName] = useState(value.name);

    const handleCancelPopup = () => {
        setToddleEdit(false);
    }

    const handleEdit = async () => {
        if(name === "") {
            alert("カテゴリー名を記入してください。")
            return;
        } else {
            await updateDoc(doc(db, "categories", value.id),{
                name: name,
            })
        }
        setToddleEdit(false);
        setToggleNavs(prevState =>({
            ...prevState,
            [value.id]: !prevState[value.id],
        }))
    }

    return(
        <div className={styles.module}>
            <div className={styles.inner}>
                <div className={styles.content}>
                    <p className={styles.title}>編集</p>
                    <div className={styles.form}>
                        <div className={styles["form__input"]}>
                            <input type="text" placeholder="カテゴリー名を記入" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className={styles["form__btn"]}>
                            <button onClick={handleEdit}>変更する</button>
                        </div>
                    </div>
                </div>
                <div className={styles.bg} onClick={handleCancelPopup}></div>
            </div>
        </div>
    )
}

export const AddCard = (props) => {

    const {setToggleCard} = props;
    const [name, setName] = useState("");
    const [explain, setExplain] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [categoryCreateToggle, setCategoryCreateToggle] = useState(false);
    const user = useAuth();
    const [uuid, setUuid] = useState(v4());

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
    }, [categories]);

    const handleCancelPopup = () => {
        setToggleCard(false);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    const handleSelectCategory = (e) => {
        setCategory(e.target.value);
    };

    useEffect(() => {
        if(category === "create"){
            setShowCategoryForm(true);
        } else {
            setShowCategoryForm(false);
        }
    }, [category]);

    const CreateCard = async () => {
        const q = query(collection(db, "cards"), where("userId", "==", user.userId));
        const cardsSnapShot = await getDocs(q);
        for (let i = 0; i < cardsSnapShot.size; i++) {
            const doc = cardsSnapShot.docs[i];
            if(doc.data().name === name) {
                alert("名前がすでに存在します。");
                setName("");
                return;
            }
        }
        let result = confirm(`「${name}」で作成してもいいでしょか？`);
        if(result) {
            if(category === "create" && newCategoryName !== ""){
                await setDoc(doc(db, "categories", uuid), {
                    id: uuid,
                    name: newCategoryName,
                    userId: user.userId,
                })
                await setDoc(doc(db, "cards", uuid), {
                    id: uuid,
                    name: name,
                    explain: explain,
                    category: {id: uuid, name: newCategoryName},
                    userId: user.userId,
                    memori_num: 0,
                })
                setName("");
                setExplain("");
                setCategory("");
                setNewCategoryName("");
            } else {
                const filterCategoryName = categories.filter(data => data.id === category);
                await setDoc(doc(db, "cards", uuid), {
                    id: uuid,
                    name: name,
                    explain: explain,
                    category: {id: category, name: filterCategoryName[0].name },
                    userId: user.userId,
                    memori_num: 0,
                })
                setName("");
                setExplain("");
                setCategory("");
            }
            setToggleCard(false);
        }
    }

    const handleCreate = async () => {
        if(name === ""){
            alert("名前を記入してください。")
        } else if (category === "non") {
            alert("カテゴリーを選択してください")
        } else if (category === "create" && newCategoryName === "") {
            alert("カテゴリーを選択してください")
        } else if(category === "create" && newCategoryName !== ""){
            const q = query(collection(db, "categories"), where("userId", "==", user.userId));
            const cardsSnapShot = await getDocs(q);
            for (let i = 0; i < cardsSnapShot.size; i++) {
                const doc = cardsSnapShot.docs[i];
                if(doc.data().name === newCategoryName) {
                    alert("カテゴリー名がすでに存在します。");
                    setNewCategoryName("");
                    return;
                } else {
                    setCategoryCreateToggle(true)
                }
            }
            if(categoryCreateToggle){
                CreateCard();
                setCategoryCreateToggle(false);
            }
        } else {
            CreateCard();
        }
    }

    return (
        <div className={styles.module}>
            <div className={styles.inner}>
                <div className={styles.content}>
                    <p className={styles.title}>作成</p>
                    <div className={styles.form}>
                        <div className={styles["form__input"]}>
                            <input type="text" placeholder="名前を記入してください" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className={styles["form__textarea"]}>
                            <textarea 
                                placeholder="説明を記入してください" 
                                onChange={(e) => setExplain(e.target.value)}
                                onKeyDown={handleKeyDown}
                            ></textarea>
                        </div>
                        <div className={styles["form__select"]}>
                            <select name="category" value={category} onChange={handleSelectCategory}>
                                <option value="non">カテゴリーを選択</option>
                                {categories.map((data) => (
                                    <option value={data.id} key={data.id}>{data.name}</option>                                    
                                ))}
                                <option value="create">カテゴリーを作成</option>
                            </select>
                        </div>
                        <FadeTransition show={showCategoryForm}>
                            <div className={styles["form__input"]}>
                                <input type="text" placeholder="カテゴリーを作成" onChange={(e) => setNewCategoryName(e.target.value)} />
                            </div>
                        </FadeTransition>
                        <div className={styles["form__btn"]}>
                            <button onClick={handleCreate}>作成する</button>
                        </div>
                    </div>
                </div>
                <div className={styles.bg} onClick={handleCancelPopup}></div>
            </div>
        </div>
    )
}