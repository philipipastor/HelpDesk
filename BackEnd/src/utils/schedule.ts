// Cada horário é o início de um atendimento de uma hora: o último, 19:00, termina às 20:00.
export const businessHours = Array.from({ length: 12 }, (_, index) => `${String(index + 8).padStart(2, "0")}:00`)

const brazilNow = new Intl.DateTimeFormat("sv-SE", {
  timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", hourCycle: "h23",
})

export function toDatabaseDate(date: string) {
  return new Date(`${date}T00:00:00.000Z`)
}

export function isValidDate(date: string) {
  const parsed = toDatabaseDate(date)
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().startsWith(date)
}

export function isWeekend(date: string) {
  const weekDay = toDatabaseDate(date).getUTCDay()
  return weekDay === 0 || weekDay === 6
}

// O servidor pode rodar em UTC, então "agora" é sempre calculado no horário de Brasília.
export function isPastSlot(date: string, hour: string, now = new Date()) {
  const [today, currentHour] = brazilNow.format(now).split(" ")
  return date < today || (date === today && hour.slice(0, 2) <= currentHour)
}
