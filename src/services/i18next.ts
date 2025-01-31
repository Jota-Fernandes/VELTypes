import i18next from "i18next";

import { initReactI18next } from "react-i18next";
import ptbr from "../../locales/pt-br.json";
import es from "../../locales/es.json";

i18next.use(initReactI18next).init({
    lng: 'ptbr',
    fallbackLng: 'ptbr',
    resources: {
        ptbr: ptbr,
        es: es,
    },
    interpolation:{
        escapeValue: false
    }
});

export default i18next;