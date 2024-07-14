// This is a sample plugins file for Cypress

// Cypress plugins API accepts an `on` function
// This function is called when the plugins file is loaded

module.exports = (on, config) => {
    // `on` is used to hook into various events Cypress emits
    // `config` is the resolved Cypress config
  
    // Example task registration (not necessary for basic setup)
    on('task', {
      // Example task to log messages to the terminal
      log(message) {
        console.log(message);
        return null;
      },
    });
  
    // Return the resolved config to Cypress
    return config;
  };
  