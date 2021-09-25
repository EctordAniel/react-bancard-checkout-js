import { useCallback, useEffect, useState } from "react";
import { redirect } from "../utils";

//Constants
export const devURL = "https://vpos.infonet.com.py:8888";
export const proURL = "https://vpos.infonet.com.py";

export interface IData {
  message?: string;
  details?: string;
  return_url?: string;
  iframeHeight?: number;
}

export type useUtilsParams = {
  enviroment: "Production" | "Staging";
  customHandler?: (data: IData) => void;
};

export const useUtils = ({ enviroment, customHandler }: useUtilsParams) => {
  //State for iFrameHeight
  const [iFrameHeight, setIframeHeight] = useState(367);

  const BURL = enviroment === "Production" ? proURL : devURL;
  const CHECKOUT_IFRAME_URL = `${BURL}/checkout/new`;
  const NEW_CARD_IFRAME_URL = `${BURL}/checkout/register_card/new`;
  const ZIMPLE_IFRAME_URL = `${BURL}/checkout/zimple/new`;
  const CONFIRMATION_IFRAME_URL = `${BURL}/alias_token/confirmation/new`;
  const PREAUTHORIZATION_IFRAME_URL = `${BURL}/checkout/preauthorization/new`;

  const IFRAME_TYPE = {
    Checkout: CHECKOUT_IFRAME_URL,
    NewCard: NEW_CARD_IFRAME_URL,
    Zimple: ZIMPLE_IFRAME_URL,
    Confirmation: CONFIRMATION_IFRAME_URL,
    Preauthorization: PREAUTHORIZATION_IFRAME_URL,
  };

  /** Function that handles the iFrame message events */
  const responseHandler = useCallback(
    (event: MessageEvent<IData>) => {
      if (event.origin !== BURL) {
        return;
      }

      if (typeof event.data.iframeHeight !== "undefined") {
        const iframeHeight = event.data.iframeHeight + 1;
        const newIframeHeight = iframeHeight < 328 ? 328 : iframeHeight;
        setIframeHeight(newIframeHeight);
        return;
      }

      if (!customHandler) {
        redirect(event.data);
      } else {
        customHandler(event.data);
      }
    },
    [BURL, customHandler]
  );

  //We add a listener to capture the messages sent by vpos
  useEffect(() => {
    window.addEventListener("message", responseHandler);

    return () => {
      window.removeEventListener("message", responseHandler);
    };
  }, [responseHandler]);

  return { IFRAME_TYPE, iFrameHeight };
};
