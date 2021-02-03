import detectLang from 'detect-browser-language';
import i18n from "i18next/index";
import { useEffect } from "react";
import _ from 'lodash';

export default function DetectLang(p: { onInit: Function }) {
  useEffect(() => {
    i18n.changeLanguage(_.replace((detectLang() ?? 'en'), '-', ''))
    p.onInit()
  }, [p])
  return null
}