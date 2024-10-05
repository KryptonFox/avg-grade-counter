import { scanMarks } from './scanMarks'
import scanSubjects from './scanSubjects'
import $ from 'jquery'
import patchTable from './patchTable'

export default function setObserver() {
  const observer = new MutationObserver((mutations) => {
    console.log(1)
    if ($('div#table-is-patched').length === 0) {
      console.log(2)
      const container = $('div.date-grid.ng-star-inserted')
      if (!container.length) return

      // вывод всех оценок в консоль (по приколу)
      const marks = scanMarks(container)
      const subjects = scanSubjects(container)
      for (let i = 0; i < subjects.length; i++) {
        console.log(subjects[i], marks[i])
      }

      patchTable(container, marks)
    }
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  })
}