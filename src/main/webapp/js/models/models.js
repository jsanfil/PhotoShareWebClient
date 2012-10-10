
window.Photo = Backbone.Model.extend({

    urlRoot: "/PhotoShare/api/photos",

    initialize: function () {
        this.validators = {};

        this.validators.title = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a title"};
        };

        this.validators.subject = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a subject"};
        };

        this.validators.description = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a description"};
        };
    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },

   defaults: {
        id: null,
        title: "",
        subject: "",
        description: "",
        date: new Date(),
        formattedDate: new Date().toLocaleString(),
        originalPath: "mountains.jpg",
        thumbnailPath: "mountains.jpg",
        websizePath: "mountains.jpg"        
    }    
});

window.PhotoCollection = Backbone.Collection.extend({

    model: Photo,

    url: "/PhotoShare/api/photos"

});