
// Play button
document.querySelector('#hero-video').addEventListener('loadeddata', function() {
    const playButton = document.querySelector('.play-button');
    playButton.style.display = 'flex';
});

document.querySelector('.play-button').addEventListener('click', function() {
    const heroVideo = document.querySelector('#hero-video');
    heroVideo.play();
    this.style.display = 'none'; // Hide the button after play
});


// Effect to the promotional images
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


// Earbuds scroll annimation
(() => {
  const canvas = document.querySelector("#earbuds_frame");
  const context = canvas.getContext("2d");

  // Canvas size
  canvas.width = 1920;
  canvas.height = 1080;
  const frameCount = 400;
  const images = [];
  const buds = { frame: 0 };

  // Image array with frames
  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = `images/earbuds_frame/earframe_${(i + 1).toString().padStart(4, "0")}.png`;
    images.push(img);
  }

  console.log(images);
  gsap.to(buds, {
    frame: 399,  
    snap: "frame",  
    scrollTrigger: {
      trigger: "#earbuds_frame",
      pin: true,
      scrub: 1,
      markers: false,
      start: "-150 top",
      end: "700 bottom", 
    },
    onUpdate: render,  
  });

  // Event listener for when images are loaded
  images[0].addEventListener("load", render);

  function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);  
    console.log(images[buds.frame]); 
    context.drawImage(images[buds.frame], 0, 0); 
  }
})();




// Lightbox
function openLightbox(src) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  lightboxImg.src = src;
  lightbox.style.display = "flex";  // Show the lightbox
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.style.display = "none";  // Hide the lightbox
}



// Zoom effect for promo-3 image
const promoImage = document.querySelector("#promo-3");
const img = promoImage.querySelector("img");

promoImage.addEventListener("mouseenter", () => {
  // Zoom the image
  gsap.to(img, {
    scale: 1.1, 
    duration: 0.3,
    ease: "power3.out",
  });
});

promoImage.addEventListener("mousemove", (e) => {
  const rect = promoImage.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // Horizontal movement
  const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // Vertical movement

  // Move the image based on mouse position
  const maxMove = 40; // How far the image can move
  gsap.to(img, {
    x: x * maxMove,
    y: y * maxMove,
    duration: 0.3,
    ease: "power3.out",
  });
});

promoImage.addEventListener("mouseleave", () => {
  // Reset the image scale and position
  gsap.to(img, {
    scale: 1,
    x: 0,
    y: 0,
    duration: 0.3,
    ease: "power3.out",
  });
});




console.log("IIFE Fired");
// Variables
const hotspots = document.querySelectorAll('.Hotspot'); 

// Toggle hotspot info visibility when clicked
hotspots.forEach(hotspot => {
  hotspot.addEventListener('click', (event) => {
    const annotation = hotspot.querySelector('.HotspotAnnotation');
    
    // Toggle 'active' class to show/hide on click
    annotation.classList.toggle('active');
    
    // Stop the event from bubbling up
    event.stopPropagation();
  });
});




// Earbuds annotation
// Close hotspot info when clicking outside
document.addEventListener('click', () => {
  hotspots.forEach(hotspot => {
    const annotation = hotspot.querySelector('.HotspotAnnotation');
    if (annotation) {
      annotation.classList.remove('active'); // Hide info when clicking outside
    }
  });
});


(() => {
  const divisor = document.querySelector("#divisor");
  const slider = document.querySelector("#slider");

function moveDivisor() {
  console.log(slider.value);
  divisor.style.width = slider.value+"%";
}

  slider.addEventListener("input", moveDivisor);
})();


// ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Fade-in effect
gsap.utils.toArray(".full-width-grid-con").forEach((section) => {
    gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
        }
    });
});

// Scale effect for particular sections
gsap.utils.toArray("#mobile-tablet-view, #xray, #promo_image").forEach((image) => {
    gsap.from(image, {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        scrollTrigger: {
            trigger: image,
            start: "top 80%",
            toggleActions: "play none none reverse",
        }
    });
});




// Hotspot data Arrays
(() => {
  const hotspotsData = [
    { 
      slot: "hotspot-1",
      title: "Aluminum",
      description: "Luxury, copper-plated aluminum, blending lightweight comfort with a warm metallic sheen",
      image: "images/material.png"
    },
    { 
      slot: "hotspot-2",
      title: "Microphone",
      description: "A high-quality microphone for a clear and immersive audio experience",
      image: "images/mic.png"
    },
    { 
      slot: "hotspot-3",
      title: "Honeycomb Crystal",
      description: "A touch of elegance and sparkle crystal detail, resembling a masterpiece of jewelry",
      image: "images/crystal.png"
    },
    { 
      slot: "hotspot-4",
      title: "ChargePoint",
      description: "A fast-charging point, bringing style and efficiency together",
      image: "images/chargepoint.png"
    },
    { 
      slot: "hotspot-5",
      title: "Silicone Ring",
      description: "A silicone ring on the tip edge, ensuring a comfortable, secure, and fall-proof fit",
      image: "images/silicone.png"
    }
  ];

  function loadHotspotsInfo() {
    hotspotsData.forEach((hotspotData) => {
      const hotspotElement = document.querySelector(`[slot="${hotspotData.slot}"]`);
      
      if (hotspotElement) {
      
        const titleElement = document.createElement("h2");
        titleElement.textContent = hotspotData.title;
        
        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = hotspotData.description;
        
        const imageElement = document.createElement("img");
        imageElement.src = hotspotData.image;
        imageElement.alt = hotspotData.title;

        // Add elements to annotation div
        annotationDiv.appendChild(imageElement);
        annotationDiv.appendChild(titleElement);
        annotationDiv.appendChild(descriptionElement);

        // Addthe annotation div to the hotspot element
        hotspotElement.appendChild(annotationDiv);

        // Add click event listener to toggle visibility
        hotspotElement.addEventListener("click", () => {
          hotspotElement.classList.toggle("active");
        });
      } else {
        console.warn(`Hotspot element with slot="${hotspotData.slot}" not found.`);
      }
    });
  }

  // Call the function to load information into hotspots
  loadHotspotsInfo();
})();