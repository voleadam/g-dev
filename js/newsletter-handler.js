document.addEventListener("DOMContentLoaded", function() {
    // Kifejezetten a hírlevél űrlapot keressük meg az ID-ja alapján
    var newsletterForm = document.getElementById('newsletter-form');

    // Csak akkor fut le a kód, ha a hírlevél űrlap tényleg ott van az oldalon
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();

            // IDE MÁSOLD BE A HÍRLEVÉLHEZ TARTOZÓ WEBHOOK URL-EDET!
            var webhookUrl = "https://n8n.voleadam.hu/webhook-test/e7a02344-2541-48da-a966-b4607377ec18";

            // Megkeressük a küldés gombot (lehet input vagy button is)
            var submitBtn = newsletterForm.querySelector('input[type="submit"], button[type="submit"]');
            var originalBtnText = submitBtn.value || submitBtn.innerText;
            
            if (submitBtn.tagName.toLowerCase() === 'input') {
                submitBtn.value = "Feliratkozás...";
            } else {
                submitBtn.innerText = "Feliratkozás...";
            }

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
            })
            .finally(function() {
                // Visszaállítjuk a gomb feliratát
                if (submitBtn.tagName.toLowerCase() === 'input') {
                    submitBtn.value = originalBtnText;
                } else {
                    submitBtn.innerText = originalBtnText;
                }
            });

        }, true); 
    }
});