// Hàm chuyển đổi định dạng thời gian từ giây sang phút:giây
function formatTime(seconds) {
    // Tính toán số phút bằng cách chia cho 60 và lấy phần nguyên
    const minutes = Math.floor(seconds / 60);

    // Tính toán số giây bằng cách chi chia cho 60 và lấy phần dư
    const remainingSeconds = Math.floor(seconds % 60);

    // Chuyển đổi số phút, số giây thành chuỗi và sử dụng padStart(2, '0') để đảm bảo rằng chuỗi luôn
    // có ít nhất 2 chữ sô. Nếu số phút (số giây) có ít hơn 2 chữ số thì kí tự '0' sẽ được thêm
    // vào đầu chuỗi để đảm bảo rằng chuỗi luôn có độ dài 2 kí tự
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

export default formatTime;
