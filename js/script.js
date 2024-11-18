document.addEventListener("DOMContentLoaded", () => {
  // Play Button
  const heroVideo = document.querySelector("#hero-video");
  const playButton = document.querySelector(".play-button");
  heroVideo.addEventListener("loadeddata", () => {
    playButton.style.display = "flex";
  });
  playButton.addEventListener("click", () => {
    heroVideo.play();
    playButton.style.display = "none"; // Hide the button after play
  });

  // Promotional Images Hover Effect
  gsap.utils.toArray("#promo_image img").forEach((img) => {
    img.addEventListener("mouseenter", () => {
      gsap.to(img, {
        scale: 1.05,
        opacity: 0.9,
        duration: 0.6,
        ease: "power3.out",
      });
    });
    img.addEventListener("mouseleave", () => {
      gsap.to(img, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      });
    });
  });

  // Earbuds Scroll Animation
  (() => {
    const canvas = document.querySelector("#earbuds_frame");
    const context = canvas.getContext("2d");
    canvas.width = 1920;
    canvas.height = 1080;

    const frameCount = 400;
    const images = [];
    const buds = { frame: 0 };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = `images/earbuds_frame/earframe_${(i + 1).toString().padStart(4, "0")}.png`;
      images.push(img);
    }

    images[0].addEventListener("load", render);
    gsap.to(buds, {
      frame: frameCount - 1,
      snap: "frame",
      scrollTrigger: {
        trigger: "#earbuds_frame",
        pin: true,
        scrub: 1,
        start: "-150 top",
        end: "700 bottom",
      },
      onUpdate: render,
    });

    function render() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(images[buds.frame], 0, 0);
    }
  })();

  // Lightbox
  document.querySelectorAll(".promo-image img").forEach((img) => {
    img.addEventListener("click", () => openLightbox(img.src));
  });
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  lightbox.addEventListener("click", closeLightbox);

  function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.style.display = "flex";
  }

  function closeLightbox() {
    lightbox.style.display = "none";
  }

  // Zoom Effect on Promo-3
  const promoImage = document.querySelector("#promo-3");
  const img = promoImage.querySelector("img");
  promoImage.addEventListener("mouseenter", () => {
    gsap.to(img, { scale: 1.1, duration: 0.3, ease: "power3.out" });
  });
  promoImage.addEventListener("mousemove", (e) => {
    const rect = promoImage.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    const maxMove = 40;
    gsap.to(img, {
      x: x * maxMove,
      y: y * maxMove,
      duration: 0.3,
      ease: "power3.out",
    });
  });
  promoImage.addEventListener("mouseleave", () => {
    gsap.to(img, { scale: 1, x: 0, y: 0, duration: 0.3, ease: "power3.out" });
  });

  // Hotspots and Annotations
  const hotspots = document.querySelectorAll(".Hotspot");
  hotspots.forEach((hotspot) => {
    const annotation = hotspot.querySelector(".HotspotAnnotation");
    hotspot.addEventListener("click", (event) => {
      annotation.classList.toggle("active");
      event.stopPropagation();
    });
  });

  document.addEventListener("click", () => {
    hotspots.forEach((hotspot) => {
      const annotation = hotspot.querySelector(".HotspotAnnotation");
      annotation.classList.remove("active");
    });
  });

  // Divisor Slider
  const divisor = document.querySelector("#divisor");
  const slider = document.querySelector("#slider");
  slider.addEventListener("input", () => {
    divisor.style.width = `${slider.value}%`;
  });

  // ScrollTrigger Animations
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray(".full-width-grid-con").forEach((section) => {
    gsap.from(section, {
      opacity: 0,
      y: 50,
      duration: 0.5,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  });

  gsap.utils.toArray("#mobile-tablet-view, #xray, #promo_image").forEach((image) => {
    gsap.from(image, {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      scrollTrigger: {
        trigger: image,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  });


  
  // Hotspots Data
  const hotspotsData = [
    {
      slot: "hotspot-1",
      title: "Aluminum",
      description: "Luxury, copper-plated aluminum, blending lightweight comfort with a warm metallic sheen",
      image: "images/material.png",
    },
    {
      slot: "hotspot-2",
      title: "Microphone",
      description: "A high-quality microphone for a clear and immersive audio experience",
      image: "images/mic.png",
    },
    {
      slot: "hotspot-3",
      title: "Honeycomb Crystal",
      description: "A touch of elegance and sparkle crystal detail, resembling a masterpiece of jewelry",
      image: "images/crystal.png",
    },
    {
      slot: "hotspot-4",
      title: "ChargePoint",
      description: "A fast-charging point, bringing style and efficiency together",
      image: "images/chargepoint.png",
    },
    {
      slot: "hotspot-5",
      title: "Silicone Ring",
      description: "A silicone ring on the tip edge, ensuring a comfortable, secure, and fall-proof fit",
      image: "images/silicone.png",
    },
  ];

  hotspots.forEach((hotspot) => {
    const slot = hotspot.getAttribute("slot");
    const data = hotspotsData.find((data) => data.slot === slot);
    if (data) {
      const img = hotspot.querySelector("img");
      img.src = data.image;
      img.alt = data.title;

      const title = hotspot.querySelector(".HotspotAnnotation span:not(.p)");
      const description = hotspot.querySelector(".HotspotAnnotation .p");
      title.textContent = data.title;
      description.textContent = data.description;
    }
  });
});