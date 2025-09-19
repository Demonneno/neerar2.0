// static/js/script.js

// Fingerprint.com Initialize the agent on page load.
// const fpPromise = import('https://fpjscdn.net/v3/C0GsAkuTEGJdd9O37c1J')
//   .then(FingerprintJS => FingerprintJS.load())

// Get the visitorId when you need it.
// fpPromise
//   .then(fp => fp.get())
//   .then(result => {
//     const visitorId = result.visitorId
//     console.log(visitorId)
//   })


document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  // Toggle hamburger menu
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Handle link clicks
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
      // Remove active class from all links
      document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
      // Add active class to clicked link
      this.classList.add('active');
      // Hide the dropdown menu
      navLinks.classList.remove('active');
      // Smooth scroll to section
      e.preventDefault(); // Prevent default anchor behavior
      const targetId = this.getAttribute('href').substring(1); // Get section id
      document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Update active class based on scroll position
  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 100) {
        currentSection = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  window.addEventListener('load', updateActiveLink); // Initial load

  // Pyodide CLI functionality (unchanged)
  async function runPython() {
    let pyodide = await loadPyodide();
    let output = document.getElementById('output');
    let code = document.getElementById('python-code').value;
    try {
      output.textContent = 'Running...';
      let result = await pyodide.runPythonAsync(code);
      output.textContent = result || 'Execution completed without output.';
    } catch (err) {
      output.textContent = `Error: ${err}`;
    }
  }
});
