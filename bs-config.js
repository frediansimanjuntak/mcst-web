module.exports = {
  server: {
    middleware: [
        require('compression')() 
    ]
  }
};