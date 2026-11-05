export function getId (prefix=''): string {
  return `${prefix ? prefix + '_' : ''}${Date.now()}`
}