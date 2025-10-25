document.addEventListener("DOMContentLoaded", function () {
  // Logic for interactive services
  const serviceCards = document.querySelectorAll("[data-target]");
  const allDetails = document.querySelectorAll(".service-detail");
  serviceCards.forEach((card) => {
    card.addEventListener("click", () => {
      const targetDetail = document.querySelector(card.dataset.target);
      const isOpening = !targetDetail.style.maxHeight;
      allDetails.forEach((d) => (d.style.maxHeight = null));
      if (isOpening) {
        targetDetail.style.maxHeight = targetDetail.scrollHeight + "px";
        setTimeout(
          () =>
            targetDetail.scrollIntoView({
              behavior: "smooth",
              block: "center",
            }),
          300
        );
      }
    });
  });

  // ===== CODE TO OPEN THE CHATBOT =====
  // Wait for the widget to be fully loaded
  let chatWidgetReady = false;

  const checkWidget = setInterval(() => {
    if (window.ChatWidget && window.ChatWidget.open) {
      chatWidgetReady = true;
      clearInterval(checkWidget);
      console.log("Chat widget ready");
    }
  }, 100);

  // Add the click event to all chat links
  document.addEventListener("click", function (e) {
    // Check if the clicked element or its parent has the class open-bot2-chat
    const chatLink = e.target.closest(".open-bot2-chat");
    if (chatLink) {
      e.preventDefault();

      // Try to open the chat immediately if it is ready
      if (chatWidgetReady && window.ChatWidget && window.ChatWidget.open) {
        window.ChatWidget.open();
      } else {
        // If not ready, simulate a click on the widget button
        setTimeout(() => {
          const widgetButton = document.querySelector(
            '[class*="chat-widget"], [onclick*="ChatWidget"], button[class*="widget"]'
          );
          if (widgetButton) {
            widgetButton.click();
          } else if (window.ChatWidget && window.ChatWidget.open) {
            window.ChatWidget.open();
          } else {
            alert("The chat is loading, please try again in a moment.");
          }
        }, 500);
      }
    }
  });
});

window.ChatWidgetConfig = {
  webhook: {
    url: "https://n8n-n8n.rqatzf.easypanel.host/webhook/f406671e-c954-4691-b39a-66c90aa2f103",
    route: "general",
  },
  branding: {
    logo: "https://assets.zyrosite.com/YX4aRoxMEBhrGMJn/tr-A1aBZnoeLRIj5rOj.svg",
    name: "TrackingDataX",
    welcomeText:
      "Hola 👋 soy el asistente técnico de TrackingDataX. ¿En qué puedo ayudarte?",
    responseTimeText: "Respondemos enseguida 🚀",
  },
  style: {
    primaryColor: "#0B5FFF",
    secondaryColor: "#0041C2",
    position: "left",
    backgroundColor: "#ffffff",
    fontColor: "#333333",
  },
};

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById("scroll-progress").style.width = scrollPercent + "%";
});

const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];
const numParticles = 40;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = document.getElementById("hero").offsetHeight;
}

window.addEventListener("resize", resize);
resize();

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 2 + 1;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(34,211,238,0.5)";
    ctx.fill();
  }
}

function init() {
  particles = [];
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.move();
    p.draw();
  });
  requestAnimationFrame(animate);
}

init();
animate();
