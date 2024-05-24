      // Counter variable to track scroll events
      let scrollCount = 0;
      let decreaseCount = 10;
      let lastScrollTop = 0;

      // Function to move lines
      function moveLines() {
          const increment = scrollCount * 2; // Increase the movement based on scrollCount
          document.querySelector('.line').style.bottom = `${65 + increment}%`; // Adjust bottom position of the first line
          document.querySelector('.line.second').style.top = `${65 + increment}%`; // Adjust top position of the second line
      }

      // Function to adjust image dimensions
      function adjustImageDimensions() {
          const images = document.querySelectorAll('.line img');
          images.forEach(img => {
              img.style.width = `${120 + scrollCount * 6}px`; // Increase width
              img.style.height = `${120 - scrollCount * 3}px`; // Decrease height
          });
      }

      // Function to reveal hidden content after multiple scroll events
      function revealContent() {
          scrollCount++;
          decreaseCount--;
          if (scrollCount === 9) { // Change the number to adjust how many scrolls are needed
              const welcomeSection = document.getElementById('welcome');
              const welcomePosition = welcomeSection.getBoundingClientRect().top;
              const screenPosition = window.innerHeight / 0.5 + window.scrollY; // Adjust as needed

              if (welcomePosition < screenPosition) {
                  welcomeSection.classList.add('revealed');
              }
          }
      }

      // Function to reverse reveal hidden content after multiple scroll events
      function reverseRevealContent() {
          scrollCount--;
          decreaseCount++;
          if (scrollCount < 9) { // Change the number to adjust how many scrolls are needed
              const welcomeSection = document.getElementById('welcome');
              const welcomePosition = welcomeSection.getBoundingClientRect().top;
              const screenPosition = window.innerHeight / 1.5 + window.scrollY; // Adjust as needed

              if (welcomePosition < screenPosition) {
                  welcomeSection.classList.remove('revealed');
              }
          }
      }

      // Function to reverse move lines
      function reverseMoveLines() {
          const increment = decreaseCount * 2; // Increase the movement based on scrollCount
          document.querySelector('.line').style.bottom = `${68 - increment}%`; // Adjust bottom position of the first line
          document.querySelector('.line.second').style.top = `${68 - increment}%`; // Adjust top position of the second line
      }

      // Function to handle scroll events for both mouse and touch
      function handleScroll(deltaY) {
          if (deltaY > 0 && scrollCount < 9) { // Check if scrolling down and scrollCount is less than 3
              moveLines();
              revealContent();
              adjustImageDimensions();
          } else if (deltaY < 0 && scrollCount > 0) { // Check if scrolling up
              reverseMoveLines();
              reverseRevealContent();
              adjustImageDimensions();
          }
      }

      // Add event listeners for mouse wheel
      window.addEventListener('wheel', (event) => {
          handleScroll(event.deltaY);
      });

      // Variables to track touch positions
      let touchStartY = 0;
      let touchEndY = 0;

      // Function to handle touch start
      function handleTouchStart(event) {
          touchStartY = event.touches[0].clientY;
      }

      // Function to handle touch move
      function handleTouchMove(event) {
          touchEndY = event.touches[0].clientY;
          let deltaY = touchStartY - touchEndY;
          handleScroll(deltaY);
          touchStartY = touchEndY; // Update touchStartY to the new position for continuous scrolling
      }

      // Add event listeners for touch events
      window.addEventListener('touchstart', handleTouchStart);
      window.addEventListener('touchmove', handleTouchMove);

      // Script to personalize the invitation
      window.addEventListener('load', () => {
          const urlParams = new URLSearchParams(window.location.search);
          const name = urlParams.get('name');
          if (name) {
              document.getElementById('welcome').querySelector('h1').textContent = `Welcome, Dr. ${name}!`;
          }
      });
