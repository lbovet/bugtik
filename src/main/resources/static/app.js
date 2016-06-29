angular
  .module('BugTik', ['ngMaterial', 'hybind'])
  .controller('AppCtrl', ['hybind', function (hybind) {
    var self = this;
    var api = hybind('api'); // binds to http://localhost:8080/api

    // models
    self.projects = [];  // left menu
    self.tickets = [];   // main pane
    self.selectedItem = null;

    function loadTicketData() {
      self.tickets.forEach(function(ticket){
        console.log(ticket);
        ticket.$load()
          .then(function(ticket) {
            return ticket.$bind('severity').$load();
          })
          .then(function(severity) {
            return severity.$bind('color').$load();
          })
      });
    }

    // selects a project in the list
    self.selectProject = function(project) {
      self.selectedItem = project;
      project.$bind('tickets', self.tickets).$load().then(loadTicketData);
    }

    // search all tickets belonging to 'me'
    self.selectMyTickets = function() {
      self.selectedItem = "my-tickets";
      var search = api.$bind('tickets/search/findByOwner', self.tickets);
      search.$bind.self = api.$bind('tickets').$bind.self;
      search.$load({ owner: 'me'}).then(loadTicketData);
    }

    // initialize
    api.$bind('projects', self.projects).$load();
    self.selectMyTickets();
  }]);
