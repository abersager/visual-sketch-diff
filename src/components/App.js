import React from 'react'

export default ({ created, deleted, subsisting }) => {
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
                <img src={`./before/${x}`} />
              </div>
              <div className="diff">
                <img src={`./diff/${x}`} />
              </div>
              <div className="after">
                <img src={`./after/${x}`} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
