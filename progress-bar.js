function setProgress(percentage) {
    const progressBar = document.querySelector('.pb__fill');
    const container = progressBar.parentElement;
    
    // Ensure percentage is between 0 and 100
    percentage = Math.min(100, Math.max(0, percentage));
  
    progressBar.style.setProperty('--progress-percentage', `${percentage}%`);
    progressBar.style.animation = 'none';
    progressBar.offsetHeight; // Trigger reflow
    progressBar.style.animation = 'fillProgress 1s ease-in-out forwards';
    
    // Update the width
    progressBar.style.width = `${percentage}%`;
    
    // Animate the percentage text
    let start = parseInt(progressBar.textContent) || 0;
    let end = percentage;
    let duration = 1000; // 1 second, matching the CSS animation
    let startTime = null;
    
    function animate(currentTime) {
      if (!startTime) startTime = currentTime;
      let progress = (currentTime - startTime) / duration;
      let currentCount = Math.round(start + (end - start) * progress);
      
      progressBar.textContent = `${currentCount}%`;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        progressBar.textContent = `${end}%`;
      }
    }
    
    requestAnimationFrame(animate);
  
    // Add text outside the progress bar if it's too small
    if (percentage < 10) {
      let textElement = container.querySelector('.progress-text');
      if (!textElement) {
        textElement = document.createElement('div');
        textElement.className = 'progress-text';
        container.appendChild(textElement);
      }
      textElement.textContent = `${percentage}%`;
    } else {
      const textElement = container.querySelector('.progress-text');
      if (textElement) textElement.remove();
    }
  }
  
  // Example usage:
  setProgress(75); // Animates the progress bar to 75%
  