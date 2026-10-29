export const salonPhone = '+918623097761';
export const displaySalonPhone = '+91 86230 97761';
export const salonWhatsAppNumber = salonPhone.replace(/\D/g, '');

export function createWhatsAppUrl(message: string) {
  return `https://wa.me/${salonWhatsAppNumber}?text=${encodeURIComponent(message)}`;
}

export function openWhatsAppChat(message: string) {
  const whatsappWindow = window.open(createWhatsAppUrl(message), '_blank');
  if (!whatsappWindow) return false;

  whatsappWindow.opener = null;
  return true;
}
