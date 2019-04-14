function match (regexp, text) {
    if (regexp[0] === '^') return matchhere(regexp.substring(1), text)
    let i = 0;
    do {
        if (matchhere(regexp, text.substring(i)))
            return 1;
    } while (i++ < text.length);
    return 0;
}

function matchhere (regexp, text) {
    if (regexp.length === 0)
        return 1;
    if (text.length > 0 && (regexp[0] === text[0]))
        return matchhere(regexp.substring(1), text.substring(1))
    return 0;
}