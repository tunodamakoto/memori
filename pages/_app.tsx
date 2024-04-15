import { AuthProvider } from "@/context/auth";
import "@/styles/grobal.scss";
import { ZenKakuGothicNew } from "@/styles/font";

export default function App({ Component, pageProps }) {
    return (
        <AuthProvider>
            <div className={ZenKakuGothicNew.className}>
                <Component {...pageProps} />
            </div>
        </AuthProvider>
    );
}