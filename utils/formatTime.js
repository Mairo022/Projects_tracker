export default (inputTime) => {
    inputTime = new Date(inputTime)
    const currentTime = new Date()
    const difference = currentTime.getTime() - inputTime.getTime()

    const seconds = difference / 1000
    const minutes = seconds / 60
    const hours = minutes / 60
    const days = hours / 24
    const weeks = days / 7

    if (minutes < 1) return "1m"
    if (minutes < 60) return Math.round(minutes) + "m"
    if (hours < 24) return Math.round(hours) + "h"
    if (days < 7) return Math.round(days) + "d"
    if (weeks > 1) return Math.round(weeks) + "w"

    return "NULL"
}