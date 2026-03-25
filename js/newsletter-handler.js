document.addEventListener("DOMContentLoaded", function() {
    var newsletterForm = document.getElementById('email-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();

            // Hírlevél webhook URL
            var webhookUrl = "https://n8n.voleadam.hu/webhook/e7a02344-2541-48da-a966-b4607377ec18";

            var formData = new FormData(newsletterForm);
            var urlEncodedData = new URLSearchParams(formData).toString();

            fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: urlEncodedData
            })
            .then(function(response) {
                newsletterForm.style.display = 'none';
                var successMessage = newsletterForm.parentElement.querySelector('.w-form-done');
                if (successMessage) {
                    successMessage.style.display = 'block';
                }
            })
            .catch(function(error) {
                console.error('Hiba a feliratkozás során:', error);
                var errorMessage = newsletterForm.parentElement.querySelector('.w-form-fail');
                if (errorMessage) {
                    errorMessage.style.display = 'block';
                }
            });

        }, true); 
    }
});