document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactLeadForm');
  const feedback = document.getElementById('formFeedback');
  const submitBtn = document.getElementById('submitBtn');

  // En Vercel con Frontend y Backend unificados, la llamada es relativa directa:
  const API_URL = '/api/clientes';

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Recopilar los valores introducidos por el cliente
      const formData = {
        name: document.getElementById('clientName').value.trim(),
        phone: document.getElementById('clientPhone').value.trim(),
        location: document.getElementById('clientLocation').value.trim(),
        service: document.getElementById('clientService').value,
        area: document.getElementById('clientArea').value.trim() || 'No especificado',
        message: document.getElementById('clientMessage').value.trim() || 'Sin comentarios adicionales',
        date: new Date().toISOString()
      };

      // Desactivar botón temporalmente para evitar envíos dobles
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando solicitud...';
      feedback.className = 'form-feedback';
      feedback.style.display = 'none';

      try {
        // Enviar datos al endpoint del Backend
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          feedback.textContent = '¡Gracias! Hemos recibido tu solicitud. Fabián u Oscar te contactarán a la mayor brevedad.';
          feedback.className = 'form-feedback success';
          feedback.style.display = 'block';
          contactForm.reset();
        } else {
          throw new Error('Error en el servidor');
        }
      } catch (error) {
        // Respaldo inmediato por WhatsApp si la API aún no está disponible o falla la red
        console.warn('Servidor no disponible, activando enlace directo a WhatsApp:', error);

        const waText = encodeURIComponent(
          `Hola! Soy ${formData.name}. Solicito presupuesto para: ${formData.service} en ${formData.location} (${formData.area} m² aprox). Comentario: ${formData.message}`
        );

        feedback.innerHTML = `
          Solicitud completada. Para respuesta inmediata: 
          <a href="https://wa.me/34642962096?text=${waText}" target="_blank" rel="noopener" style="font-weight: bold; color: #15803d; text-decoration: underline;">
            haz clic aquí para enviarlo por WhatsApp a Fabián
          </a> o 
          <a href="https://wa.me/34606079971?text=${waText}" target="_blank" rel="noopener" style="font-weight: bold; color: #15803d; text-decoration: underline;">
            a Oscar
          </a>.
        `;
        feedback.className = 'form-feedback success';
        feedback.style.display = 'block';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar Solicitud de Presupuesto';
      }
    });
  }
});