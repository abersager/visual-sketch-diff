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
      ul {
        list-style: none;
        padding: 0;
      }
      li {
      }
      li button {
        display: inline-block;
        width: 24px;
        height: 24px;
        background: 0;
        margin-right: .5em;
      }
      li button:before {
        content: '▶︎';
        display: block;
      }
      li.expanded button:before {
        content: '▼';
      }
      li .diff-row {
        display: none;
        flex-direction: row;
        max-width: 600px;
        max-height: 200px;
        overflow:hidden;
        cursor: zoom-in;
      }
      li.expanded .diff-row {
        display: flex;
      }
      li .diff-row.full-screen {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        max-width: none;
        max-height: none;
        background: white;
        cursor: zoom-out;
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
    <script>
    (function() {
      const toggleClass = (el, className) => {
        const classNames = el.className.split(' ')

        const filtered = classNames.filter(x => x !== className)

        if (filtered.length === classNames.length) {
          filtered.push(className)
        }
        el.className = filtered.join(' ')
      }

      const handleButtonClick = (e) => {
        const li = e.currentTarget.parentElement.parentElement

        toggleClass(li, 'expanded')
      }

      const handleDiffClick = (e) => {
        const diffRow = e.currentTarget

        toggleClass(diffRow, 'full-screen')
      }

      document.querySelectorAll('li button').forEach((el) => { el.addEventListener('click', handleButtonClick) })
      document.querySelectorAll('li .diff-row').forEach((el) => { el.addEventListener('click', handleDiffClick) })
    })()
    </script>
  </body>
</html>
`
}
