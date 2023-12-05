export { formatDate, dayConvert, choices, newDatePlusOne, isEmptyObject }
function formatDate(date) {
  const formDate = new Date(date)
  return formDate.toLocaleDateString('en-GB')
}
function isEmptyObject(obj) {
  return Object.keys(obj).length === 0
}

function dayConvert(day) {
  switch (day) {
    case 0:
      return 'Normal'
    case 1:
      return 'Weekend'
    case 2:
      return 'Times off'
    case 3:
      return 'Sick leave'
    case 4:
      return 'Public holiday'
    case 5:
      return 'Job Travel'
  }
}

const choices = [
  { id: 0, choice: 'Normal' },
  { id: 1, choice: 'Weekend' },
  { id: 2, choice: 'Times off' },
  { id: 3, choice: 'Sick leave' },
  { id: 4, choice: 'Public holiday' },
  { id: 5, choice: 'Job Travel' },
]

function newDatePlusOne(array) {
  if (array.length > 0) {
    let date = new Date(array[array.length - 1].date)
    date.setDate(date.getDate() + 1)
    return date.toISOString().split('T')[0]
  } else {
    let date = new Date(Date.now())
    return date.toISOString().split('T')[0]
  }
}
