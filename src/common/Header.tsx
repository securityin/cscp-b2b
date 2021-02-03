import i18n from "i18next/index";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "../base/hooks";
import { classNames } from "../base/utils";
import s from "./Header.module.scss";

interface LangItem {
  key: string;
  name: string;
}
const en: LangItem = { key: "en", name: "EN" };
const zhCN: LangItem = { key: "zhCN", name: "中文" };
const langs: LangItem[] = [en, zhCN];

function Tab({ text = "", to = "", active = false }) {
  return (
    <div className={classNames( active? s.activeTab : s.tab)}>
      <Link href={to}>{text}</Link>
    </div>
  );
}

export default function Header() {
  const { t } = useTranslation();
  // lang
  const [cLang, setLang] = useState(
    langs.find((l) => l.key === i18n.language) ?? en
  );
  const cIndex = langs.findIndex((l) => l.key === cLang.key);
  const onSelect = (lang: LangItem) => {
    i18n.changeLanguage(lang.key);
    setLang(lang);
  };

  // active
  const { pathname } = useRouter()

  return (
    <div className={s.header}>
      <img src={'logo.jpeg'} style={{ height: 50}}/>
      <Tab text={"买家(交易)"} to={"/buyer"} active={pathname === '/buyer' || pathname === ''}/>
      <Tab text={"卖家"} to={"/seller"} active={pathname === '/seller'}/>
      <Tab text={"买家(财务)"} to={"/buyerFinance"} active={pathname === '/buyerFinance'}/>
    </div>
  );
}
