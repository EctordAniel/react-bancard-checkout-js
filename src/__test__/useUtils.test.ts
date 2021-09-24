import { fireEvent } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";
import { useUtils, proURL, devURL } from "../hooks";

describe("useUtils", () => {
  test("Render the hook and return the height for the iFrame", () => {
    const { result } = renderHook(() =>
      useUtils({
        enviroment: "Staging",
      })
    );

    expect(result.current.iFrameHeight).toBe(367);
  });

  test("Render the hook with the correct url for Staging", () => {
    const { result } = renderHook(() =>
      useUtils({
        enviroment: "Staging",
      })
    );

    expect(result.current.IFRAME_TYPE["Checkout"]).toContain(devURL);
  });

  test("Render the hook with the correct url for Production", () => {
    const { result } = renderHook(() =>
      useUtils({
        enviroment: "Production",
      })
    );

    expect(result.current.IFRAME_TYPE["Checkout"]).toContain(proURL);
  });

  test("Update the iFrameHeight when a MessageEvent is received", () => {
    const { result } = renderHook(() =>
      useUtils({
        enviroment: "Staging",
      })
    );

    act(() => {
      fireEvent(
        window,
        new MessageEvent("message", {
          data: { iframeHeight: 405 },
          origin: devURL,
        })
      );
    });

    expect(result.current.iFrameHeight).toBe(406);
  });

  test("Redirect to return_url when a confirmation MessageEvent is received", () => {
    //@ts-ignore
    delete window.location;
    window.location = { ...window.location, replace: jest.fn() };

    renderHook(() =>
      useUtils({
        enviroment: "Staging",
      })
    );

    const url = "http://example.com";
    const message = "sample";

    act(() => {
      fireEvent(
        window,
        new MessageEvent("message", {
          data: { return_url: url, message },
          origin: "https://vpos.infonet.com.py:8888",
        })
      );
    });

    expect(window.location.replace).toBeCalledWith(`${url}?status=${message}`);
  });
});
