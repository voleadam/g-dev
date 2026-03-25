document.addEventListener("DOMContentLoaded", function() {
    // Csak a normál űrlapot keressük az ID-ja alapján!
    var contactForm = document.getElementById('wf-form-Form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();

            // Kapcsolati űrlap webhook URL
            var webhookUrl = "https://n8n.voleadam.hu/webhook/a9033e0c-9ead-4685-a9ee-b366a0ab4eee";

            var submitBtn = contactForm.querySelector('input[type="submit"]');
            var originalBtnText = submitBtn.value;
            submitBtn.value = "Küldés folyamatban...";

            var formData = new FormData(contactForm);
            var urlEncodedData = new URLSearchParams(formData).toString();

            fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: urlEncodedData
            })
            .then(function(response) {
                contactForm.style.display = 'none';
                var successMessage = contactForm.parentElement.querySelector('.w-form-done');
                if (successMessage) {
                    successMessage.style.display = 'block';
                }
            })
            .catch(function(error) {
                console.error('Hiba a küldés során:', error);
                var errorMessage = contactForm.parentElement.querySelector('.w-form-fail');
                if (errorMessage) {
                    errorMessage.style.display = 'block';
                }
            })
            .finally(function() {
                submitBtn.value = originalBtnText;
            });

        }, true); 
    }
});