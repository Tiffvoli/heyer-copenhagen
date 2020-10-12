$(window).on("scroll", function () {
  $(".target").each(function () {
    if ($(window).scrollTop() >= $(this).position().top) {
      var id = $(this).attr("id");
      $(".sustainability-links-wrapper a").removeClass("active");
      $(".sustainability-links-wrapper a[href=#" + id + "]").addClass("active");
    }
  });
});
