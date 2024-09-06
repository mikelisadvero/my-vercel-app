// pages/_app.js
import '../styles/styles.css'; // Importing the global stylesheet
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                {/* You can add any meta tags or links that are common across all pages here */}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
