class App {
  /**
   * elements
   */
  get heading () { return $('h1') }

  /**
   * methods
   */
  async open (path = '/') {
    await browser.url(path)
  }
}

module.exports = new App()
