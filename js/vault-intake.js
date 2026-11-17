/**
 * vault-intake.js — Mohamy Plus Legal Vault Intake Controller
 * Single Responsibility: Manages the 3-step vault intake wizard on all pages.
 * Open/Closed: Drop this file into any page; it self-initialises.
 */
(function () {
    'use strict';

    function initVaultIntake() {
        var vaultForm = document.getElementById('vaultIntakeForm');
        if (!vaultForm) return; // Not on a vault page — exit cleanly

        var steps = [].slice.call(document.querySelectorAll('.vault-step'));
        var indicators = [].slice.call(document.querySelectorAll('.vault-step-indicator'));
        var currentStep = 0;

        function showStep(n) {
            steps.forEach(function (s, i) {
                s.classList.toggle('active', i === n);
                s.style.display = i === n ? 'block' : 'none';
            });
            indicators.forEach(function (ind, i) {
                ind.classList.toggle('active', i <= n);
                ind.classList.toggle('completed', i < n);
            });
            currentStep = n;
        }

        function nextStep() {
            if (currentStep < steps.length - 1) showStep(currentStep + 1);
        }

        function prevStep() {
            if (currentStep > 0) showStep(currentStep - 1);
        }

        // Wire up Next/Prev buttons
        document.querySelectorAll('[data-vault-next]').forEach(function (btn) {
            btn.addEventListener('click', nextStep);
        });
        document.querySelectorAll('[data-vault-prev]').forEach(function (btn) {
            btn.addEventListener('click', prevStep);
        });

        // Wire up urgency chips
        document.querySelectorAll('.vault-urgency-chip').forEach(function (chip) {
            chip.addEventListener('click', function () {
                document.querySelectorAll('.vault-urgency-chip').forEach(function (c) {
                    c.classList.remove('active');
                });
                chip.classList.add('active');
                var hiddenUrgency = document.getElementById('vaultUrgencyLevel');
                if (hiddenUrgency) hiddenUrgency.value = chip.dataset.level || chip.textContent.trim();
            });
        });

        // Wire up practice area chips
        document.querySelectorAll('.vault-chip').forEach(function (chip) {
            chip.addEventListener('click', function () {
                chip.classList.toggle('active');
                var selected = [].slice.call(document.querySelectorAll('.vault-chip.active'))
                    .map(function (c) { return c.textContent.trim(); }).join(', ');
                var hiddenArea = document.getElementById('vaultPracticeArea');
                if (hiddenArea) hiddenArea.value = selected;
            });
        });

        // Form submission
        vaultForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var submitBtn = vaultForm.querySelector('[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Transmitting...';
            }

            var payload = {
                name: vaultForm.querySelector('[name="vaultName"]') ? vaultForm.querySelector('[name="vaultName"]').value : '',
                email: vaultForm.querySelector('[name="vaultEmail"]') ? vaultForm.querySelector('[name="vaultEmail"]').value : '',
                phone: vaultForm.querySelector('[name="vaultPhone"]') ? vaultForm.querySelector('[name="vaultPhone"]').value : '',
                area: document.getElementById('vaultPracticeArea') ? document.getElementById('vaultPracticeArea').value : '',
                urgency: document.getElementById('vaultUrgencyLevel') ? document.getElementById('vaultUrgencyLevel').value : '',
                detail: vaultForm.querySelector('[name="vaultDetail"]') ? vaultForm.querySelector('[name="vaultDetail"]').value : ''
            };

            // Build mailto fallback (WhatsApp is primary)
            var waMsg = encodeURIComponent(
                'New Case Intake\n' +
                'Name: ' + payload.name + '\n' +
                'Email: ' + payload.email + '\n' +
                'Phone: ' + payload.phone + '\n' +
                'Practice Area: ' + payload.area + '\n' +
                'Urgency: ' + payload.urgency + '\n' +
                'Details: ' + payload.detail
            );

            setTimeout(function () {
                window.open('https://wa.me/201080509733?text=' + waMsg, '_blank');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Transmission Sent ✓';
                    submitBtn.style.background = 'rgba(40,167,69,0.3)';
                    submitBtn.style.borderColor = '#28a745';
                }
            }, 800);
        });

        // Init first step
        showStep(0);
    }

    // Auto-init on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initVaultIntake);
    } else {
        initVaultIntake();
    }
})();
