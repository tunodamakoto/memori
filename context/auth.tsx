import { auth, db } from "@/libs/firebase";
import { User } from "@/types/user";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { ZenKakuGothicNew } from "@/styles/font";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Layout from "@/components/layout/loading";
import styles from "@/styles/layout/loading.module.scss";

type UserContextType = User | null | undefined;

const AuthContext = createContext<UserContextType>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserContextType>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if(firebaseUser){
                const q = query(collection(db, "users"), where("id", "==", firebaseUser.uid));
                const usersSnapShot = await getDocs(q);
                for(let i = 0; i < usersSnapShot.size; i++){
                    const doc = usersSnapShot.docs[i].data() as User;
                    setUser(doc);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    if (loading) {
        return (
            <>
                <Layout>
                    <div className={`${styles.load} ${ZenKakuGothicNew.className}`}>Loading...</div>
                </Layout>
            </>
        )
    }

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);