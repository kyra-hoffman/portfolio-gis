if (document.getElementById('my-work-link')) {
  document.getElementById('my-work-link').addEventListener('click', () => {
    document.getElementById('my-work-section').scrollIntoView({behavior: "smooth"})
  })
}

if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const compassCursor = document.createElement('img')
  compassCursor.className = 'compass-cursor'
  compassCursor.src = new URL('../assets/icons/compass-cursor.svg', document.currentScript.src)
  compassCursor.alt = ''
  compassCursor.setAttribute('aria-hidden', 'true')
  document.body.appendChild(compassCursor)
  document.body.classList.add('compass-cursor-enabled')

  let pointerX = 0
  let pointerY = 0

  const updateCompassCursor = () => {
    const targetX = window.innerWidth / 2
    const targetY = 0
    const angle = Math.atan2(targetY - pointerY, targetX - pointerX) * 180 / Math.PI + 90

    compassCursor.style.left = `${pointerX}px`
    compassCursor.style.top = `${pointerY}px`
    compassCursor.style.setProperty('--compass-angle', `${angle}deg`)
  }

  window.addEventListener('mousemove', (event) => {
    pointerX = event.clientX
    pointerY = event.clientY
    updateCompassCursor()
    compassCursor.style.visibility = 'visible'
    compassCursor.classList.toggle(
      'is-over-button',
      event.target instanceof Element && Boolean(event.target.closest('a.button, button'))
    )
  })

  window.addEventListener('resize', updateCompassCursor)
  window.addEventListener('blur', () => {
    compassCursor.style.visibility = 'hidden'
  })
}