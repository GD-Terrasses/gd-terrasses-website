document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);

    // Show loading message
    document.querySelector('.loading').style.display = 'block';
    document.querySelector('.error-message').style.display = 'none';
    document.querySelector('.sent-message').style.display = 'none';

    fetch(form.action, {
        method: form.method,
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Hide loading message
        document.querySelector('.loading').style.display = 'none';

        if (data.success) {
            // Show success message
            document.querySelector('.sent-message').style.display = 'block';
            form.reset();
        } else {
            // Show error message
            document.querySelector('.error-message').style.display = 'block';
            document.querySelector('.error-message').innerText = data.message || 'An error occurred while submitting the form.';
        }
    })
    .catch(error => {
        // Hide loading message
        document.querySelector('.loading').style.display = 'none';

        // Show error message
        document.querySelector('.error-message').style.display = 'block';
        document.querySelector('.error-message').innerText = error.message || 'An error occurred while submitting the form.';
    });
});
// JavaScript Document