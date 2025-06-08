const nameInput = document.getElementById('name-input');
const amountOptions = document.querySelectorAll('input[name="amount"]');
const voucherPreview = document.getElementById('voucher-preview');
const voucherName = document.getElementById('voucher-name');
const voucherAmount = document.getElementById('voucher-amount');

const backgroundContainer = document.getElementById('background-options');
backgroundContainer.addEventListener('click', (event) => {
    // Finde das geklickte .background-option Element
    let option = event.target.closest('.background-option');
    if (!option) return;

    // Alle anderen deselektieren
    document.querySelectorAll('.background-option').forEach(o => o.classList.remove('selected'));
    option.classList.add('selected');

    // Hintergrundbild setzen
    const img = option.querySelector('.thumbnail');
    const bgUrl = img?.dataset.bg;
    if (bgUrl && bgUrl.match(/^[a-zA-Z0-9_\-\.\/]+$/)) {
        voucherPreview.style.backgroundImage = `url('${bgUrl}')`;
    } else {
        console.error('Invalid background URL');
    }
});

const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
};

const updateName = () => {
    const name = nameInput.value || '[Name]';
    voucherName.textContent = name;
};

nameInput.addEventListener('input', debounce(updateName, 300));

amountOptions.forEach(option => {
    option.addEventListener('change', () => {
        voucherAmount.textContent = `${option.value} €`;
    });
});

// --- Ergänzung für Wunschbetrag ---
const customRadio = document.getElementById('custom-amount-radio');
const customInput = document.getElementById('custom-amount-input');

// Funktion zur Aktualisierung des Betrags auf dem Gutschein
function updateVoucherAmount() {
    if (customRadio.checked) {
        const val = customInput.value.replace('.', ',');
        voucherAmount.textContent = val ? `${val} €` : ' €';
    } else {
        // Finde das aktuell ausgewählte Radio (außer custom)
        const checked = Array.from(amountOptions).find(opt => opt.checked && opt !== customRadio);
        if (checked) {
            voucherAmount.textContent = `${checked.value} €`;
        }
    }
}

// Radio-Buttons: Wunschbetrag-Input aktivieren/deaktivieren
amountOptions.forEach(option => {
    option.addEventListener('change', () => {
        if (customRadio.checked) {
            customInput.disabled = false;
            customInput.focus();
        } else {
            customInput.disabled = true;
            customInput.value = '';
        }
        updateVoucherAmount();
    });
});

// Wunschbetrag-Input: Wert live auf Gutschein anzeigen
customInput.addEventListener('input', updateVoucherAmount);

// Initialer Zustand
if (customRadio && customInput) {
    if (!customRadio.checked) {
        customInput.disabled = true;
    }
    updateVoucherAmount();
}