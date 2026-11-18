(function () {
    'use strict';

    var canvas = document.getElementById('goal-particles-canvas');
    var reducedMotion = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

    if (canvas && !reducedMotion && canvas.getContext('2d')) {
        var context = canvas.getContext('2d');
        var particles = [];
        var width = 0;
        var height = 0;
        var frame = 0;

        function resizeCanvas() {
            var bounds = canvas.getBoundingClientRect();
            var ratio = Math.min(window.devicePixelRatio || 1, 2);
            width = Math.max(1, bounds.width);
            height = Math.max(1, bounds.height);
            canvas.width = Math.round(width * ratio);
            canvas.height = Math.round(height * ratio);
            context.setTransform(ratio, 0, 0, ratio, 0, 0);
        }

        function createParticle() {
            return {
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.2,
                speedY: -(Math.random() * 0.25 + 0.08),
                opacity: Math.random() * 0.35 + 0.15
            };
        }

        function draw() {
            context.clearRect(0, 0, width, height);
            for (var i = 0; i < particles.length; i += 1) {
                var particle = particles[i];
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                if (particle.y < 0 || particle.x < 0 || particle.x > width) {
                    particle.x = Math.random() * width;
                    particle.y = height;
                }
                context.fillStyle = 'rgba(203,184,140,' + particle.opacity + ')';
                context.beginPath();
                context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                context.fill();

                for (var j = i + 1; j < particles.length; j += 1) {
                    var dx = particle.x - particles[j].x;
                    var dy = particle.y - particles[j].y;
                    var distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 80) {
                        context.strokeStyle = 'rgba(203,184,140,' + (0.08 * (1 - distance / 80)) + ')';
                        context.lineWidth = 0.6;
                        context.beginPath();
                        context.moveTo(particle.x, particle.y);
                        context.lineTo(particles[j].x, particles[j].y);
                        context.stroke();
                    }
                }
            }
            frame = window.requestAnimationFrame(draw);
        }

        resizeCanvas();
        for (var index = 0; index < 28; index += 1) particles.push(createParticle());
        draw();
        window.addEventListener('resize', resizeCanvas, { passive: true });
        document.addEventListener('visibilitychange', function () {
            if (document.hidden) window.cancelAnimationFrame(frame);
            else draw();
        });
    }

    document.querySelectorAll('.goal-glass-card').forEach(function (card) {
        card.addEventListener('pointermove', function (event) {
            if (reducedMotion || event.pointerType !== 'mouse') return;
            var bounds = card.getBoundingClientRect();
            var rotateX = ((event.clientY - bounds.top - bounds.height / 2) / bounds.height) * -5;
            var rotateY = ((event.clientX - bounds.left - bounds.width / 2) / bounds.width) * 5;
            card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-5px)';
        });
        card.addEventListener('pointerleave', function () { card.style.transform = ''; });
    });
})();
