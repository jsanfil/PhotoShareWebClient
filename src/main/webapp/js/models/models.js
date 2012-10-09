
window.Photo = Backbone.Model.extend({

    urlRoot: "/PhotoShare/api/photos",

    defaults: {
        id: null,
        title: "",
        subject: "",
        description: "",
        date: new Date(),
        formattedDate: new Date().toUTCString(),
        originalPath: "",
        thumbnailPath: "",
        websizePath: ""        
    }    
});

window.PhotoCollection = Backbone.Collection.extend({

    model: Photo,

    url: "/PhotoShare/api/photos"

});