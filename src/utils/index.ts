import { IData } from "../hooks/useUtils";

/** Function that adds parameters to the url */
export const addParamToUrl = (url: string, param: string, value: string) => {
  const lastUrlChar = url.slice(-1);
  const paramValue = `${param}=${value}`;
  let newUrl = url;

  if (["&", "?"].indexOf(lastUrlChar) > -1) {
    newUrl += paramValue;
  } else if (url.indexOf("?") > -1) {
    newUrl = `${newUrl}&${paramValue}`;
  } else {
    newUrl = `${newUrl}?${paramValue}`;
  }

  return newUrl;
};

/** Function that redirects to the confirmation or cancellation url */
export const redirect = (data: IData) => {
  const { message, details, return_url: returnUrl } = data;

  if (!returnUrl || !message) return;

  let url = addParamToUrl(returnUrl, "status", message);

  if (typeof details !== "undefined") {
    url = addParamToUrl(url, "description", details);
  }
  window.location.replace(url);
};
