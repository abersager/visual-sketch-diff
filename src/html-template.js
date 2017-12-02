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
        max-height: 200px;
        overflow:hidden;
      }
      li.expanded .diff-row {
        display: flex;
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

      const handleClick = (e) => {
        const li = e.currentTarget.parentElement.parentElement

        toggleClass(li, 'expanded')
      }

      document.querySelectorAll('li button').forEach((el) => { el.addEventListener('click', handleClick) })
    })()
    </script>
  </body>
</html>
`
}
