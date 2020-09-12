const cleanPhone = phone => (phone || '').replace('8').replace(/\D/g, '');

export default phone => {
    const numbers = cleanPhone(phone)
    // const char = { 0: '(', 3: ')', 6: '-', 8: '-' }
    let formatted = `8`
    for (let i = 0; i < numbers.length; i++) {
        formatted += '' + numbers[i]
    }
    return formatted.slice(0, 11)
}