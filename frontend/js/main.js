/* document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdownMenu = document.querySelector('.dropdown-menu');

  if (menuToggle && navLinks) {
    // 1. Abrir / Cerrar menú hamburguesa
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('open');
    });

    // 2. Controlar submenú de Servicios en pantallas táctiles / móviles
    if (dropdownToggle && dropdownMenu) {
      dropdownToggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dropdownMenu.classList.toggle('show');
        }
      });
    }

    // 3. Cerrar el menú automáticamente al hacer clic en cualquier enlace
    const allLinks = navLinks.querySelectorAll('a:not(.dropdown-toggle)');
    allLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navLinks.classList.remove('active');
          menuToggle.classList.remove('open');
          if (dropdownMenu) dropdownMenu.classList.remove('show');
        }
      });
    });

    // 4. Cerrar el menú si el usuario hace clic fuera de la barra de navegación
    document.addEventListener('click', (e) => {
      if (
        navLinks.classList.contains('active') &&
        !navLinks.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('open');
        if (dropdownMenu) dropdownMenu.classList.remove('show');
      }
    });
  }
}); */

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdownItem = document.querySelector('.dropdown-item');

  // Abrir / Cerrar menú hamburguesa principal
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('open');
    });
  }

  // Desplegar / Ocultar submenú de servicios al pulsar en móvil
  if (dropdownToggle && dropdownItem) {
    dropdownToggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        dropdownItem.classList.toggle('open');
      }
    });
  }

  // Cerrar menús al hacer clic en cualquier enlace final
  document.querySelectorAll('.dropdown-menu a, .nav-list > li > a:not(.dropdown-toggle)').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('open');
        if (dropdownItem) dropdownItem.classList.remove('open');
      }
    });
  });

  // Cerrar al pulsar fuera del menú
  document.addEventListener('click', (e) => {
    if (navLinks && navLinks.classList.contains('active') && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('open');
      if (dropdownItem) dropdownItem.classList.remove('open');
    }
  });
});