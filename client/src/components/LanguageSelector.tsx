import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  return (
    <div>
      <h3>Choose your language</h3>
      <img
        src="https://countryflagsapi.com/svg/ru"
        title="Russian"
        height="25"
        onClick={() => i18n.changeLanguage("tr")}
        alt="Turkish Flag"
      />
      <img
        src="https://countryflagsapi.com/svg/gb"
        title="English"
        height="25"
        onClick={() => i18n.changeLanguage("en")}
        alt="Great Britain Flag"
      />
    </div>
  );
};

export default LanguageSelector;
