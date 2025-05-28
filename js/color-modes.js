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
        // Set the theme attribute on html element
        if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-bs-theme', 'dark')
        } else if (theme === 'auto') {
            document.documentElement.setAttribute('data-bs-theme', 'light')
        } else {
            document.documentElement.setAttribute('data-bs-theme', theme)
        }

        // Update the theme switch position
        const themeSwitch = document.querySelector('.theme-switch')
        if (themeSwitch) {
            themeSwitch.setAttribute('data-theme', theme)
        }
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

    // Initialize theme
    setTheme(getPreferredTheme())

    window.addEventListener('DOMContentLoaded', () => {
        showActiveTheme(getPreferredTheme())
        
        // Add click handlers to theme toggles
        document.querySelectorAll('[data-bs-theme-value]')
            .forEach(toggle => {
                toggle.addEventListener('click', () => {
                    const theme = toggle.getAttribute('data-bs-theme-value')
                    setStoredTheme(theme)
                    setTheme(theme)
                    showActiveTheme(theme)
                })
            })
    })

    // Watch for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const storedTheme = getStoredTheme()
        if (storedTheme !== 'light' && storedTheme !== 'dark') {
            setTheme(getPreferredTheme())
        }
    })
})();