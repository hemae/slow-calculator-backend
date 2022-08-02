export function upperCase(word: string): string {
    return word[0].toUpperCase() + word.slice(1)
}

export function turnSnakeToCamel(phrase: string): string {
    return phrase
        .split('-')
        .map((part, index) => index !== 0 ? upperCase(part) : part)
        .join('')
}

export function turnToSingleForm(word: string): string {
    return word.slice(0, word.length - 1)
}
