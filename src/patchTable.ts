import $ from 'jquery'
import { avgGradeColorize } from './colors'

export default function patchTable(container: JQuery, marks: number[][]) {
  const table = container.children().get(2)
  if (!table) return

  // удаление ненужного
  $('.date-grid__cell.date-grid__cell_type_invisible').remove()

  // возвращаем возможность копировать текст
  $(table).css('user-select', 'auto')

  // добавление заголовка для новго столбца
  const heading = $('thead>tr>th', table).first().clone().html('Ср. балл:')
  $('thead>tr', table).first().prepend(heading)

  // див, свидетельствующий о изменении таблицы
  $(table).append(
    $('<div></div>').attr('id', 'table-is-patched').css('display', 'none'),
  )

  // создание ячеек со средним баллом
  const baseTd = $('table>tr>td', table).first().clone().html('')
  $('table>tr', table).each((index, el) => {
    if (index > marks.length - 1) return
    const td = baseTd.clone()

    if (!(marks[index].length === 0)) {
      let gradesSum = 0
      marks[index].forEach((mark) => (gradesSum += mark))
      const avgGrade = gradesSum / marks[index].length

      td.html(avgGrade.toFixed(2))
        .css('font-weight', '700')
        .css('color', avgGradeColorize(avgGrade))
    } else {
      td.html('n/a')
    }
    $(el).prepend(td)
  })
}
