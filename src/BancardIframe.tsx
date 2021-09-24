import { ErrorComponent } from "./components";
import { useUtils, IData } from "./hooks/useUtils";
import { addParamToUrl } from "./utils";

export type iFrameStyles = {
  "form-background-color"?: string;
  "button-background-color"?: string;
  "button-text-color"?: string;
  "button-border-color"?: string;
  "input-background-color"?: string;
  "input-text-color"?: string;
  "input-placeholder-color"?: string;
};

export type iFrameType =
  | "Checkout"
  | "NewCard"
  | "Zimple"
  | "Confirmation"
  | "Preauthorization";

export type BancardIframeProps = {
  /** Process identifier (processId) to be used to invoke the iframe of occasional payment */
  processId?: string;
  /** It is obtained when retrieving the list of cards of a user */
  aliasToken?: string;
  /** The type of process to be carried out in this operation */
  processType?: iFrameType;
  /** In what environment is the application running */
  enviroment?: "Production" | "Staging";
  /** You can pass options to customize the styles of the iFrame or to add a custom response handler */
  options?: {
    /** Only HEX, HSL and RGB formats are valid */
    styles?: iFrameStyles;
    /**
     * Custom response handler.
     * You can pass a function to modify the default behavior of the component that would redirect to the return url.
     * @param {IData} data vpos response object
     */
    handler?: (data: IData) => void;
  };
};

/** This component returns an iFrame that allows loading the form in the trade site */
export function BancardIframe({
  processId,
  aliasToken,
  processType = "Checkout",
  enviroment = "Staging",
  options,
}: BancardIframeProps) {
  const { IFRAME_TYPE, iFrameHeight } = useUtils({
    enviroment: enviroment,
    customHandler: options?.handler,
  });

  //We validate that the processID and aliasToken props are passed
  if (!processId && !aliasToken) return <ErrorComponent errorCode={1} />;
  if (processType !== "Confirmation" && !processId)
    return <ErrorComponent errorCode={2} />;
  if (processType === "Confirmation" && !aliasToken)
    return <ErrorComponent errorCode={3} />;

  //We create the url according to the type of iFrame that we must render
  const url = IFRAME_TYPE[processType];
  let iFrameUrl = url;
  if (processId && processType !== "Confirmation")
    iFrameUrl = addParamToUrl(url, "process_id", processId);

  if (aliasToken && processType === "Confirmation")
    iFrameUrl = addParamToUrl(url, "alias_token", aliasToken);

  //We check if parameters were passed to style the iFrame and add it to the url
  let newIframeUrl = iFrameUrl;
  if (options && options.styles && Object.keys(options.styles).length > 0) {
    const styles = encodeURIComponent(JSON.stringify(options.styles));
    newIframeUrl = addParamToUrl(iFrameUrl, "styles", styles);
  }

  //We return to the iFrame
  return (
    <iframe
      title="BANCARD_FORM"
      src={newIframeUrl}
      style={{ width: 500, height: iFrameHeight, borderWidth: 0 }}
    />
  );
}
