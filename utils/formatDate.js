export default (date) => {
    const dateObject = new Date(date);

// I need to format like this `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`
    const formattedDate = dateObject.toLocaleString('en-GB', {}).replace(/\//g, '-').replace(',', '');

// Tạo chuỗi định dạng mới
    return formattedDate;
}