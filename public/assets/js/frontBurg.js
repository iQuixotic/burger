$(function() {
    $(".change-state").on("click", function(event) {
      
      let id = $(this).data("id");
      let devouredOrNot = $(this).data("devoured");
      console.log(id)
  console.log(devouredOrNot);
      let state = {
        devoured: devouredOrNot
      };
     console.log('i am still working right here ' + state.devoured)
      // Send the PUT request.
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: state
      }).then(
        function() {
    
          console.log("here is my state: " )
          console.log('I am trying to change state')
          location.reload();
        }
      );
    });
  
    $(".create-form").on("submit", function(event) {
    
      event.preventDefault();
  
      let newBurg = {
        name: $("#burgTime").val().trim(),
        devoured: $("[name=devoured]:checked").val().trim()
      };
  
      // Send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurg
      }).then(
        function() {
          console.log("created new burger");
        
          location.reload();
        }
      );
    });
  
    $(".deleteIt").on("click", function(event) {
      let id = $(this).data("id");
  
      // Send the DELETE request.
      $.ajax("/api/burgers/" + id, {
        type: "DELETE"
      }).then(
        function() {
          console.log("deleted burger", id);
         
          location.reload();
        }
      );
    });
  });
  