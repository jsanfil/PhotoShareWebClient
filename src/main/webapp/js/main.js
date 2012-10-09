var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "list",
        "photos/page/:page"	: "list",
        "photos/add"        : "addPhoto",
        "photos/:id"        : "photoDetails",
        "about"             : "about"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

	list: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var photoList = new PhotoCollection();
        photoList.fetch({success: function(){
            $("#content").html(new PhotoListView({model: photoList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    photoDetails: function (id) {
        var photo = new Photo({id: id});
        photo.fetch({success: function(){
            $("#content").html(new PhotoView({model: photo}).el);
        }});
        this.headerView.selectMenuItem();
    },

	addPhoto: function() {
        var photo = new Photo();
        $('#content').html(new PhotoView({model: photo}).el);
        this.headerView.selectMenuItem('add-menu');
	},

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    }

});

utils.loadTemplate(['HeaderView', 'PhotoView', 'PhotoListItemView', 'AboutView'], function() {
    app = new AppRouter();
    Backbone.history.start();
    
});