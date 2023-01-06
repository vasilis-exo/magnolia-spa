const fs = require("fs");

const PAGE_NAV_API =
  "http://localhost:8080/magnoliaAuthor/.rest/delivery/pagenav/v1";
const NODE_NAME = "angular-universal-minimal";
const languages = ["en", "de"];

async function getPaths() {
  const results = await fetch(PAGE_NAV_API)
    .then((res) => res.json())
    .then((res) => {
      return res?.results.map((node) => {
        if (node["@path"].startsWith("/" + NODE_NAME)) {
          return node["@path"].replace(NODE_NAME, "").replace("//", "/");
        }
      });
    })
    .then((res) => {
      return res.filter((item) => typeof item === "string");
    })
    .then((res) => {
      let langRes = [];
      languages.forEach((language) => {
        res.forEach((node) => {
          langRes.push(language == "en" ? node : "/" + language + node);
        });
      });
      return langRes;
    });

  var file = fs.createWriteStream("prerender-routes.txt");
  file.on("error", (err) => {
    console.error(err);
  });
  results.forEach((path) => {
    file.write(path + "\n");
  });

  file.end();
}

getPaths();
