export default (number) => {
    return new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(
        number,
    )
}