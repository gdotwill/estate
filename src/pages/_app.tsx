import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import Layout from "../components/Layout";
import "@/styles/globals.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
<script src="https://unpkg.com/@tailwindcss/browser@4"></script>

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <Component {...pageProps} />
            <Toaster />
        </Layout>
    );
}
