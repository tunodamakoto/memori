import Layout from "@/components/layout/main";
import Profile from "@/components/account/profile";
import Category from "@/components/account/category";
import Cards from "@/components/account/cards";

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