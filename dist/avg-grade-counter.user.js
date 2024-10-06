// ==UserScript==
// @name         Average Grade Counter
// @namespace    http://tampermonkey.net
// @version      1.0.1
// @description  Добавляет столбец со средним баллом для dnevnik2.petersburgedu.ru
// @author       KryptonFox
// @match        https://dnevnik2.petersburgedu.ru/estimate
// @icon         https://www.google.com/s2/favicons?sz=64&domain=petersburgedu.ru
// @grant        none
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// @updateURL    https://raw.githubusercontent.com/KryptonFox/avg-grade-counter/master/dist/avg-grade-counter.user.js
// @downloadURL  https://raw.githubusercontent.com/KryptonFox/avg-grade-counter/master/dist/avg-grade-counter.user.js
// ==/UserScript==

(function ($) {
    'use strict';

    function scanMarks(container) {
        var markTable = $('tbody.ng-star-inserted', container);
        var marks = [];
        var tmp = [];
        $('tr', markTable).each(function (index, el) {
            tmp = [];
            $('span.estimate__value', el).each(function (index, el) {
                var numMark = Number(el.innerText);
                if (numMark)
                    tmp.push(numMark);
            });
            marks.push(tmp);
        });
        return marks;
    }

    function scanSubjects(container) {
        var subjects = [];
        $('table>tr', container.children().first()).each(function (index, el) {
            subjects.push($('td', el).first().html());
        });
        return subjects;
    }

    var colors = {
        perfect: '#33a240',
        good: '#f4ca64',
        warning: '#e77a00',
        bad: '#c44',
    };
    function avgGradeColorize(grade) {
        if (grade >= 4.5) {
            return colors.perfect;
        }
        else if (grade >= 3.5) {
            return colors.good;
        }
        else if (grade >= 2.5) {
            return colors.warning;
        }
        else {
            return colors.bad;
        }
    }

    function patchTable(container, marks) {
        var table = container.children().get(2);
        if (!table)
            return;
        // удаление ненужного
        $('.date-grid__cell.date-grid__cell_type_invisible').remove();
        // возвращаем возможность копировать текст
        $(table).css('user-select', 'auto');
        // добавление заголовка для новго столбца
        var heading = $('thead>tr>th', table).first().clone().html('Ср. балл:');
        $('thead>tr', table).first().prepend(heading);
        // див, свидетельствующий о изменении таблицы
        $(table).append($('<div></div>').attr('id', 'table-is-patched').css('display', 'none'));
        // создание ячеек со средним баллом
        var baseTd = $('table>tr>td', table).first().clone().html('');
        $('table>tr', table).each(function (index, el) {
            if (index > marks.length - 1)
                return;
            var td = baseTd.clone();
            if (!(marks[index].length === 0)) {
                var gradesSum_1 = 0;
                marks[index].forEach(function (mark) { return (gradesSum_1 += mark); });
                var avgGrade = gradesSum_1 / marks[index].length;
                td.html(avgGrade.toFixed(2))
                    .css('font-weight', '700')
                    .css('color', avgGradeColorize(avgGrade));
            }
            else {
                td.html('n/a');
            }
            $(el).prepend(td);
        });
    }

    function setObserver() {
        var observer = new MutationObserver(function (mutations) {
            if ($('div#table-is-patched').length === 0) {
                var container = $('div.date-grid.ng-star-inserted');
                if (!container.length)
                    return;
                // вывод всех оценок в консоль (по приколу)
                var marks = scanMarks(container);
                var subjects = scanSubjects(container);
                for (var i = 0; i < subjects.length; i++) {
                    console.log(subjects[i], marks[i]);
                }
                patchTable(container, marks);
            }
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    }

    (function () {
        $(function () {
            console.log('hewwo wowd fwom KryptonFox ^^');
            setObserver();
        });
    })();

})($);
