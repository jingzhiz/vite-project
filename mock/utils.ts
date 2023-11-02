export function getRandomDelayTime(min: number, multiple: number):number {
  const random = Math.random() * multiple
  return Math.round(random) + min
}
