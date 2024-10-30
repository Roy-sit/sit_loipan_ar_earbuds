console.log("IIFE Fired");
// Variables
const hotspots = document.querySelectorAll('.Hotspot'); 

// Toggle hotspot info visibility when clicked
hotspots.forEach(hotspot => {
  hotspot.addEventListener('click', (event) => {
    const annotation = hotspot.querySelector('.HotspotAnnotation');
    
    // Toggle 'active' class to show/hide on click
    annotation.classList.toggle('active');
    
    // Stop the event from bubbling up to document
    event.stopPropagation();
  });
});

// Close hotspot info when clicking outside
document.addEventListener('click', () => {
  hotspots.forEach(hotspot => {
    const annotation = hotspot.querySelector('.HotspotAnnotation');
    if (annotation) {
      annotation.classList.remove('active'); // Hide info when clicking outside
    }
  });
});


// Hotspots data stored in an array
const hotspotsData = [
{ slot: "hotspot-1",
  title: "Aluminum",
  description: "Luxury, copper-plated aluminum, blending lightweight comfort with a warm metallic sheen",
  image:"images/material.png" },

{ slot: "hotspot-2",
  title: "Microphone",
  description: "A high-quality microphone for a clear and immersive audio experience",
  image:"images/mic.png" },

{ slot: "hotspot-3",
  title: "Honeycomb Crystal",
  description: "A touch of elegance and sparkle crystal detail, resembling a masterpiece of jewelry",
  image:"images/crystal.png" },

  { slot: "hotspot-4",
    title: "ChargePoint",
    description: "A fast-charging point, bringing style and efficiency together",
    image:"images/chargepoint.png" },

    { slot: "hotspot-5",
      title: "Silicone Ring",
      description: "A silicone ring on the tip edge, ensuring a comfortable, secure, and fall-proof fit",
      image:"images/silicone.png" },
]