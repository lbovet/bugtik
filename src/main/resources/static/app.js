angular
  .module('BugTik', ['ngMaterial', 'hybind'])
  .controller('AppCtrl', ['$scope', 'hybind', function ($scope, hybind) {
    var self = this;
    var api = hybind('api'); // binds to http://localhost:8080/api

    // models
    self.projects = [];
    self.tickets = [];
    self.severities = [];

    // selects a project in the list
    self.selectProject = function(project) {
      self.selectedMenuItem = project;
      project.$bind('tickets', []).$load().then(showTickets);
    };

    // search all tickets belonging to 'me'
    self.selectMyTickets = function() {
      self.selectedMenuItem = "my-tickets";
      api.$bind('tickets/search/findByOwner', []).$load({ owner: 'me'}).then(showTickets);
    };

    // create a new ticket in the current project
    self.newTicket = function() {
      api.$bind('tickets').$create().then(function(ticket) {
        self.tickets.$add(ticket);
        self.tickets.push(ticket);
      })};

    // selects a ticket
    self.selectTicket = function(event, ticket) {
      self.selectedTicket = ticket;
      if(event) {
        event.stopPropagation();
      }};

    // deletes a ticket
    self.deleteTicket = function(ticket) {
      ticket.$delete().then(function() {
        self.tickets.splice(self.tickets.indexOf(ticket), 1)
      })};

    // associate the severity resource with the ticket resource after severity change
    self.updateSeverity = function(ticket) {
      ticket.$bind('severity').$set();
    };

    // blurs on enter key in text fields
    self.blurOnEnter = function(event) {
      if(event.keyCode == 13) {
        event.preventDefault();
        event.target.blur();
      }};

    function loadColor(severity) {
      severity.color.$load();
    }

    function showTickets(tickets) {
      self.tickets = tickets;
      tickets.forEach(function(ticket){
        ticket.severity.$load().then(loadColor);
      })}

    // initialize
    api.$bind('projects', self.projects).$load();
    api.$bind('severities', self.severities).$load().then(function() {
      self.severities.forEach(loadColor);
    });

    self.selectMyTickets();
  }]);
