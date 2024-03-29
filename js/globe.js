$(document).ready(function() {
  /* defining locations to display.
     Each position must have a key, an alpha and delta position (or x and y if you want to display a static location).
     Any additional key can be reached via callbacks functions.
  */
  var locations = {
    obj1: {
      alpha: 0.55,
      delta: -0.23,
      name: "Philadelphia!"
    },
    obj2: {
      alpha: 0.8,
      delta: -2.4,
      name: "Kuwait!"
    },
    obj3: {
      alpha: 0.1,
      delta: 0.7,
      name: "Alaska!"
    },
    obj4: {
      alpha: (3 * Math.PI) / 4,
      delta: (3 * Math.PI) / 4,
      name: "Land down under"
    },
    obj5: {
      alpha: 1.75,
      delta: 0.86,
      name: "Ocean!"
    },
    obj6: {
      alpha: 0.4,
      delta: 2.7,
      name: "Mother Russia"
    }
  };
  $("#sphere").earth3d({
    locationsElement: $("#locations"),
    dragElement: $("#locations"), // where do we catch the mouse drag
    locations: locations
  });
});
