class Issue extends Error {
  constructor(name, message) {
    super(message)
    this.name = name
    this.message = message
  }
}

module.exports = Issue
