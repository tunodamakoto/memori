import Layout from "@/components/layout/memori";
import Content from "@/components/accountId/cardId/memori/content";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "@/libs/firebase";

const Account = () => {
    return(
        <>
        <Layout>
            <Content />
        </Layout>
        </>
    )
}

export const getStaticPaths = async () => {
    const q = query(collection(db, "users"));
    const usersSnapShot = await getDocs(q);
    const usersData = usersSnapShot.docs.map(doc => doc.data());
    const paths = usersData.map((data) => ({ params: { accountId: data.userId } }));
    return { paths, fallback: false };
}

export const getStaticProps = async (context) => {
    const { accountId } = context.params;
    const userRef = doc(db, "users", accountId);
    const userSnap = await getDoc(userRef);
    const user = userSnap.exists() ? userSnap.data() : null;
    return {
        props: {
            user: user,
        }
    }
}

export default Account;