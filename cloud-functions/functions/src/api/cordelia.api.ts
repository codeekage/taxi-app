import * as express from "express";
import * as request from "request";
import * as cors from "cors";

export const app = express();
app.use(cors());

app.get("/", (req, res) => {
  try {
    const barcode = [8901396393009, 811340707081];
    const proxyurl = "https://cors-anywhere.herokuapp.com/"; // Use a proxy to avoid CORS error
    const api_key = "t7xcbcxmatwkb5jk8yn0wbeh8eimuc";
    const url = proxyurl + "https://api.barcodelookup.com/v2/products";
    const data = new Array();
    barcode.forEach(item => {
      request.get(`${url}?barcode=${item}&key=${api_key}`, async (error, response, body) => {
        const json = await JSON.parse(body);
        data.push(json)
      })
    });
    res.send({ cordelia_api: data });
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});
