// WhatsApp reservation form script
const form = document.getElementById('reservation-form') as HTMLFormElement;

if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(form);
    const date = formData.get('date') as string;
    const time = formData.get('time') as string;
    const people = formData.get('people') as string;
    const name = formData.get('name') as string;

    // Format the WhatsApp message
    const message = `Hola! Me gustaría hacer una reserva:
- Fecha: ${date}
- Hora: ${time}
- Personas: ${people}
- Nombre: ${name}`;

    // Get WhatsApp phone from environment variable or use default
    const phone = import.meta.env.PUBLIC_WHATSAPP_PHONE || '542996120756';

    // Create WhatsApp link with the message
    const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp
    window.open(whatsappLink, '_blank');
  });
}
