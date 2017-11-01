export default ({ appString }) => {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>visual-sketch-dff</title>
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
      }
      .diff-row {
        display: flex;
        flex-direction: row;
      }
      img {
        max-width: 100%;
      }
    </style>
  </head>
  <body>
    <div id="main">
    ${appString}
    </div>
    <script src="/js/bundle.js"></script>
  </body>
</html>
`
}
