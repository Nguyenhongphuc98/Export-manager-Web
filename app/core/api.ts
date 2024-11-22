const USE_IFETCH = false;
const USE_PROXY = true;
const PROXY_URL = "/api/proxy";

class IFetch {
  public iframe: JSX.IntrinsicElements["iframe"] | null = null;

  fetch(...args: any[]): Promise<Response> {

    if (!this.iframe) {
      console.error("no iframe");
      throw new Error("No Iframe");
    }

    const ms = new MessageChannel();
    //@ts-ignore
    this.iframe.contentWindow.postMessage(args, '*', [ms.port1])
  
    // Resolves when the headers comes
    return new Promise((rs, rj) => {
  
      // First message will resolve the Response Object
      ms.port2.onmessage = ({data}) => {
        const stream = new ReadableStream({
          start(controller) {
  
            // Change the onmessage to pipe the remaning request
            ms.port2.onmessage = evt => {
              if (evt.data === true) // Done?
                controller.close()
              else // enqueue the buffer to the stream
                controller.enqueue(evt.data)
            }
          }
        })
  
        // Construct a new response with the 
        // response headers and a stream
        rs(new Response(stream, data))
      }
    })
  }
}

export const ifetch = new IFetch();

export class API {
  static async fetch(url: string, options: RequestInit) {
    if (USE_IFETCH) {
      return ifetch.fetch(url, options)
      // .catch(e => {
      //   if (USE_PROXY) {
      //     return fetch(PROXY_URL + "?o=" + url, options);
      //   } else {
      //     return fetch(url, options);
      //   }
      // });
    }

    if (USE_PROXY) {
      console.log('do fetch', PROXY_URL + "?o=" + url, options);
      return fetch(PROXY_URL + "?o=" + url, options);
    } else {
      return fetch(url, options);
    }
  }
}
