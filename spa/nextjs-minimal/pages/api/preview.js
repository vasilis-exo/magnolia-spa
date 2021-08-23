// More about Preview Mode: https://nextjs.org/docs/advanced-features/preview-mode

export default function handler(req, res) {
  res.setPreviewData({});
  res.redirect(req.query.slug);
}
