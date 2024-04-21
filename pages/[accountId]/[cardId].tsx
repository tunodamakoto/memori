import Layout from "@/components/layout/card";
import Head from "@/components/accountId/cardId/head";
import Body from "@/components/accountId/cardId/body"
import { StartBtn } from "@/components/btn";

const AccountCard = () => {
    return(
        <>
            <Layout>
                <Head />
                <Body />
                <StartBtn />
            </Layout>
        </>
    )
}

export default AccountCard;