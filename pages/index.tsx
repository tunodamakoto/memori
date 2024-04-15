import Layout from "@/components/layout/main";
import Intro from "@/components/home/intro";
import Accounts from "@/components/home/accounts";

const Home = () => {

    return (
        <>
            <Layout>
                <Intro />
                <Accounts />
            </Layout>
        </>
    );
};

export default Home;