module.exports = (before, after) => {
  const afterIndexed = after.map(x => ({ name: x }))
  const deleted = []
  const subsisting = before.filter((name) => {
    const afterIndex = afterIndexed.findIndex((entry) => entry.name === name)
    if (afterIndex === -1) {
      deleted.push(name)
      return false
    } else {
      afterIndexed[afterIndex].subsisting = true
      return true
    }
  })
  const created = afterIndexed.map((entry) => {
    if (entry.subsisting) {
      return
    }
    return entry.name
  }).filter(name => Boolean(name))

  return { subsisting, created, deleted }
}
