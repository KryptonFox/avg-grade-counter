import $ from 'jquery'

export function scanMarks(container: JQuery): Array<number[]> {
  const markTable = $('tbody.ng-star-inserted', container)

  let marks: Array<number[]> = []
  let tmp: number[] = []

  $('tr', markTable).each((index, el) => {
    tmp = []
    $('span.estimate__value', el).each((index, el) => {
      const numMark = Number(el.innerText)
      if (numMark) tmp.push(numMark)
    })
    marks.push(tmp)
  })

  return marks
}
