import "@/styles/grobal.scss";
import { ZenKakuGothicNew } from "@/styles/font";

export default function App({ Component, pageProps }) {
    return (
        <div className={ZenKakuGothicNew.className}>
            <Component {...pageProps} />
        </div>
    );
}