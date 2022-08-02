export function cookieParser(cookie: string, targets: string[]): Record<string, string | null> {

    const split = cookie.split(' ')

    let returned: Record<string, string | null> = {}

    targets.forEach(target => {
        split.forEach(el => {
            if (el.includes(target)) returned[target] = el.split('=')[1]
        })
    })

    targets.forEach(target => {
        if (!returned[target]) returned[target] = null
    })

    return returned
}
