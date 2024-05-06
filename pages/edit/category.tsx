import Layout from "@/components/layout/editCate";
import { useState } from "react";
import Cate from "@/components/edit/cate";

const Category = () => {

    const [contentState, setContentState] = useState("category");

    return(
        <>
            <Layout>
                <Cate />
            </Layout>
        </>
    )
}

export default Category;