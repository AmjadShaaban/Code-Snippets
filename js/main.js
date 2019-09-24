$(document).ready(() => {
  $("#tr").on("click", () => {
    $("#moveme")
      .detach()
      .appendTo(".t-r");
  });
  $("#tl").on("click", () => {
    $("#moveme")
      .detach()
      .appendTo(".t-l");
  });
  $("#br").on("click", () => {
    $("#moveme")
      .detach()
      .appendTo(".b-r");
  });
  $("#bl").on("click", () => {
    $("#moveme")
      .detach()
      .appendTo(".b-l");
  });
  $("#md").on("click", () => {
    $("#moveme")
      .detach()
      .appendTo(".md");
  });
});
