module.exports = {
  server: {
    middleware: [
        require('compression')() 
    ]
  },
  ghostMode: false
};