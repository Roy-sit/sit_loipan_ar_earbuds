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