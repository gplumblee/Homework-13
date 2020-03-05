$(function() {
  $(".change-devoured").on("click", function(event) {
    var id = $(this).data("id");
    console.log('devoured',$(this).attr("devour"))
var newDevoured = $(this).attr("devour") === 'true' ? 0 : 1

    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: {devoured: newDevoured}
    }).then(function() {
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(".create-form").on("submit", function(event) {
    event.preventDefault();
    var newBurger = {
      name: $("#addBurger")
        .val()
        .trim()
    };

    // console.log(newBurger)
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(function() {
      console.log("created new burger");
      location.reload();
    });
  });

  $(".delete-burger").on("click", function(event) {
    var id = $(this).data("id");
    $.ajax("/api/burgers/" + id, {
      type: "DELETE"
    }).then(function() {
      console.log("deleted burger", id);
      location.reload();
    });
  });
});
