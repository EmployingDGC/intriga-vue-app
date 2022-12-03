const get_str_month = (month) => {
    const o = {
        0: "Jan",
        1: "Fev",
        2: "Mar",
        3: "Abr",
        4: "Mai",
        5: "Jun",
        6: "Jul",
        7: "Ago",
        8: "Set",
        9: "Out",
        10: "Nov",
        11: "Dez",
    }

    return o[month]
}

const format_date = (date) => {
    const days = date.getDate()
    const months = date.getMonth()
    const years = date.getFullYear()
    const hours = date.getHours()
    const minutes = date.getMinutes()

    const str_month = get_str_month(months)

    return `${days} de ${str_month} de ${years} às ${hours}:${minutes}`
}

export {
    get_str_month,
    format_date
}
