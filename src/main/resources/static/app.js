angular
  .module('BugTik', ['ngMaterial', 'hybind'])
  .controller('AppCtrl', ['hybind', function (hybind) {
    var self = this;
    var api = hybind('api'); // binds to http://localhost:8080/api

    // models
    self.projects = [];  // left menu
    self.tickets = [];   // main pane

    // loads the project list
    api.$bind('projects', this.projects).$load();

    // selects a project in the list
    this.selectProject = function(project) {
      project.$load().then(function(project) {
        // loads projects ticket
        project.$bind('tickets', self.tickets).$load();
      });
    }

    // search all tickets belonging to 'me'
    this.selectMyTickets = function() {
      api.$bind('tickets/search/findByOwner', self.tickets).$load({ owner: 'me'});
    }
  }]);
