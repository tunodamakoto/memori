import Layout from "@/components/layout/memori";
import Question from "@/components/memori/question";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/libs/firebase";
import { MemoriCloseBtn, MemoriNextBtn } from "@/components/btn";
import { MemoriBackBtn } from "@/components/btn";
import { MemoriOpenBtn } from "@/components/btn";
import { useEffect, useState } from "react";
import FadeTransition from "@/components/animation/FadeTransition";
import Answer from "@/components/memori/answer";

const Memori = (props) => {

    const card = props.card;
    const memori = props.memori;
    const [previousMemori, setPreviousMemori] = useState(null);
    const [nextMemori, setNextMemori] = useState(null);
    const [memoriOpen, setMemoriOpen] = useState(false);

    useEffect(() => {
        const memores = JSON.parse(localStorage.getItem('memores'));

        const getIdIndex = (id) => {
            return memores.findIndex(item => item.id === memori.id);
        };

        const getPreviousMemori = (id) => {
            const index = getIdIndex(id);
            if (index !== -1 && index !== 0) {
                return memores[index - 1];
            }
            return null;
        };

        const getNextMemori = (id) => {
            const index = getIdIndex(id);
            if (index !== -1 && index !== memores.length - 1) {
                return memores[index + 1];
            }
            return null;
        };

        const specifiedId = 3;
        setPreviousMemori(getPreviousMemori(specifiedId));
        setNextMemori(getNextMemori(specifiedId));
    }, [memori])

    return(
        <>
            <Layout card={card}>
                {!memoriOpen ? (
                    <Question memori={memori} />
                ):(
                    <Answer memori={memori} />
                )}
                <FadeTransition show={previousMemori !== null && !memoriOpen}>
                    <MemoriBackBtn previousMemori={previousMemori} />
                </FadeTransition>
                <FadeTransition show={!memoriOpen}>
                    <MemoriOpenBtn setMemoriOpen={setMemoriOpen} />
                </FadeTransition>
                <FadeTransition show={memoriOpen}>
                    <MemoriCloseBtn setMemoriOpen={setMemoriOpen} />
                </FadeTransition>
                <FadeTransition show={nextMemori !== null && !memoriOpen}>
                    <MemoriNextBtn nextMemori={nextMemori} />
                </FadeTransition>
            </Layout>
        </>
    )
}

export const getStaticPaths = async () => {
    const q = query(collection(db, "memores"));
    const memoresSnapShot = await getDocs(q);
    const memoresData = memoresSnapShot.docs.map(doc => doc.data());
    const paths = memoresData.map((data) => ({ params: { id: data.id }}));
    return { paths, fallback: false};
}

export const getStaticProps = async (context) => {
    const { id } = context.params;
    const memoriRef = doc(db, "memores", id);
    const memoriSnap = await getDoc(memoriRef);
    const memori = memoriSnap.data();
    const cardId = memoriSnap.data().card.id;
    const cardRef = doc(db, "cards", cardId);
    const cardSnap = await getDoc(cardRef);
    const card = cardSnap.data();
    return{
        props: {
            card: card,
            memori: memori,
        }
    }
}

export default Memori;