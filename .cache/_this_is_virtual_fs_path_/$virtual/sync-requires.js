
// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": preferDefault(require("/Users/dylanking6132/xylvnking/markdown-editor/.cache/dev-404-page.js")),
  "component---src-pages-404-js": preferDefault(require("/Users/dylanking6132/xylvnking/markdown-editor/src/pages/404.js")),
  "component---src-pages-authorized-editor-component-js": preferDefault(require("/Users/dylanking6132/xylvnking/markdown-editor/src/pages/AuthorizedEditorComponent.js")),
  "component---src-pages-index-js": preferDefault(require("/Users/dylanking6132/xylvnking/markdown-editor/src/pages/index.js"))
}

