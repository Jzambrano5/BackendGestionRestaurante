import QRCode from 'qrcode';

export const generateMenuQRCode = async (req, res) => {
  try {
    // URL o texto que deseas codificar en el QR
    const menuUrl = "https://tu-dominio.com/menu"; // Cambia este enlace según tu aplicación

    // Generar el código QR
    const qrCodeDataUrl = await QRCode.toDataURL(menuUrl);

    // Responder con el código QR como una imagen
    res.status(200).json({
      message: "QR Code generado exitosamente",
      qrCode: qrCodeDataUrl,
    });
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ error: error.message });
  }
};
