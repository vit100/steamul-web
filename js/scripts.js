// Initialize jQuery components when document is ready
$(function() {  // Initialize accordion with modern styling
  $("#accordion").accordion({
    heightStyle: "content",
    collapsible: true,
    animate: {
      easing: 'easeOutQuart',
      duration: 300
    },
    activate: function(event, ui) {
      // When accordion section is opened, scroll to it
      if(ui.newPanel.length) {
        setTimeout(() => {
          const yOffset = -70; // Adjusted for better visibility with new styling
          const y = ui.newPanel[0].getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({top: y, behavior: 'smooth'});
        }, 100);
      }
    }
  });
  
  // Initialize services slides
  $(".services-right .services-slide").removeClass("active");
  $(".services-right .services-slide:first-child").addClass("active");
  
  // Special handling for FAQ tab to ensure proper scrolling
  $("li[data-target='faq']").on('click', function() {
    // Wait for the tab to become active
    setTimeout(() => {
      // Scroll to the FAQ section
      const faqSection = document.querySelector('.services-slide[data-slide="faq"]');
      if (faqSection) {
        const yOffset = -20;
        const y = faqSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({top: y, behavior: 'smooth'});
      }
    }, 150);
  });
});

// Modern way to check if element has class (although this function isn't used anywhere)
function hasClass(element, className) {
  return element.classList.contains(className);
}

// Services navigation tabs functionality
document.addEventListener('DOMContentLoaded', function() {
  const navs = document.querySelectorAll('.services-nav li');
  const tabs = document.querySelectorAll('.services-slide');
  
  navs.forEach(nav => {
    nav.addEventListener('click', function() {
      // Skip if this item contains an external link
      if (this.querySelector('a[target="_blank"]')) {
        return; // Let the browser handle external links normally
      }
      
      // Remove active class from all navs
      navs.forEach(item => item.classList.remove('active'));
      
      // Add active class to clicked nav first for immediate feedback
      this.classList.add('active');
      
      // Fade out current active tab
      const currentActiveTab = document.querySelector('.services-slide.active');
      if (currentActiveTab) {
        currentActiveTab.style.opacity = '0';
      }
        // After fade out, switch tabs and fade in new tab
      setTimeout(() => {
        // Remove active class from all tabs
        let activeTab = null;
        tabs.forEach(tab => {
          tab.classList.remove('active');
          if (tab.dataset.slide === this.dataset.target) {
            tab.classList.add('active');
            activeTab = tab;
            // Start with opacity 0 and translate down
            tab.style.opacity = '0';
            tab.style.transform = 'translateY(10px)';
          }
        });
        
        // Fade in the new active tab
        if (activeTab) {
          setTimeout(() => {
            activeTab.style.opacity = '1';
            activeTab.style.transform = 'translateY(0)';
            
            // Scroll to the active tab content with a small offset for better visibility
            const yOffset = -20; // Adjust this value as needed for better positioning
            const y = activeTab.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({top: y, behavior: 'smooth'});
          }, 50);
        }
      }, 200); // Time to wait for fade out
    });
  });
});


// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', () => {
  const scrollSpeed = 0.2; // Lower value = faster scroll
  
  document.querySelectorAll('[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const hash = this.getAttribute('href');
      // Skip if hash is just "#"
      if (hash === '#') return;
      
      const targetElement = document.querySelector(hash);
      if (!targetElement) return;
      
      const startPosition = window.pageYOffset;
      const targetPosition = targetElement.getBoundingClientRect().top + startPosition;
      let startTime = null;
      
      function animateScroll(currentTime) {
        if (startTime === null) startTime = currentTime;
        
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / (1000 * scrollSpeed), 1);
        
        // Easing function for smoother animation
        const easeInOutQuad = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        
        const distance = targetPosition - startPosition;
        const scrollPosition = startPosition + distance * easeInOutQuad(progress);
        
        window.scrollTo(0, scrollPosition);
        
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          // Update URL hash after scroll completes
          history.pushState(null, null, hash);
        }
      }
      
      requestAnimationFrame(animateScroll);
    });
  });
});

window.onscroll = function()
{
	var pageOffset =document.documentElement.scrollTop || document.body.scrollTop;
    if(pageOffset >= 200)
    {
        document.querySelector('.on-top').style.visibility="visible"
    } else
    {
        document.querySelector('.on-top').style.visibility="hidden";
    }
};

$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
  dots: true, lazyLoad:true, nav: true, navText : [" ", " "], autoplay: true, autoplayTimeout: 4000, loop: true, responsive:{
        0:{
            items:2
        },
        600:{
            items:3
        }
    }
  });
  
  // Check for URL hash for direct navigation to Halotherapy section
  if (window.location.hash === '#halotherapy' || window.location.hash === '#halo') {
    // Activate the FAQ tab
    $('li[data-target="faq"]').click();
    
    // Wait for the tab to become active
    setTimeout(() => {
      // Open the Halotherapy accordion item
      const accordionHeaders = $("#accordion > h3");
      for (let i = 0; i < accordionHeaders.length; i++) {
        if (accordionHeaders[i].textContent.toLowerCase().includes('halo therapy')) {
          $("#accordion").accordion("option", "active", i);
          break;
        }
      }
    }, 300);
  }
});
