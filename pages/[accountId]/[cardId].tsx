import Layout from "@/components/layout/card";
import Head from "@/components/accountId/cardId/head";
import Body from "@/components/accountId/cardId/body"
import { StartBtn } from "@/components/btn";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "@/libs/firebase";

const AccountCard = (props) => {

  const card = props.card;
  const memores = props.memores;

  return(
    <>
        <Layout>
            <Head card={card} />
            <Body memores={memores} />
            {memores.length !== 0 && (
              <StartBtn memores={memores} card={card} />
            )}
        </Layout>
    </>
  )
}

export const getStaticPaths = async () => {
  const cardsSnapShot = await getDocs(query(collection(db, "cards")));
  const cardsData = cardsSnapShot.docs.map(doc => doc.data());
  const paths = cardsData.map((data) => ({ params: { accountId: data.userId, cardId: data.id }}));
  return {paths, fallback: false};
}

export async function getStaticProps({ params }) {
  const { cardId } = params;
  const cardRef = doc(db, "cards", cardId);
  const cardSnap = await getDoc(cardRef);
  const card = cardSnap.exists() ? cardSnap.data() : null;
  const memoresSnapShot = await getDocs(query(collection(db, "memores")));
  const memoresData = memoresSnapShot.docs.map(doc => doc.data());
  const memores = memoresData.filter(data => data.card.id === cardId);
  return {
    props: {
      card: card,
      memores: memores,
    },
  };
}

export default AccountCard;