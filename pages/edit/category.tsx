import Layout from "@/components/layout/edit";
import { useState } from "react";
import Cate from "@/components/edit/cate";

const Category = () => {

    const [contentState, setContentState] = useState("category");

    return(
        <>
            <Layout contentState={contentState}>
                <Cate />
            </Layout>
        </>
    )
}

export default Category;