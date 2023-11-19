export const ConvertInternalDateString = (param) => {
    // Örnek olarak backend'ten gelen tarih ve saat bilgisi
    const backendDateTimeString = param;

    // Tarih nesnesine dönüştür
    const backendDate = new Date(backendDateTimeString);

    // Biçimlendirme seçenekleri
    const options = { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false };

    // Tarih ve saat bilgisini dd/mm/yy hh:mm biçimine çevir
    const formattedDateTime = backendDate.toLocaleString('tr-TR', options);

    return formattedDateTime
}