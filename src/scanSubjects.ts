import $ from 'jquery'

export default function scanSubjects(container: JQuery): String[] {
  let subjects: String[] = []
  $('table>tr', container.children().first()).each((index, el) => {
    subjects.push($('td', el).first().html())
  })

  return subjects
}
