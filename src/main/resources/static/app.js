angular
  .module('BugTik', ['ngMaterial', 'hybind'])
  .controller('AppCtrl', ['hybind', function (hybind) {
    var self = this;
    var api = hybind('api'); // binds to http://localhost:8080/api

    // models
    self.projects = [];  // left menu
    self.tickets = [];   // main pane
    self.selectedItem = null;

    function showTickets(tickets) {
      self.tickets = tickets
      tickets.forEach(function(ticket){
        ticket.severity.$load().then(function() {
            ticket.severity.color.$load();
          })
      });
    }

    // selects a project in the list
    self.selectProject = function(project) {
      self.selectedItem = project;
      project.$bind('tickets', []).$load().then(showTickets);
    }

    // search all tickets belonging to 'me'
    self.selectMyTickets = function() {
      self.selectedItem = "my-tickets";
      var search = api.$bind('tickets/search/findByOwner', []);
      search.$load({ owner: 'me'}).then(showTickets);
    }

    // initialize
    api.$bind('projects', self.projects).$load();
    self.selectMyTickets();
  }]);
