// main.js - UI interactions and behaviors for Carbon Diff landing page

// Sticky header behavior
const header = document.getElementById('main-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// FAQ Accordion
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    
    header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all items
        accordionItems.forEach(i => i.classList.remove('active'));
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Copy change-log functionality
const copyChangelogBtn = document.getElementById('copy-changelog-btn');

if (copyChangelogBtn) {
    copyChangelogBtn.addEventListener('click', async () => {
        const changelogContent = document.querySelector('.changelog-content pre');
        if (changelogContent) {
            try {
                await navigator.clipboard.writeText(changelogContent.textContent);
                
                // Show success feedback
                const originalText = copyChangelogBtn.textContent;
                copyChangelogBtn.textContent = 'Copied!';
                copyChangelogBtn.style.backgroundColor = 'var(--color-primary)';
                copyChangelogBtn.style.color = 'white';
                
                setTimeout(() => {
                    copyChangelogBtn.textContent = originalText;
                    copyChangelogBtn.style.backgroundColor = '';
                    copyChangelogBtn.style.color = '';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
                alert('Failed to copy to clipboard');
            }
        }
    });
}

// Heatmap demo animation (first render only)
let heatmapAnimated = false;

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !heatmapAnimated) {
            const heatmapRows = entry.target.querySelectorAll('.heatmap-row');
            heatmapRows.forEach((row, index) => {
                row.style.animationDelay = `${index * 0.1}s`;
            });
            heatmapAnimated = true;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const tablePreview = document.querySelector('.table-preview');
if (tablePreview) {
    observer.observe(tablePreview);
}

// Tolerance slider value display
const toleranceSlider = document.getElementById('tolerance-slider');
const valueDisplay = document.querySelector('.value-display');

if (toleranceSlider && valueDisplay) {
    toleranceSlider.addEventListener('input', (e) => {
        valueDisplay.textContent = `${e.target.value}%`;
    });
}

// Demo button handlers (placeholder functionality)
const tryBrowserBtns = document.querySelectorAll('#try-browser-btn, .btn-primary');
const demoBtns = document.querySelectorAll('#demo-btn, .btn-secondary');

tryBrowserBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (btn.textContent.includes('Try')) {
            e.preventDefault();
            console.log('Try in browser clicked - Would launch the actual Carbon Diff tool');
            // In production, this would open the tool interface
            alert('Demo: This would launch the Carbon Diff tool interface where you can upload and compare CSVs.');
        }
    });
});

demoBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (btn.textContent.includes('demo') || btn.textContent.includes('walkthrough')) {
            e.preventDefault();
            console.log('Demo video clicked');
            alert('Demo: This would play a 90-second walkthrough video of Carbon Diff in action.');
        }
    });
});

// Download sample files handler
document.querySelectorAll('.btn').forEach(btn => {
    if (btn.textContent.includes('sample')) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Download samples clicked');
            alert('Demo: This would download sample_A.csv and sample_B.csv for testing.');
        });
    }
});

// Service Worker registration (with toggle)
const enableServiceWorker = false; // Set to true to enable offline caching

if (enableServiceWorker && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// Web Worker demo initialization
let worker = null;

function initWorkerDemo() {
    if (typeof Worker !== 'undefined') {
        try {
            worker = new Worker('js/worker.js');
            
            worker.addEventListener('message', (e) => {
                console.log('Worker message:', e.data);
            });
            
            worker.addEventListener('error', (e) => {
                console.error('Worker error:', e.message);
            });
            
            // Send a test message
            worker.postMessage({ 
                action: 'test', 
                data: 'Carbon Diff worker initialized' 
            });
        } catch (err) {
            console.log('Worker not available:', err);
        }
    }
}

// Initialize worker demo on page load
window.addEventListener('load', () => {
    initWorkerDemo();
});

// Cleanup worker on page unload
window.addEventListener('beforeunload', () => {
    if (worker) {
        worker.terminate();
    }
});

// Fade-in animations for sections as they come into view
const fadeElements = document.querySelectorAll('.feature-tile, .step, .explanation-card');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 50);
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
    fadeObserver.observe(element);
});

// Keyboard navigation enhancements
document.addEventListener('keydown', (e) => {
    // Allow ESC to close modals/dialogs (if any are open)
    if (e.key === 'Escape') {
        accordionItems.forEach(item => item.classList.remove('active'));
    }
});

// Log page view (analytics placeholder)
console.log('Carbon Diff landing page loaded');
console.log('Version: 1.0.0');
console.log('Environment:', window.location.hostname);
