import Link from 'next/link';
import styles from "@/styles/home/accounts.module.scss";
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '@/libs/firebase';
import { useEffect, useState } from 'react';

export default function Accounts() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const q = query(collection(db, "users"));
                const usersSnapShot = await getDocs(q);
                const usersData = usersSnapShot.docs.map(doc => doc.data());
                setUsers(usersData);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        getUsers();
    }, [])

    return (
        <div className={styles.module}>
            <h2 className={styles.title}>他の方のMEMORIを見る</h2>
            <ul className={styles.list}>
                {users.map((user) => (
                    <li className={styles.card} key={user.id}>
                        <Link href={`/${user.userId}`}>
                            <div className={`${styles["card__icon"]} ${styles[user.icon]}`}></div>
                            <div className={styles["card__desc"]}>
                                <h3 className={styles["card__desc__name"]}>{user.nickname}</h3>
                                <p className={styles["card__desc__position"]}>{user.post}</p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}