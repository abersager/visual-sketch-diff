import React from 'react'

class Artboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: this.hasChanged()
    }
  }

  handleClick() {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  hasChanged() {
    const { type, diffRatio } = this.props
    return type === 'subsisting' && diffRatio > 0
  }

  getPrefix() {
    const { type, diffRatio } = this.props
    return {
      created: 'Added',
      deleted: 'Removed',
      subsisting: this.hasChanged() ? 'Changed' : 'Unchanged'
    }[type]
  }

  render() {
    const { name, type } = this.props
    const { expanded } = this.state

    return (
      <li className={expanded ? 'expanded' : ''}>
        <h3>
          <button />
          {this.getPrefix()}: {name}
        </h3>
        <div className={`diff-row ${type}`}>
          <div className="before">
            {type !== 'created' ? <img src={`./before/${name}`} /> : null}
          </div>
          <div className="diff">
            {type === 'subsisting' ? <img src={`./diff/${name}`} /> : null}
          </div>
          <div className="after">
            {type !== 'deleted' ? <img src={`./after/${name}`} /> : null}
          </div>
        </div>
      </li>
    )
  }
}

export default ({ artboards }) => {
  return (
    <div>
      <h1>visual-sketch-diff</h1>
      <ul>
        {artboards.map((x) => <Artboard key={x.name} {...x} />)}
      </ul>
    </div>
  )
}
