const nanoid = require("ssid");
const URL = require("../model/shortUrl");
async function handleShortId(req, res) {
  if (!req.body.url) return res.json({ err: "url is required" });
  let shortid = nanoid();
  await URL.create({
    shortId: shortid,
    redirectURL: req.body.url,
    visitedHistory: [],
  });
  return res.json({ status: "created", id: shortid });
}

module.exports = {
  handleShortId,
};
