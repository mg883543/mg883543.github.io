        const images = [
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80',
            'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80',
            'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80',
            'https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80',
            'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80',
            'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80',
            'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80',
            'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80'
        ];

        let currentSlide = 0;
        let slidesPerView = 3;

        function getSlidesPerView() {
            if (window.innerWidth <= 576) {
                return 1;
            } else if (window.innerWidth <= 992) {
                return 2;
            } else {
                return 3;
            }
        }

        function calculateTotalPages() {
            slidesPerView = getSlidesPerView();
            return Math.ceil(images.length / slidesPerView);
        }

        function initGallery() {
            const slider = document.querySelector('.slider');
            const currentPageEl = document.querySelector('.current-page');
            const totalPagesEl = document.querySelector('.total-pages');
            const pagerDots = document.querySelector('.pager-dots');
            
            slider.innerHTML = '';
            pagerDots.innerHTML = '';
            
            for (let i = 0; i < images.length; i++) {
                const slide = document.createElement('div');
                slide.className = 'slide';
                
                const img = document.createElement('img');
                img.src = images[i];
                img.alt = "Изображение " + (i + 1);
                
                slide.appendChild(img);
                slider.appendChild(slide);
            }
            
            const totalPages = calculateTotalPages();
            totalPagesEl.textContent = totalPages;
            for (let i = 0; i < totalPages; i++) {
                const dot = document.createElement('div');
                dot.className = 'dot';
                if (i === 0) {
                    dot.classList.add('active');
                }
                dot.addEventListener('click', function() {
                    goToPage(i);
                });
                pagerDots.appendChild(dot);
            }
            
            updateSlider();
        }

        function updateSlider() {
            const slider = document.querySelector('.slider');
            const currentPageEl = document.querySelector('.current-page');
            const dots = document.querySelectorAll('.dot');
            
            const slideWidth = 100 / slidesPerView;
            const translateX = -currentSlide * slideWidth;
            slider.style.transform = "translateX(" + translateX + "%)";
            
            currentPageEl.textContent = currentSlide + 1;
            
            for (let i = 0; i < dots.length; i++) {
                if (i === currentSlide) {
                    dots[i].classList.add('active');
                } else {
                    dots[i].classList.remove('active');
                }
            }
        }
        function goToPage(pageIndex) {
            const totalPages = calculateTotalPages();
            if (pageIndex >= 0 && pageIndex < totalPages) {
                currentSlide = pageIndex;
                updateSlider();
            }
        }
        function nextSlide() {
            const totalPages = calculateTotalPages();
            if (currentSlide < totalPages - 1) {
                currentSlide++;
                updateSlider();
            }
        }
        function prevSlide() {
            if (currentSlide > 0) {
                currentSlide--;
                updateSlider();
            }
        }
        document.addEventListener('DOMContentLoaded', function() {
            initGallery();
            
            const prevBtn = document.querySelector('.prev-btn');
            const nextBtn = document.querySelector('.next-btn');
            
            prevBtn.addEventListener('click', prevSlide);
            nextBtn.addEventListener('click', nextSlide);
            
            window.addEventListener('resize', function() {
                const oldSlidesPerView = slidesPerView;
                const newSlidesPerView = getSlidesPerView();
                
                if (oldSlidesPerView !== newSlidesPerView) {
                    currentSlide = Math.floor(currentSlide * oldSlidesPerView / newSlidesPerView);
                    initGallery();
                }
            });
        });