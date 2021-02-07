import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { Provider } from "react-redux";
import { title } from "./base/constans";
import { useDemoData, useTranslation } from "./base/hooks";
import DetectLang from "./detectLang";
import { useStore } from "./store";
import _ from 'lodash'

function AppPage({ Component, pageProps }){
  const { updateDemoData } = useDemoData()
  useEffect(() => {
    const lisStorage = (e) => {
      const data = localStorage.getItem("demoData");
      const demoDataStr = _.isEmpty(data) ? "{}" : data;
      console.info('***lisStorage')
      updateDemoData(JSON.parse(demoDataStr), false)
    };
    window.addEventListener("storage", lisStorage);
    console.info('---addSorageLis---');
    
    return () => {
      window.removeEventListener("storage", lisStorage);
    };
  }, [pageProps]);
  return <Component {...pageProps}></Component>
}

export default function MyApp({ Component, pageProps }) {
  const [inited, setInited] = useState(false);
  // const loading = useSelector(selectLoading);
  const { t } = useTranslation();
  const demoData = useMemo(() => {
    // return .
    const data = localStorage.getItem("demoData");
    const demoDataStr = _.isEmpty(data) ? "{}" : data;
    return JSON.parse(demoDataStr);
  }, [pageProps]);
  
  const store = useStore({ ...pageProps.initialReduxState, demoData });
  return (
    <Provider store={store}>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {!inited && <DetectLang onInit={() => setInited(true)} />}
      {inited && (
        <div>
          <AppPage Component={Component} pageProps={pageProps} />
        </div>
      )}
      {/* {loading && <AppLoading />} */}
    </Provider>
  );
}
