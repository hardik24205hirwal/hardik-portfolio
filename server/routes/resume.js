const express = require("express");
const path = require("path");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| GET /api/resume/download
|--------------------------------------------------------------------------
*/

router.get("/download", (req, res) => {
  const resumePath = path.join(
    __dirname,
    "..",
    "public",
    "resume.pdf"
  );

  res.download(
    resumePath,
    "Hardik_Hirwal_Resume.pdf",
    (error) => {
      if (error) {
        console.error("Resume download error:", error);

        if (!res.headersSent) {
          res.status(404).json({
            success: false,
            message: "Resume not found."
          });
        }
      }
    }
  );
});

module.exports = router;
