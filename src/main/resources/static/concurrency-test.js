describe('spring data', function () {

  var projects = [], tickets = [];

  beforeEach(function (done) {
    var api = hybind("api");
    api.$load()
      .then(function () {
        api.$bind('projects', projects);
        api.$bind('tickets', tickets);
      })
      // remove the first project if it exists
      .then(function () {
        return projects.$load();
      })
      .then(function () {
        return !projects[0] || projects[0].$delete();
      })
      // recreate an empty one
      .then(function () {
        return projects.$create({
          name: "spring-data"
        });
      })
      // and bind its ticket collection
      .then(function () {
        return projects.$load();
      })
      .then(function () {
        projects[0].$bind('tickets', []);
      })
      .always(done);
  });

  it('should create and add twenty tickets to the project', function (done) {
    var names = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
      "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eightteen", "nineteen", "twenty"];
    console.log("creating and adding:");
    $.when.apply($, names.map(function (name) {
      // create ticket
      return tickets.$create({
        summary: name
      }).then(function (ticket) {
        // add it to project
        console.log(ticket.id, ticket.summary);
        return projects[0].tickets.$add(ticket);
      });
    }))
      .then(function() {
        return projects[0].tickets.$load();
      })
      .then(function() {
        expect(projects[0].tickets.length).toBe(names.length);
        console.log("Actually added to project:")
        projects[0].tickets.map(function(ticket) {
          console.log(ticket.id, ticket.summary);
        });
      })
      .always(done);
  });

})
;
