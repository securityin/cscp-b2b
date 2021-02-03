// import App from "next/app";
import "antd/dist/antd.css";
import i18n from "i18next/index";
import type { AppProps /*, AppContext */ } from "next/app";
import dynamic from "next/dynamic";
import { initReactI18next } from "react-i18next/react-i18next";
import { Provider } from "react-redux";
import en from "../language/en";
import zhCN from "../language/zh-CN";
import "../styles/globals.css";
// import Header from "../src/common/Header";
// import { useState } from 'react';
// import { Provider } from  'react-redux'
// import { useStore } from '../src/store';

// init i18n
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en,
      zhCN,
    },
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });

// const DetectLang = dynamic(() => import('./detectLang'), { ssr: false })

// function MyApp({ Component, pageProps }: AppProps) {
//   const [inited, setInited] = useState(false)
//   const store = useStore(pageProps.initialReduxState)
//   return (
//     <Provider store={store}>
//       { !inited && <DetectLang onInit={() => setInited(true)} />}
//       { inited &&
//         <div>
//           <Header />
//           <Component {...pageProps} />
//         </div>
//       }
//     </Provider>
//   )
// }

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`

//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }
const MyApp = dynamic(() => import("../src/app"), { ssr: false });

// function RootApp({ Component, pageProps }: AppProps) {
 
//   return (
//     <Provider store={store}>
//       <MyApp Component={Component} pageProps={pageProps} />
//     </Provider>
//   );
// }

export default MyApp;
