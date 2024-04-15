import Layout from "@/components/layout/main";
import Profile from "@/components/accountId/profile";
import Category from "@/components/accountId/category";
import Cards from "@/components/accountId/cards";

const Account = () => {
    return(
        <>
            <Layout>
                <Profile />
                <Category />
                <Cards />
            </Layout>
        </>
    )
}

export default Account;