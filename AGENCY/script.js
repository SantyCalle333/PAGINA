// Importación de Lucide Icons
import lucide from "lucide"

// Inicialización de Lucide Icons
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar iconos de Lucide
  if (typeof lucide !== "undefined") {
    lucide.createIcons()
  }

  // Navegación móvil
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const nav = document.getElementById("nav")

  if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener("click", () => {
      nav.classList.toggle("mobile-nav-open")
    })

    // Cerrar menú al hacer clic en un enlace
    const navLinks = nav.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("mobile-nav-open")
      })
    })

    // Cerrar menú al hacer clic fuera
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        nav.classList.remove("mobile-nav-open")
      }
    })
  }

  // Smooth scroll para enlaces internos
  const internalLinks = document.querySelectorAll('a[href^="#"]')
  internalLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetSection.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Formulario CTA (página principal)
  const ctaButton = document.getElementById("ctaButton")
  const emailInput = document.getElementById("emailInput")

  if (ctaButton && emailInput) {
    ctaButton.addEventListener("click", handleCTASubmission)
    emailInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        handleCTASubmission()
      }
    })
  }

  // Formulario de contacto
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactFormSubmission)
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item")
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")
    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active")

      // Cerrar todos los FAQs
      faqItems.forEach((faq) => faq.classList.remove("active"))

      // Abrir el clickeado si no estaba activo
      if (!isActive) {
        item.classList.add("active")
      }
    })
  })

  // Animaciones al hacer scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up")
      }
    })
  }, observerOptions)

  // Observar elementos para animaciones
  const animatedElements = document.querySelectorAll(
    ".service-card, .case-card, .team-member, .mvv-card, .stat-card, .process-step, .reason-item",
  )
  animatedElements.forEach((el) => observer.observe(el))

  // Header scroll effect
  let lastScrollTop = 0
  const header = document.querySelector(".header")

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      header.style.transform = "translateY(-100%)"
    } else {
      // Scrolling up
      header.style.transform = "translateY(0)"
    }

    lastScrollTop = scrollTop
  })

  // Contador animado para estadísticas
  function animateCounters() {
    const counters = document.querySelectorAll(".stat-number, .story-stat .stat-number")

    counters.forEach((counter) => {
      const text = counter.textContent
      const target = Number.parseInt(text.replace(/[^\d]/g, ""))

      if (target && target > 0) {
        const increment = target / 100
        let current = 0
        const suffix = text.replace(/[\d]/g, "")

        const timer = setInterval(() => {
          current += increment
          if (current >= target) {
            counter.textContent = target + suffix
            clearInterval(timer)
          } else {
            counter.textContent = Math.floor(current) + suffix
          }
        }, 20)
      }
    })
  }

  // Activar contadores cuando sean visibles
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters()
          statsObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  const statsSection = document.querySelector(".hero-stats, .success-stats, .our-story")
  if (statsSection) {
    statsObserver.observe(statsSection)
  }

  // Lazy loading para imágenes
  const images = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        img.classList.add("loaded")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => {
    img.classList.add("lazy")
    imageObserver.observe(img)
  })

  // Manejo de errores de imágenes
  const allImages = document.querySelectorAll("img")
  allImages.forEach((img) => {
    img.addEventListener("error", function () {
      this.src = "https://via.placeholder.com/400x300/e5e7eb/9ca3af?text=Imagen+no+disponible"
    })
  })

  // Preload de recursos críticos
  const fontLink = document.createElement("link")
  fontLink.rel = "preload"
  fontLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
  fontLink.as = "style"
  document.head.appendChild(fontLink)
})

