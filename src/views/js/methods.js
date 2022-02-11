// 显示连接桩
const showPorts = (ports, show) => {
  for (let i = 0, len = ports.length; i < len; i = i + 1) {
    ports[i].style.visibility = show ? 'visible' : 'hidden'
  }
}

// 删除节点
const delNode = (cell, graph) => {
  graph.getCellById(cell.id).remove()
}

// 闭环判断
const closedLoopJudge = (s, t, graph, id) => {
  const edgeInfo = graph.toJSON().cells.filter(e => e.shape === 'edge')

  // 获取所有目标 === s的数据
  const targetInfo = edgeInfo.filter(e => e.target.cell === s)

  let isRing = false
  // 获取
  targetInfo.forEach(e => {
    if (e.source.cell === t) {
      console.log('闭环了')
      isRing = true
      graph.removeCells([id])
    } else {
      !isRing && closedLoopJudge(e.source.cell, t, graph, id)
    }
  })
}

// 判断节点是否被重复连线
const determineRepeat = (s, t, graph) => {
  const edgeInfo = graph.toJSON().cells.filter(e => e.shape === 'edge')
  const repeatNode = edgeInfo.filter(
    e => e.target.cell === t && e.source.cell === s
  )
  return repeatNode
}

export {
  showPorts,
  delNode,
  determineRepeat,
  closedLoopJudge
}
