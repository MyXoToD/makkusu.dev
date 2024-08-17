export class Theme {
  theme = 'dark'
  toggleButton = document.querySelector('.theme-toggle')

  constructor () {
    this.toggleButton.addEventListener('click', this.toggleTheme.bind(this))

    const storedTheme = window.localStorage.getItem('theme')

    if (!storedTheme && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      this.setLightTheme()
    }

    if (storedTheme && storedTheme === 'light') {
      this.setLightTheme()
    }
  }

  setLightTheme () {
    document.documentElement.classList.add('theme-light')
    window.localStorage.setItem('theme', 'light')
  }

  async toggleTheme () {
    const root = document.documentElement

    if (document.startViewTransition) {
      await document.startViewTransition(() => {
        root.classList.toggle('theme-light')
      }).ready

      const { top, left, width, height } = this.toggleButton.getBoundingClientRect()
      const x = left + (width / 2)
      const y = top + (height / 2)

      root.animate({
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(2000px at ${x}px ${y}px`
        ]
      }, {
        duration: 1000,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)'
      })
    } else {
      root.classList.toggle('theme-light')
    }

    window.localStorage.setItem('theme', root.classList.contains('theme-light') ? 'light' : 'dark')
  }
}
