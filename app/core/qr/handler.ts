import { Html5Qrcode, Html5QrcodeResult } from "html5-qrcode";
import { Html5QrcodeError, Html5QrcodeSupportedFormats } from "html5-qrcode/esm/core";

export function startScanQR(onSuccess: (data: any) => void) {
  const errors: any = [];
  
  let lastItem: any = null;

  function onScanSuccess(decodedText: string, decodedResult: Html5QrcodeResult) {
    if (lastItem == decodedText) {
      console.log("duplicate: ", decodedText);
      return;
    }

    console.log("will process", decodedText);
    lastItem = decodedText;

    try {
      const item = JSON.parse(decodedText);
      console.log("did process", item);

      onSuccess(item);
    } catch (error) {
      onSuccess(decodedText);
      console.error("parse error: ", error);
    }
  }

  function onScanFailure(errorMessage: string, error: Html5QrcodeError) {
    console.error("scan error: ", errorMessage);
    // errors.push(error);
  }

  const html5QrCode = new Html5Qrcode(/* element id */ "reader", {
    formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
    verbose: false
  });

  html5QrCode
    .start(
      { facingMode: "environment" },
      {
        fps: 2,
        qrbox: (w,h) => {return {width: w *0.8, height: h *0.8}},
        aspectRatio: 1.0
      },
      onScanSuccess,
      onScanFailure
    )
    .catch((err) => {
      console.error("start error", err);
    });
}
