'use client'

import { useEffect } from 'react'

export default function KeyboardNav() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Escape key to close mobile menu
      if (event.key === 'Escape') {
        const mobileMenu = document.querySelector('[data-mobile-menu]')
        if (mobileMenu) {
          mobileMenu.classList.add('hidden')
        }
      }

      // Ctrl/Cmd + K to focus search (if we add search functionality)
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault()
        // Focus search input if it exists
        const searchInput = document.querySelector('input[type="search"]')
        if (searchInput) {
          (searchInput as HTMLElement).focus()
        }
      }

      // Arrow keys for navigation (if we add carousel/slider functionality)
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        // Handle carousel navigation if needed
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return null // This component doesn't render anything visible
} 