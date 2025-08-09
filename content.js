console.log('Content script loaded');

function showCountdown() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'countdown-overlay';
    
    // Create counter
    const counter = document.createElement('div');
    counter.className = 'countdown-number';
    overlay.appendChild(counter);
    
    // Add to page
    document.body.appendChild(overlay);
    
    // Initialize counter
    let count = 1;
    counter.textContent = count;
    
    // Start countdown
    const timer = setInterval(() => {
        count++;
        counter.textContent = count;
        
        if (count >= 10) {
            clearInterval(timer);
            overlay.remove();
        }
    }, 1000);
    
    // Handle interactions
    function resetCount() {
        count = 1;
        counter.textContent = count;
    }
    
    overlay.addEventListener('click', resetCount);
    document.addEventListener('keydown', resetCount);
    document.addEventListener('touchstart', resetCount);
    
    // Prevent closing
    function preventClose(e) {
        if (count < 10) {
            e.preventDefault();
            e.returnValue = '';
            return '';
        }
    }
    
    window.addEventListener('beforeunload', preventClose);
}

// Listen for search form submission
document.addEventListener('submit', function(e) {
    if (e.target.matches('form')) {
        console.log('Form submitted');
        e.preventDefault();
        showCountdown();
        setTimeout(() => {
            e.target.submit();
        }, 10000);
    }
});
