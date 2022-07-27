module.exports = {
  reactStrictMode: true,
  async rewrites() {
    const slug = "/:pathname*";
    const languages = process.env.NEXT_PUBLIC_MGNL_LANGUAGES.split(" ").filter(lang => lang !== 'en').map(
      (language) => "/" + language
    );

    let rewritesRoutes = []
    for (const language of languages) {
      rewritesRoutes.push({
        source: language + '/categories' + slug, 
        destination: '/categories' + language + slug
       });
    }

    return rewritesRoutes
  }
};
