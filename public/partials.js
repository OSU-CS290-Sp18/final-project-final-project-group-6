(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['ingredient'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<article class=\"mainpage-ingredient\">\n  <span class=\"ingredient-name\">"
    + container.escapeExpression(((helper = (helper = helpers.ingredientName || (depth0 != null ? depth0.ingredientName : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"ingredientName","hash":{},"data":data}) : helper)))
    + "</span>\n  <div class=\"remove-ingredient-button\">\n  </div>\n</article>\n";
},"useData":true});
})();