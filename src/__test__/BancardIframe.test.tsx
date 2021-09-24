import { render, RenderResult } from "@testing-library/react";
import { BancardIframe, iFrameType } from "../BancardIframe";
import { ERRORES } from "../components/Error/ErrorComponent";

const IFRAME_TITLE = "BANCARD_FORM";
const BURL = "https://vpos.infonet.com.py:8888";

describe("<BancardIframe />", () => {
  describe("Checkout", () => {
    let component: RenderResult;
    let iFrame: HTMLElement;
    const processId = "1234";

    beforeAll(() => {
      component = render(<BancardIframe processId={processId} />);
    });

    afterAll(() => {
      component.unmount();
    });

    test("It creates the iframe", () => {
      iFrame = component.getByTitle(IFRAME_TITLE);
    });

    test("Iframe points to correct URL", () => {
      const src = iFrame.getAttribute("src");
      const url = `${BURL}/checkout/new?process_id=${processId}`;
      expect(src).toBe(url);
    });
  });

  describe("Cards", () => {
    let component: RenderResult;
    let iFrame: HTMLElement;
    const processId = "5678";
    const processType: iFrameType = "NewCard";

    beforeAll(() => {
      component = render(
        <BancardIframe processId={processId} processType={processType} />
      );
    });

    afterAll(() => {
      component.unmount();
    });

    test("It creates the iframe", () => {
      iFrame = component.getByTitle(IFRAME_TITLE);
    });

    test("Iframe points to correct URL", () => {
      const src = iFrame.getAttribute("src");
      const url = `${BURL}/checkout/register_card/new?process_id=${processId}`;
      expect(src).toBe(url);
    });
  });

  describe("Zimple", () => {
    let component: RenderResult;
    let iFrame: HTMLElement;
    const processId = "91011";
    const processType: iFrameType = "Zimple";

    beforeAll(() => {
      component = render(
        <BancardIframe processId={processId} processType={processType} />
      );
    });

    afterAll(() => {
      component.unmount();
    });

    test("It creates the iframe", () => {
      iFrame = component.getByTitle(IFRAME_TITLE);
    });

    test("Iframe points to correct URL", () => {
      const src = iFrame.getAttribute("src");
      const url = `${BURL}/checkout/zimple/new?process_id=${processId}`;
      expect(src).toBe(url);
    });
  });

  describe("Confirmation", () => {
    let component: RenderResult;
    let iFrame: HTMLElement;
    const aliasToken = "mi-token";
    const processType: iFrameType = "Confirmation";

    beforeAll(() => {
      component = render(
        <BancardIframe aliasToken={aliasToken} processType={processType} />
      );
    });

    afterAll(() => {
      component.unmount();
    });

    test("It creates the iframe", () => {
      iFrame = component.getByTitle(IFRAME_TITLE);
    });

    test("Iframe points to correct URL", () => {
      const src = iFrame.getAttribute("src");
      const url = `${BURL}/alias_token/confirmation/new?alias_token=${aliasToken}`;
      expect(src).toBe(url);
    });
  });

  describe("Preauthorization", () => {
    let component: RenderResult;
    let iFrame: HTMLElement;
    const processId = "121314";
    const processType: iFrameType = "Preauthorization";

    beforeAll(() => {
      component = render(
        <BancardIframe processId={processId} processType={processType} />
      );
    });

    afterAll(() => {
      component.unmount();
    });

    test("It creates the iframe", () => {
      iFrame = component.getByTitle(IFRAME_TITLE);
    });

    test("Iframe points to correct URL", () => {
      const src = iFrame.getAttribute("src");
      const url = `${BURL}/checkout/preauthorization/new?process_id=${processId}`;
      expect(src).toBe(url);
    });
  });

  describe("ErrorComponent renders correctly", () => {
    let component: RenderResult;

    afterEach(() => {
      component.unmount();
    });

    test("When processId and aliasToken props are not passed", () => {
      component = render(<BancardIframe />);
      component.getByText(ERRORES[1]);
    });

    test("When the type of process is not Confirmation and the processId is not passed", () => {
      component = render(
        <BancardIframe processType="NewCard" aliasToken="my-token" />
      );
      component.getByText(ERRORES[2]);
    });

    test("When the type of process is Confirmation and the aliasToken is not passed", () => {
      component = render(
        <BancardIframe processType="Confirmation" processId="123456" />
      );
      component.getByText(ERRORES[3]);
    });
  });
});
