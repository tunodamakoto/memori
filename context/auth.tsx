import { auth, db } from "@/libs/firebase";
import { User } from "@/types/user";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type UserContextType = User | null | undefined;

const AuthContext = createContext<UserContextType>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserContextType>();

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
        });
        return unsubscribe;
    }, []);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);