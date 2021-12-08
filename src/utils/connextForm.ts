async function handleConnextFormSubmission(req: any, cb: any) {
  return new Promise((resolve) => {
    if (req.method == "POST") {
      let body = "";
      req.on("data", (chunk: any) => {
        body += chunk;
      });
      req.on("end", () => {
        resolve(cb(JSON.parse(body)));
      });
    } else {
      resolve(false);
    }
  });
}

async function connextFormSubmit(ev: any) {
  ev.preventDefault();
  const { buildId } = window.__NEXT_DATA__;
  const page = window.location.pathname;
  const form_data = new FormData(ev.target);
  const data_obj = Object.fromEntries(form_data.entries());

  const data = await fetch(`/_next/data/${buildId}/en${page}.json`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data_obj),
  });

  return new Promise((resolve) => {
    const reader = data.body?.getReader();
    let value = "";
    reader?.read().then(function processText(data): any {
      if (data.done) {
        resolve(JSON.parse(value).pageProps);
        return;
      }
      value += new TextDecoder().decode(data.value);
      return reader.read().then(processText);
    });
  });
}

export { handleConnextFormSubmission, connextFormSubmit };
