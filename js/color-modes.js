/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
    'use strict'

    const getStoredTheme = () => localStorage.getItem('theme')
    const setStoredTheme = theme => localStorage.setItem('theme', theme)

    const getPreferredTheme = () => {
        const storedTheme = getStoredTheme()
        if (storedTheme) {
            return storedTheme
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    const setTheme = theme => {
        if (theme === 'auto') {
            // If auto, use system preference
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-bs-theme', systemTheme);
        } else {
            // Otherwise use the selected theme
            document.documentElement.setAttribute('data-bs-theme', theme);
        }

        // Update the theme-switch state
        const themeSwitch = document.querySelector('.theme-switch');
        if (themeSwitch) {
            themeSwitch.setAttribute('data-theme', theme);
        }

        // Update active states of buttons
        document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
            element.classList.toggle('active', element.getAttribute('data-bs-theme-value') === theme);
        });

        // Store the theme preference
        localStorage.setItem('theme', theme);
    }

    const showActiveTheme = theme => {
        const themeSwitcher = document.querySelector('.theme-switch')
        if (!themeSwitcher) return

        // Remove active class from all buttons
        document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
            element.classList.remove('active')
            element.setAttribute('aria-pressed', 'false')
        })

        // Add active class to current theme button
        const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
        if (btnToActive) {
            btnToActive.classList.add('active')
            btnToActive.setAttribute('aria-pressed', 'true')
        }

        // Update the slider position
        themeSwitcher.setAttribute('data-theme', theme)
    }

    // Set up theme when DOM is loaded
    window.addEventListener('DOMContentLoaded', () => {
        // Initialize with stored theme or system preference
        const storedTheme = localStorage.getItem('theme');
        const initialTheme = storedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        setTheme(initialTheme);

        // Add click handlers to theme toggles
        document.querySelectorAll('[data-bs-theme-value]').forEach(toggle => {
            toggle.addEventListener('click', () => {
                const theme = toggle.getAttribute('data-bs-theme-value');
                setTheme(theme);
            });
        });
    })

    // Watch for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const storedTheme = getStoredTheme()
        if (storedTheme !== 'light' && storedTheme !== 'dark') {
            setTheme(getPreferredTheme())
        }
    })
})();