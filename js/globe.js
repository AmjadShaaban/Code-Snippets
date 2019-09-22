$(document).ready(function() {
  var anim = 0;
  function animate_globe(globe) {
    $globe = $(globe);

    anim += 1;
    var x = ((anim * 5) % 600) - 600;
    $globe.find(".globe-span").each(function(i, span) {
      $(span).css({ left: x * scales[i] });
    });
  }

  function make_globe(globe_select, globe_image_select, size) {
    var span_html_template =
      '<div style="position:relative;overflow:hidden;width:[WIDTH]px;height:1px;margin-left:[MARGIN]px;"></div>"';
    var span_img_template =
      '<img class="globe-span" src="[SRC]" width="[WIDTH]" height="[HEIGHT]" style="border:0;padding:0;margin:0;position:relative;width:[WIDTH]px;height:[HEIGHT]px;top:[TOP]px;">';

    function render_template(template, td) {
      return template.replace(/\[(.*?)\]/g, function(_m, n) {
        return td[n];
      });
    }

    var $globe = $(globe_select);
    var $globe_image = $(globe_image_select);
    var globe_image_src = $globe_image.attr("src");
    var w = $globe_image.width();
    var h = $globe_image.height();

    var r = size / 2;
    scales = [];
    for (var y = -r; y < r; y++) {
      var i = (y + r) / size;
      var width = Math.sqrt(r * r - y * y) * 2.0 + 0.5;

      var scale = width / size;

      scales.push(scale);

      var img_width = Math.round(scale * w * 2);
      var img_height = Math.round(scale * h);
      var img_y = Math.floor(i * img_height);

      var span_html = render_template(span_html_template, {
        WIDTH: Math.ceil(width),
        MARGIN: Math.round((size - width) / 2)
      });

      var $span = $(span_html);

      var img_html = render_template(span_img_template, {
        SRC: globe_image_src,
        WIDTH: img_width,
        WIDTH2: img_width * 2,
        HEIGHT: img_height,
        TOP: -img_y
      });

      var $span_img = $(img_html);

      $span.append($span_img);
      $globe.append($span);
    }

    setInterval(() => {
      animate_globe("#jsglobe");
    }, 75);
  }

  $(function() {
    make_globe("#jsglobe", "#jsglobe-image", 300);
  });
});
