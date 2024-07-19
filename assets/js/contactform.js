document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Check honeypot field
    if (formData.get('honeypot')) {
        console.log('Spam detected, form submission aborted.');
        return;
    }

    // Show loading message
    document.querySelector('.loading').style.display = 'block';
    document.querySelector('.error-message').style.display = 'none';
    document.querySelector('.sent-message').style.display = 'none';

    fetch(form.action, {
        method: form.method,
        body: formData,
        mode: 'cors'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        document.querySelector('.loading').style.display = 'none';

        if (data.success) {
            document.querySelector('.sent-message').style.display = 'block';
            form.reset();
        } else {
            document.querySelector('.error-message').style.display = 'block';
            document.querySelector('.error-message').innerText = data.message || 'An error occurred while submitting the form.';
        }
    })
    .catch(error => {
        document.querySelector('.loading').style.display = 'none';
        document.querySelector('.error-message').style.display = 'block';
        document.querySelector('.error-message').innerText = `Error: ${error.message}`;
        console.error('There was an error!', error);
    });
});
