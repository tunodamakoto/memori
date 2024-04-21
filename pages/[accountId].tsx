import Layout from "@/components/layout/main";
import Profile from "@/components/accountId/profile";
import Category from "@/components/accountId/category";
import Cards from "@/components/accountId/cards";
import { useRouter } from "next/router";
import { and, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/libs/firebase";
import { useEffect, useState } from "react";

const Account = (props) => {
    
    const user = props.user;

    return(
        <>
            <Layout>
                <Profile user={user} />
                <Category />
                <Cards />
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