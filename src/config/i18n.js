import {Translate} from "react-redux-i18n";
import React from "react";

export const supportedLocales = {
  en: <Translate value="concerts.english" />,
  pl: <Translate value="concerts.polish" />,
};

export const defaultLocale = "en";

export const fallbackLocale = "en";
