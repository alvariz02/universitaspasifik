export function csvCell(value: unknown) {
  let text = String(value ?? '')
  if (/^[\s]*[=+@-]/.test(text)) text = "'" + text
  return '"' + text.replace(/"/g, '""') + '"'
}
