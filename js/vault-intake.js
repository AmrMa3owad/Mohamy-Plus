(function () {
    'use strict';

    var whatsappNumber = '201080509733';

    function openWhatsApp(message) {
        var url = 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(message);
        window.open(url, '_blank', 'noopener,noreferrer');
        return url;
    }

    function setMessageStatus(element, message) {
        if (!element) return;
        element.textContent = message;
        element.setAttribute('role', 'status');
        element.setAttribute('aria-live', 'polite');
    }

    function initWizard() {
        var steps = [1, 2, 3].map(function (number) {
            return document.getElementById('terminal-step-' + number);
        });
        if (!steps[0] || !steps[1] || !steps[2]) return;

        var tabs = [1, 2, 3].map(function (number) {
            return document.getElementById('wizard-tab-' + number);
        });
        var activeStep = 0;
        var urgency = 'Standard';
        var status = document.getElementById('vault-form-status');

        function showStep(index) {
            activeStep = index;
            steps.forEach(function (step, stepIndex) {
                step.classList.toggle('d-none', stepIndex !== index);
                step.setAttribute('aria-hidden', stepIndex !== index ? 'true' : 'false');
            });
            tabs.forEach(function (tab, tabIndex) {
                if (!tab) return;
                tab.classList.toggle('active', tabIndex === index);
                tab.classList.toggle('completed', tabIndex < index);
                tab.setAttribute('aria-current', tabIndex === index ? 'step' : 'false');
            });
            var heading = steps[index].querySelector('.inst-tag');
            if (heading) {
                heading.setAttribute('tabindex', '-1');
                heading.focus();
            }
            setMessageStatus(status, 'Step ' + (index + 1) + ' of 3.');
        }

        function value(id) {
            var field = document.getElementById(id);
            return field ? field.value.trim() : '';
        }

        function validateContact() {
            var name = document.getElementById('vault-client-name');
            var phone = document.getElementById('vault-client-phone');
            var email = document.getElementById('vault-client-email');
            if (!name || !name.value.trim()) {
                if (name) { name.setCustomValidity('Please enter your name or organization.'); name.reportValidity(); name.setCustomValidity(''); }
                return false;
            }
            if (phone) phone.setCustomValidity('');
            if (email) email.setCustomValidity('');
            if (email && email.value.trim() && !email.checkValidity()) {
                email.reportValidity();
                return false;
            }
            if (phone && phone.value.trim() && !phone.checkValidity()) {
                phone.reportValidity();
                return false;
            }
            if (!(phone && phone.value.trim()) && !(email && email.value.trim())) {
                var contactField = phone || email;
                if (contactField) {
                    contactField.setCustomValidity('Please provide a phone number or email address.');
                    contactField.reportValidity();
                    contactField.setCustomValidity('');
                }
                return false;
            }
            return true;
        }

        var nextToStep2 = document.getElementById('to-step-2');
        var nextToStep3 = document.getElementById('to-step-3');
        var backToStep1 = document.getElementById('back-to-step-1');
        var backToStep2 = document.getElementById('back-to-step-2');
        if (nextToStep2) nextToStep2.addEventListener('click', function () { showStep(1); });
        if (nextToStep3) nextToStep3.addEventListener('click', function () { showStep(2); });
        if (backToStep1) backToStep1.addEventListener('click', function () { showStep(0); });
        if (backToStep2) backToStep2.addEventListener('click', function () { showStep(1); });

        document.querySelectorAll('.urgency-btn').forEach(function (button) {
            button.addEventListener('click', function () {
                document.querySelectorAll('.urgency-btn').forEach(function (item) {
                    item.classList.remove('active');
                    item.setAttribute('aria-pressed', 'false');
                });
                button.classList.add('active');
                button.setAttribute('aria-pressed', 'true');
                urgency = button.getAttribute('data-level') || 'Standard';
                var badge = document.getElementById('urgency-badge-text');
                if (badge) badge.textContent = urgency === 'Emergency' ? 'TIME-SENSITIVE MATTER' : urgency === 'Urgent' ? 'URGENT MATTER' : 'STANDARD REQUEST';
            });
            button.setAttribute('aria-pressed', button.classList.contains('active') ? 'true' : 'false');
        });

        var submit = document.getElementById('vault-submit-btn');
        if (submit) submit.addEventListener('click', function () {
            if (!validateContact()) return;
            var category = document.querySelector('input[name="practiceDomain"]:checked');
            var message = [
                'Mohamy Plus — consultation request',
                'Name / organization: ' + value('vault-client-name'),
                'Phone: ' + value('vault-client-phone'),
                'Email: ' + value('vault-client-email'),
                'Practice area: ' + (category ? category.value : 'Not specified'),
                'Priority: ' + urgency,
                'Summary: ' + (value('vault-case-text') || 'Not provided')
            ].join('\n');
            var url = openWhatsApp(message);
            var success = document.getElementById('terminal-success-state');
            if (success) {
                steps.forEach(function (step) { step.classList.add('d-none'); step.setAttribute('aria-hidden', 'true'); });
                success.classList.remove('d-none');
                success.setAttribute('aria-hidden', 'false');
                var fallback = document.getElementById('vault-whatsapp-fallback');
                if (fallback) fallback.href = url;
                var title = success.querySelector('h3');
                if (title) {
                    title.setAttribute('tabindex', '-1');
                    title.focus();
                }
                setMessageStatus(status, 'Your draft is ready. If WhatsApp did not open, use the button below. Review the message and press Send there.');
            }
        });

        showStep(0);
    }

    function initContactForm() {
        var form = document.getElementById('contactForm');
        if (!form) return;
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            if (!form.reportValidity()) return;
            var data = new FormData(form);
            var message = [
                'Mohamy Plus — contact request',
                'Name: ' + (data.get('name') || ''),
                'Email: ' + (data.get('email') || ''),
                'Subject: ' + (data.get('subject') || ''),
                'Message: ' + (data.get('message') || '')
            ].join('\n');
            var url = openWhatsApp(message);
            var feedback = form.querySelector('.submitting');
            setMessageStatus(feedback, 'Your draft is ready. Review the prefilled WhatsApp message, avoid sensitive information, and press Send there when you are ready.');
            if (feedback) {
                var fallback = document.createElement('a');
                fallback.href = url;
                fallback.target = '_blank';
                fallback.rel = 'noopener noreferrer';
                fallback.className = 'd-inline-block mt-2';
                fallback.textContent = 'Open WhatsApp';
                feedback.appendChild(document.createElement('br'));
                feedback.appendChild(fallback);
            }
        });
    }

    function initBlogSearch() {
        if (!document.getElementById('blog-search-status')) return;
        var query = new URLSearchParams(window.location.search).get('q');
        var form = document.querySelector('.search-form');
        var input = form && form.querySelector('input[name="q"]');
        if (query && input) input.value = query;
        var entries = Array.prototype.slice.call(document.querySelectorAll('.blog-entry'));
        if (!entries.length) return;
        var normalizedQuery = (query || '').trim().toLocaleLowerCase();
        var seenArticles = Object.create(null);
        var visibleCount = 0;
        entries.forEach(function (entry) {
            var title = entry.querySelector('.heading a');
            var articleKey = title ? title.textContent.trim().toLocaleLowerCase() : entry.textContent.trim().toLocaleLowerCase();
            var isDuplicate = Boolean(seenArticles[articleKey]);
            seenArticles[articleKey] = true;
            var match = !normalizedQuery || entry.textContent.toLocaleLowerCase().indexOf(normalizedQuery) !== -1;
            var card = entry.closest('.col-md-4, .col-md-6, .col-lg-4') || entry;
            card.hidden = !match || isDuplicate;
            if (match && !isDuplicate) visibleCount += 1;
        });
        var pagination = document.querySelector('.block-27');
        if (pagination) pagination.hidden = true;
        var status = document.getElementById('blog-search-status');
        if (status && query) status.textContent = visibleCount ? visibleCount + ' result(s) for “' + query + '”.' : 'No articles matched “' + query + '”.';
    }

    function init() {
        document.querySelectorAll('[data-current-year]').forEach(function (element) {
            element.textContent = new Date().getFullYear();
        });
        initWizard();
        initContactForm();
        initBlogSearch();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
