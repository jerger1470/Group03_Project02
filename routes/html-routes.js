var path = require("path");
var db = require("../models");

module.exports = function(app) {
  //Routes handling the HTML page that the user gets sent to

  //TODO: CONFIRM NAME OF PATHS, js files are not yet created.
  //TODO: named HTML files: selectCat, link, manage, search

  app.get("/search", function(req, res) {
    return res.render("search");
  });
  
  //category (home) route: 
  app.get("/", function(req, res) {
    return res.render("index");
  });

  //Enter link route:
  app.get("/edit", function(req, res) {
    return res.render("edit");
  });

  //Manage category route:
  app.get("/manage", function(req, res) {
    return res.render("manage");
  });
  //category (home) route: 
  app.get("/category/:id", function(req, res) {
    db.category_tb.findOne({
      where: {
        id: req.params.id
      },
      include: [db.link_tb],
    })
    .then(function(dbcategory_tb) {
      console.log(dbcategory_tb)
      res.render("category", {
        name: dbcategory_tb.categoryName, 
        //.map is essential to arrays for sequelize
        links: dbcategory_tb.link_tbs.map(link => link.get({ plain: true }))
      })
    });
    
});
}

//SAMPLE RETURN
// [
//   link_tb {
//     dataValues: 
//     {
//       id: 1,
//       linkURL: 'jason.com',
//       createdAt: 2020-02-04T14:54:15.000Z,
//       updatedAt: 2020-02-04T14:54:15.000Z
//     }
//   },
//   link_tb {
//     dataValues: 
//     {
//       id: 2,
//       linkURL: 'karen.com',
//       createdAt: 2020-02-04T15:31:23.000Z,
//       updatedAt: 2020-02-04T15:31:23.000Z
//     }
//   }
// ]