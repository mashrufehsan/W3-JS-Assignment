document.addEventListener('DOMContentLoaded', function() {
    let navItems = Array.from(document.querySelectorAll('.navbar .nav-item'));
    let modals = document.querySelectorAll('.modal');

    function applyStylesAndShowModal(element, modalIndex) {
        navItems.forEach(item => {
            item.classList.remove('active-navbar');
        });

        modals.forEach(modal => {
            modal.classList.remove('show');
        });

        element.classList.add('active-navbar');
        modals[modalIndex].classList.add('show');
    }

    navItems.forEach((item, index) => {
        item.addEventListener('click', function(event) {
            // Check if the clicked target is part of the nav-item or its children
            if (event.target.closest('.nav-item')) {
                applyStylesAndShowModal(this, index);
            }
        });
    });

    // Close All Modal
    function closeAllModal(){
        modals.forEach(modal => {
            modal.classList.remove('show');
        });

        navItems.forEach(item => {
            item.classList.remove('active-navbar');
        });
    }

    // Close modal when clicking outside of it
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.modal') && !event.target.closest('.nav-item')) {
            // modals.forEach(modal => {
            //     modal.classList.remove('show');
            // });

            // navItems.forEach(item => {
            //     item.classList.remove('active-navbar');
            // });
            closeAllModal();
        }
    });

    // Event listener for images inside .grid3x3 in modals
    let gridImages = document.querySelectorAll('.modal-content .grid3x3 img');

    gridImages.forEach((img, imgIndex) => {
        img.addEventListener('click', function() {
            let modalNavText = this.nextElementSibling.textContent.trim();
            document.getElementById("search-destination").innerText = modalNavText;
            closeAllModal();
        });
    });

    const checkInDate = document.getElementById('check-in-date');
    const checkOutDate = document.getElementById('check-out-date');

    flatpickr("#calendar1", {
        inline: true,
        dateFormat: "Y-m-d",
        onChange: function(selectedDates, dateStr, instance) {
            checkInDate.innerText = dateStr;
            closeAllModal();
            
        },
        dateFormat: "F j"
    });

    flatpickr("#calendar2", {
        inline: true,
        dateFormat: "Y-m-d",
        onChange: function(selectedDates, dateStr, instance) {
            checkOutDate.innerText = dateStr;
            closeAllModal();
        },
        dateFormat: "F j"
    });


    // Counter handlers
    const counters = document.querySelectorAll('.who-item-counter p');
    const plusIcons = document.querySelectorAll('.plus-icon');
    const minusIcons = document.querySelectorAll('.minus-icon');

    plusIcons.forEach((plusIcon, index) => {
        plusIcon.addEventListener('click', function() {
            const counter = counters[index];
            let count = parseInt(counter.textContent, 10);
            counter.textContent = ++count;
            updateMinusIcon(minusIcons[index], count);
        });
    });

    minusIcons.forEach((minusIcon, index) => {
        minusIcon.addEventListener('click', function() {
            const counter = counters[index];
            let count = parseInt(counter.textContent, 10);
            if (count > 0) {
                counter.textContent = --count;
                updateMinusIcon(minusIcon, count);
            }
        });
    });

    function updateMinusIcon(minusIcon, count) {
        if (count === 0) {
            minusIcon.classList.add('disabled-counter-img');
        } else {
            minusIcon.classList.remove('disabled-counter-img');
        }
    }

    // Initialize minus icons based on initial counter values
    counters.forEach((counter, index) => {
        let count = parseInt(counter.textContent, 10);
        updateMinusIcon(minusIcons[index], count);
    });

    const showAllPhotosButton = document.querySelectorAll('.nine-dots-btn');
    const fullscreenModal = document.querySelector('.fullscreen-modal');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const fullscreenImage = document.getElementById('fullscreen-image');
    const imageCounter = document.querySelector('.image-counter');

    const images = [
        'assets/bedoom-images/bedroom1.png',
        'assets/bedoom-images/bedroom2.png',
        'assets/bedoom-images/bedroom3.png',
        'assets/bedoom-images/bedroom4.png',
        'assets/bedoom-images/bedroom5.png'
    ];
    let currentIndex = 0;

    showAllPhotosButton.forEach(button => {
        button.addEventListener('click', function() {
            fullscreenModal.style.display = 'flex';
            updateGallery();
        });
    });

    closeBtn.addEventListener('click', function() {
        fullscreenModal.style.display = 'none';
    });

    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateGallery();
        }
    });

    nextBtn.addEventListener('click', function() {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            updateGallery();
        }
    });

    function updateGallery() {
        fullscreenImage.src = images[currentIndex];
        imageCounter.textContent = `${currentIndex + 1}/${images.length}`;

        if (currentIndex === 0) {
            prevBtn.classList.add('disabled');
        } else {
            prevBtn.classList.remove('disabled');
        }

        if (currentIndex === images.length - 1) {
            nextBtn.classList.add('disabled');
        } else {
            nextBtn.classList.remove('disabled');
        }
    }

    const checkInPlusMinus = document.getElementById('check-in-plus-minus');
    const plusMinusFooterItemsModal2 = document.querySelectorAll('.modal-2 .plus-minus-footer-item');

    plusMinusFooterItemsModal2.forEach(item => {
        item.addEventListener('click', function() {
            if (this.textContent === 'Exact dates') {
                checkInPlusMinus.innerText = '';
            } else {
                str = this.textContent.split(' ');
                str = str[0] + ' ' + str [1];
                checkInPlusMinus.innerText = str;
            }
            closeAllModal();
        });
    });

    const checkOutPlusMinus = document.getElementById('check-out-plus-minus');
    const plusMinusFooterItemsModal3 = document.querySelectorAll('.modal-3 .plus-minus-footer-item');

    plusMinusFooterItemsModal3.forEach(item => {
        item.addEventListener('click', function() {
            if (this.textContent === 'Exact dates') {
                checkOutPlusMinus.innerText = '';
            } else {
                str = this.textContent.split(' ');
                str = str[0] + ' ' + str [1];
                checkOutPlusMinus.innerText = str;
            }
            closeAllModal();
        });
    });


    const heartLightIcon = document.getElementById('heart-light-icon');
    const heartSolidIcon = document.getElementById('heart-solid-icon');

    const savedHeartValue = localStorage.getItem('heartValue');

    if (savedHeartValue === 'solid') {
        heartLightIcon.style.display = 'none';
        heartSolidIcon.style.display = 'block';
    } else {
        heartSolidIcon.style.display = 'none';
        heartLightIcon.style.display = 'block';
    }

    // Event listener for clicking on heartLightIcon
    heartLightIcon.addEventListener('click', function() {
        heartLightIcon.style.display = 'none';
        heartSolidIcon.style.display = 'block';
        localStorage.setItem('heartValue', 'solid');
    });

    // Event listener for clicking on heartSolidIcon
    heartSolidIcon.addEventListener('click', function() {
        heartSolidIcon.style.display = 'none';
        heartLightIcon.style.display = 'block';
        localStorage.setItem('heartValue', 'light');
    });

    const shareBtn = document.getElementById('share');
    
    shareBtn.addEventListener('click', function(){
        const modal = document.querySelector('.modal.modal-5');
        modal.style.display = 'block';
    });

    const modal5closeBtn = document.getElementById('close-modal-5');

    modal5closeBtn.addEventListener('click',function(){
        const modal = document.querySelector('.modal.modal-5');
        modal.style.display = 'none';
    });

    // Get the share element div
    const shareElement = document.getElementById('shareElement');

    // Create a tooltip element
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.textContent = 'Copied!';
    document.body.appendChild(tooltip);

    // Function to handle click event
    shareElement.addEventListener('click', function() {
        // Get the position of the share element
        const rect = shareElement.getBoundingClientRect();

        const url = window.location.href;
        navigator.clipboard.writeText(url);
        
        // Position the tooltip above the share element
        tooltip.style.left = `${rect.left + window.scrollX}px`;
        tooltip.style.top = `${rect.top + window.scrollY - tooltip.offsetHeight}px`;
        tooltip.style.display = 'block';

        // Hide the tooltip after 2 seconds
        setTimeout(function() {
            tooltip.style.display = 'none';
        }, 2000);
    });



    
});
