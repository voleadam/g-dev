document.addEventListener("DOMContentLoaded", function() {
    var forms = document.querySelectorAll('.w-form form');

    forms.forEach(function(form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();

            // IDE MÁSOLD BE A SAJÁT WEBHOOK URL-EDET!
            var webhookUrl = "https://n8n.voleadam.hu/webhook/a9033e0c-9ead-4685-a9ee-b366a0ab4eee";

            var submitBtn = form.querySelector('input[type="submit"]');
            var originalBtnText = submitBtn.value;
            submitBtn.value = "Küldés folyamatban...";

            var formData = new FormData(form);
            var urlEncodedData = new URLSearchParams(formData).toString();

            fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: urlEncodedData
            })
            .then(function(response) {
                form.style.display = 'none';
                var successMessage = form.parentElement.querySelector('.w-form-done');
                if (successMessage) {
                    successMessage.style.display = 'block';
                }
            })
            .catch(function(error) {
                console.error('Hiba a küldés során:', error);
                var errorMessage = form.parentElement.querySelector('.w-form-fail');
                if (errorMessage) {
                    errorMessage.style.display = 'block';
                }
            })
            .finally(function() {
                submitBtn.value = originalBtnText;
            });

        }, true); 
    });
});