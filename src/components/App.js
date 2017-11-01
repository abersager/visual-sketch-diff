import React from 'react'

export default ({ created, deleted, subsisting, pathBefore, pathAfter, pathDiff }) => {
  return (
    <div>
      <h1>visual-sketch-diff</h1>
      <h2>Subsisting</h2>
      <ul>
        {subsisting.map(x => (
          <li key={x}>
            <h3>{x}</h3>
            <div className="diff-row">
              <div className="before">
                <img src={`${pathBefore}/${x}`} />
              </div>
              <div className="diff">
                <img src={`${pathDiff}/${x}`} />
              </div>
              <div className="after">
                <img src={`${pathAfter}/${x}`} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
