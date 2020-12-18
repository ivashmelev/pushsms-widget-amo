const cleanPhone = phone => (phone || '').replace('').replace(/\D/g, '');

export default phone => {
    const numbers = cleanPhone(phone)
    let formatted = ``
    for (let i = 0; i < numbers.length; i++) {
        formatted += '' + numbers[i]
    }
    return formatted.slice(0, 11)
}