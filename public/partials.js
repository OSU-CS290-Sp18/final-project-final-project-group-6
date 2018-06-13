(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['fullRecipe'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "          <li>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</li>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "        <li>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</li>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"recipe-box\">\r\n  <h2 class=\"recipe-title\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h2>\r\n\r\n  <div class=\"recipe-details-img\">\r\n    <img src="
    + alias4(((helper = (helper = helpers.photoURL || (depth0 != null ? depth0.photoURL : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"photoURL","hash":{},"data":data}) : helper)))
    + ">\r\n  </div>\r\n\r\n  <div class=\"recipe-detail-contents\">\r\n    <div class=\"ingreds-and-time\">\r\n      <div class=\"ingredients\">\r\n        <h3 class=\"ingredient-title\">Ingredients:</h3>\r\n        <ul>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.ingredientsLong : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </ul>\r\n      </div>\r\n      <div class=\"prep-time\">\r\n        <div class=\"prep-time-title\">Prep Time:</div>\r\n        <div class=\"prep-time-value\">"
    + alias4(((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data}) : helper)))
    + "</div>\r\n      </div>\r\n    </div>\r\n    <div class=\"directions\">\r\n      <h3 class=\"directions-title\">Directions:</h3>\r\n      <ol type=\"1\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.directions : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      </ol>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"specific-recipe-attribution\">\r\n    <a href="
    + alias4(((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data}) : helper)))
    + ">Recipe courtesy of "
    + alias4(((helper = (helper = helpers.courtesyOf || (depth0 != null ? depth0.courtesyOf : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"courtesyOf","hash":{},"data":data}) : helper)))
    + "</a>\r\n  </div>\r\n</div>\r\n";
},"useData":true});
templates['ingredient'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<article class=\"mainpage-ingredient\">\r\n  <span class=\"ingredient-name\">"
    + container.escapeExpression(((helper = (helper = helpers.ingredientName || (depth0 != null ? depth0.ingredientName : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"ingredientName","hash":{},"data":data}) : helper)))
    + "</span>\r\n  <div class=\"remove-ingredient-button\">✖</div>\r\n</article>\r\n";
},"useData":true});
templates['recipe'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<article class=\"recipe\">\r\n  <button type=\"button\" class=\"recipe-x-button\">✖</button>\r\n  <div class=\"recipe-text\">\r\n    <p class=\"recipe-name\">\r\n      "
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\r\n    </p>\r\n    <p class=\"recipe-time\">\r\n      "
    + alias4(((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data}) : helper)))
    + "\r\n    </p>\r\n  </div>\r\n  <div class=\"recipe-img\">\r\n    <img src = "
    + alias4(((helper = (helper = helpers.photoURL || (depth0 != null ? depth0.photoURL : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"photoURL","hash":{},"data":data}) : helper)))
    + ">\r\n  </div>\r\n</article>\r\n";
},"useData":true});
})();