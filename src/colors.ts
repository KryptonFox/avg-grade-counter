export const colors = {
  perfect: '#33a240',
  good: '#f4ca64',
  warning: '#e77a00',
  bad: '#c44',
}

export function avgGradeColorize(grade: number) {
  if (grade >= 4.5) {
    return colors.perfect
  } else if (grade >= 3.5) {
    return colors.good
  } else if (grade >= 2.5) {
    return colors.warning
  } else {
    return colors.bad
  }
}