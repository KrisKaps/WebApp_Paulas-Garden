

const nameInput = document.getElementById('name-input');
const amountOptions = document.querySelectorAll('input[name="amount"]');
const voucherPreview = document.getElementById('voucher-preview');
const voucherName = document.getElementById('voucher-name');
const voucherAmount = document.getElementById('voucher-amount');

const backgroundContainer = document.getElementById('background-options');
backgroundContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('thumbnail')) {
        document.querySelectorAll('.thumbnail').forEach(o => o.classList.remove('selected'));
        event.target.classList.add('selected');

        const bgUrl = event.target.dataset.bg;
        if (bgUrl && bgUrl.match(/^[a-zA-Z0-9_\-\.\/]+$/)) {
            voucherPreview.style.backgroundImage = `url('${bgUrl}')`;
        } else {
            console.error('Invalid background URL');
        }
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