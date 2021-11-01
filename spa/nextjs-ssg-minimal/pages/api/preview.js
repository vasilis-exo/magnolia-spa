// More about Preview Mode: https://nextjs.org/docs/advanced-features/preview-mode

export default function handler(req, res) {
  res.setPreviewData({
    query: req.query,
  });
  //console.log("preview:" + req.query.slug)
  res.redirect(req.query.slug);
}
