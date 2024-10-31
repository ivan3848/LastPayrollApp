import type { Page } from "@/types";
import NotFound from "./(full-page)/pages/notfound/page";
import RootLayout from "./layout";
import Layout from "@/layout/layout";

const Custom404: Page = () => {
    return (
        <Layout>
            <NotFound />
        </Layout>
    );
};

export default Custom404;
