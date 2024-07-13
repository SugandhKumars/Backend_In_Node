const express = require("express");
const router = express.Router();
const { handleShortId } = require("../controllers/url");
const URL = require("../model/shortUrl");
router.post("/", handleShortId);

router.get("/:shortUrl", async (req, res) => {
  const shortId = req.params.shortUrl;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitedHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

module.exports = router;