// Función para manejar envío del CTA
function handleCTASubmission() {
  const emailInput = document.getElementById("emailInput")
  const ctaButton = document.getElementById("ctaButton")

  if (!emailInput || !ctaButton) return

  const email = emailInput.value.trim()

  if (email === "") {
    showNotification("Por favor, ingresa tu email empresarial", "error")
    emailInput.focus()
    return
  }

  if (!isValidEmail(email)) {
    showNotification("Por favor, ingresa un email válido", "error")
    emailInput.focus()
    return
  }

  // Simular envío del formulario
  ctaButton.textContent = "Enviando..."
  ctaButton.disabled = true
  ctaButton.classList.add("loading")

  setTimeout(() => {
    showNotification("¡Gracias! Te contactaremos en las próximas 24 horas.", "success")
    emailInput.value = ""
    ctaButton.textContent = "Consulta Gratis"
    ctaButton.disabled = false
    ctaButton.classList.remove("loading")
  }, 2000)
}

// Función para manejar envío del formulario de contacto
function handleContactFormSubmission(e) {
  e.preventDefault()

  const form = e.target
  const formData = new FormData(form)
  const submitButton = form.querySelector(".form-submit")

  // Validaciones básicas
  const requiredFields = form.querySelectorAll("[required]")
  let isValid = true

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      isValid = false
      field.style.borderColor = "#ef4444"
    } else {
      field.style.borderColor = "#d1d5db"
    }
  })

  if (!isValid) {
    showNotification("Por favor, completa todos los campos requeridos", "error")
    return
  }

  // Validar email
  const email = formData.get("email")
  if (!isValidEmail(email)) {
    showNotification("Por favor, ingresa un email válido", "error")
    return
  }

  // Simular envío
  submitButton.textContent = "Enviando..."
  submitButton.disabled = true
  submitButton.classList.add("loading")

  setTimeout(() => {
    showNotification("¡Formulario enviado exitosamente! Te contactaremos pronto.", "success")
    form.reset()
    submitButton.textContent = "Solicitar Consultoría Gratuita"
    submitButton.disabled = false
    submitButton.classList.remove("loading")
  }, 2000)
}

// Función para validar email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Función para mostrar notificaciones
function showNotification(message, type = "success") {
  // Remover notificación existente
  const existingNotification = document.querySelector(".notification")
  if (existingNotification) {
    existingNotification.remove()
  }

  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.textContent = message

  document.body.appendChild(notification)

  // Mostrar notificación
  setTimeout(() => {
    notification.classList.add("show")
  }, 100)

  // Ocultar notificación
  setTimeout(() => {
    notification.classList.remove("show")
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }, 5000)
}

// Función para manejar navegación activa
function setActiveNavigation() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html"
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    link.classList.remove("active")
    const linkPage = link.getAttribute("href")
    if (linkPage === currentPage || (currentPage === "" && linkPage === "index.html")) {
      link.classList.add("active")
    }
  })
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", setActiveNavigation)

// Función para scroll suave a secciones
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    const headerHeight = document.querySelector(".header").offsetHeight
    const targetPosition = section.offsetTop - headerHeight

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    })
  }
}

// Manejo de performance
document.addEventListener("DOMContentLoaded", () => {
  // Optimizar imágenes con loading lazy nativo
  const images = document.querySelectorAll("img")
  images.forEach((img) => {
    if (!img.hasAttribute("loading")) {
      img.setAttribute("loading", "lazy")
    }
  })

  // Precargar páginas importantes al hacer hover
  const importantLinks = document.querySelectorAll('a[href$=".html"]')
  importantLinks.forEach((link) => {
    link.addEventListener(
      "mouseenter",
      () => {
        const linkElement = document.createElement("link")
        linkElement.rel = "prefetch"
        linkElement.href = link.href
        document.head.appendChild(linkElement)
      },
      { once: true },
    )
  })
})

// Manejo de errores globales
window.addEventListener("error", (e) => {
  console.error("Error capturado:", e.error)
  // En producción, aquí enviarías el error a un servicio de logging
})

// Service Worker para cache (opcional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registrado: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW falló: ", registrationError)
      })
  })
}
