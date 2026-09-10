(function () {
    'use strict';

    var cards = Array.prototype.slice.call(document.querySelectorAll('[data-video-id]'));
    var player = document.getElementById('video-player');
    var random = document.getElementById('random-video');
    var currentVideo = -1;

    function showVideo(index) {
        var card = cards[index];
        var id = card.getAttribute('data-video-id');
        if (!/^[A-Za-z0-9_-]{11}$/.test(id)) return;
        var title = card.getAttribute('data-video-title');
        var frame = document.createElement('iframe');
        frame.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&mute=1&controls=0';
        frame.title = title;
        frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        frame.allowFullscreen = true;
        frame.referrerPolicy = 'strict-origin-when-cross-origin';
        player.textContent = '';
        player.appendChild(frame);
        player.hidden = false;
        currentVideo = index;
        cards.forEach(function (item, i) {
            if (i === index) item.setAttribute('aria-current', 'true');
            else item.removeAttribute('aria-current');
        });
        var status = document.getElementById('video-status');
        status.textContent = 'Selected: ' + title + '. ';
        var fallback = document.createElement('a');
        fallback.href = card.href;
        fallback.textContent = 'Watch on YouTube';
        status.appendChild(fallback);
        player.scrollIntoView({block: 'nearest'});
    }

    cards.forEach(function (card, index) {
        card.addEventListener('click', function (event) {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            showVideo(index);
        });
    });
    if (random && cards.length > 1) {
        random.hidden = false;
        random.addEventListener('click', function () {
            var choices = cards.map(function (_, i) { return i; }).filter(function (i) {
                return i !== currentVideo;
            });
            showVideo(choices[Math.floor(Math.random() * choices.length)]);
        });
    }

    var slides = Array.prototype.slice.call(document.querySelectorAll('.screenshot-slide'));
    var controls = document.getElementById('slideshow-controls');
    var currentSlide = 0;
    function showSlide(index) {
        currentSlide = (index + slides.length) % slides.length;
        slides.forEach(function (slide, i) { slide.hidden = i !== currentSlide; });
        document.getElementById('slide-status').textContent = (currentSlide + 1) + ' / ' + slides.length;
    }
    if (slides.length > 1) {
        controls.hidden = false;
        document.getElementById('previous-slide').addEventListener('click', function () {
            showSlide(currentSlide - 1);
        });
        document.getElementById('next-slide').addEventListener('click', function () {
            showSlide(currentSlide + 1);
        });
        showSlide(0);
    }
}());
