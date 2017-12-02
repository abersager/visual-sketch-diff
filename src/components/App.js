import React from 'react'

export default ({ created, deleted, subsisting }) => {
  return (
    <div>
      <h1>visual-sketch-diff</h1>
      <h2>Subsisting</h2>
      <ul>
        {subsisting.map(({ name, diffRatio}) => (
          <li key={name}>
            <h3>{name}</h3>
            <p>Difference: {diffRatio}</p>
            <div className="diff-row">
              <div className="before">
                <img src={`./before/${name}`} />
              </div>
              <div className="diff">
                <img src={`./diff/${name}`} />
              </div>
              <div className="after">
                <img src={`./after/${name}`} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
