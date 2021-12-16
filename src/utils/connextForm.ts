async function getFormSubmission(req: any) {
  return new Promise((resolve) => {
    if (req.method == "POST") {
      let body = "";
      req.on("data", (chunk: any) => {
        body += chunk;
      });
      req.on("end", () => {
        resolve(JSON.parse(body));
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
  const data_obj = getFormData(ev.target);

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

function getFormData(form: any) {
  const namedElements = form.querySelectorAll("[name]");
  const return_data = {};
  namedElements.forEach((elm: any) => {
    const path = elm.getAttribute("name");
    const [name, idx] = getLastProperty(path);
    const data_object = constructObjectFromPath(return_data, path);
    const val = getValue(elm);
    if (idx !== null) {
      data_object[name] = data_object[name] || [];
      data_object[name][idx] = val;
    } else {
      data_object[name] = val;
    }
  });
  return return_data;
}

function constructObjectFromPath(data_obj: any, path: any) {
  const path_split = path.split(".");
  path_split.pop();
  if (path_split.length === 0) return data_obj;
  path_split.forEach((prop: any) => {
    data_obj = tryAddArray(data_obj, prop) || addObject(data_obj, prop);
  });
  return data_obj;
}

function getLastProperty(path: string): [string, null | number] {
  const arrPathRegex = /[[\]]/g;
  const lastProp = path.split(".").at(-1);
  if (!lastProp) return [path, null];
  if (arrPathRegex.test(lastProp)) return getArrayNameAndIndex(lastProp);
  return [lastProp, null];
}

function getArrayNameAndIndex(prop: string): [string, number] {
  const arrPathRegex = /[[\]]/g;
  const arr_split = prop.split(arrPathRegex);
  const propName = arr_split[0];
  const index = arr_split[1];
  if (arr_split.length > 1 && index) return [propName, parseInt(index)];
  throw new Error(
    `Array Path '${prop}' needs an index.  Do not leave [] index empty... must have an integer index, ie: [0]`
  );
}

function tryAddArray(data_obj: any, prop: any) {
  const arrPathRegex = /[[\]]/g;
  if (!arrPathRegex.test(prop)) return undefined;
  const [propName, index] = getArrayNameAndIndex(prop);
  data_obj[propName] = data_obj[propName] || [];
  return addObject(data_obj[propName], index);
}

function addObject(data_obj: any, prop: any) {
  data_obj[prop] = data_obj[prop] || {};
  return data_obj[prop];
}

function getValue(elm: any) {
  if (elm.value) return elm.value;
  return "";
}

export { getFormSubmission, connextFormSubmit };
