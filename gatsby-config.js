module.exports = {
  siteMetadata: {
    title: `markdown-editor`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Markdown Editor and Storage",
        short_name: "MD Editor",
        start_url: "/",
        // background_color: "#6b37bf",
        // theme_color: "#6b37bf",
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: "standalone",
        icon: "src/favicon32.png" // This path is relative to the root of the site.
      }
    }
  ],
  
  
}
