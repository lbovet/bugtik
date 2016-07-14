angular
  .module('BugTik', ['ngMaterial', 'hybind'])
  .controller('AppCtrl', ['$mdSidenav', 'hybind', function ($mdSidenav, hybind) {
    var self = this;
    var api = hybind('api'); // binds to http://localhost:8080/api

    // models
    self.projects = [];
    self.tickets = [];
    self.severities = [];
    self.colors = [];

    self.severityCache = {}

    self.toggleMenu = function() {
      $mdSidenav('menu').toggle();
    }

    self.clickAnywhere = function() {
      self.selectTicket(null);
      $mdSidenav('menu').close();
    }

    // selects a project in the list
    self.selectProject = function(project) {
      self.selectedMenuItem = project;
      project.$bind('tickets', []).$load({projection: 'withSeverity'}).then(showTickets);
    };

    // search all tickets belonging to 'me'
    self.selectMyTickets = function() {
      self.selectedMenuItem = "my-tickets";
      api.$bind('tickets/search/findByOwner', []).$load({projection: 'withSeverity', owner: 'me'}).then(showTickets);
    };

    // create a new ticket in the current project
    self.newTicket = function() {
      api.$bind('tickets').$create().then(function(ticket) {
        self.tickets.$add(ticket).then(function() {
            self.tickets.push(ticket);
      })})};

    // selects a ticket
    self.selectTicket = function(ticket, event) {
      self.selectedTicket = ticket;
      if(event) event.stopPropagation();
    };

    // deletes a ticket
    self.deleteTicket = function(ticket) {
      ticket.$delete().then(function() {
        self.tickets.splice(self.tickets.indexOf(ticket), 1)
      })};

    // returns all projects except the selected one
    self.otherProjects = function() {
      return self.projects.filter(function(project) {
        return project != self.selectedMenuItem
      });};

    // moves a ticket to another project
    self.moveTicket = function(ticket, project) {
      if(self.selectedMenuItem != "my-tickets") {
        self.tickets.splice(self.tickets.indexOf(ticket), 1);
      }
      project.$bind('tickets', []).$load().then(function(tickets) {
        tickets.$add(ticket);
      });};

    // associate the severity resource with the ticket resource after severity change
    self.updateSeverity = function(ticket) {
      ticket.$bind('severity').$set();
    };

    // associate the color resource with the severity resource after color change
    self.setColor = function(severity, color) {
      severity.$bind('color', color).$set();
    };

    // blurs on enter key in text fields
    self.blurOnEnter = function(event) {
      if(event.keyCode == 13) {
        event.preventDefault();
        event.target.blur();
      }};

    function showTickets(tickets) {
      self.tickets = tickets;
      tickets.forEach(function(ticket){
        ticket.$share(self.severityCache, 'severity');
      })}

    // initialize
    api.$bind('projects', self.projects).$load();
    api.$bind('colors', self.colors).$load();
    api.$bind('severities', self.severities).$load({projection: 'withColor'}).then(function() {
      self.severities.forEach(function(severity) {
        severity.$share(self.severityCache)
      });
      self.selectMyTickets();
    });
  }]);
