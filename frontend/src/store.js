const store = {
    debug: true,
    state: {
      isConnected: !!localStorage.getItem('token')
    },
    setIsConnected (newValue) {
      if (this.debug) console.log('setIsConnected triggered with', newValue)
      this.state.isConnected = newValue
    }
}

module.exports = store;