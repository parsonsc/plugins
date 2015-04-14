(function($) {

    $.fn.slideshow = function(options) {

        // Establish our default settings
        var settings = $.extend({
            height: 100,
            numberOfSlides: 1,
            speed: 500,
            slideMethod: "slideHoriz",
            auto: false,
            autoDelay: 10000,
            initialSlide: 1
        }, options);

        // slideshow constructor
        function Slideshow( slideshowName, height, numberOfSlides, speed, slideMethod, auto, autoDelay, initialSlide) {
            this.slideshowName = slideshowName;
            this.height = height;
            this.numberOfSlides = numberOfSlides;
            this.speed = speed;
            this.slideMethod = slideMethod;
            this.auto = auto;
            this.autoDelay = autoDelay;
            this.currentSlide = initialSlide;
        }

        Slideshow.prototype = {
            init : function(){
                //$("#" + this.slideshowName).height(this.height);
                $("#" + this.slideshowName + " > ul > li:nth-child(" + this.currentSlide + ")").show();
            },
            moveSlide: function(direction){

                //alert(direction);
                // declare variables
                var
                    slideIn,
                    slideInElem,
                    slideInElemNav,
                    slideOutElem,
                    slideOuElemNav;


                if(direction==="next"){

                   slideIn = this.currentSlide + 1;
                   if(slideIn>this.numberOfSlides) { slideIn=1; }

                   var slideInStartPos = "100%";
                   var slideOutEndPos = "-100%";


                } else if(!isNaN(direction)){

                   slideIn = direction;
                   //if(slideIn>this.numberOfSlides) { slideIn=1; }

                   var slideInStartPos = "100%";
                   var slideOutEndPos = "-100%";


                } else {

                   slideIn = this.currentSlide - 1;
                   if(slideIn<1) { slideIn=this.numberOfSlides; }

                   var slideInStartPos = "-100%";
                   var slideOutEndPos = "100%";


                }

                // elements
                slideInElem = $("#" + this.slideshowName + " > ul > li:nth-child(" + slideIn + ")");
                slideInElemNav = $("#" + this.slideshowName + " > #slideshow_nav span:nth-child(" + slideIn + ")");
                slideOutElem = $("#" + this.slideshowName + " > ul > li:nth-child(" + this.currentSlide + ")");
                slideOuElemNav = $("#" + this.slideshowName + " > #slideshow_nav span:nth-child(" + this.currentSlide + ")");

                if(this.slideMethod==="slideHoriz"){

                    slideInElem.css({
                        "left" : slideInStartPos,
                        "display" : "block"
                    }).animate({
                        "left": 0
                    },this.speed, "linear");

                    slideOutElem.animate({
                        "left": slideOutEndPos
                    },this.speed, "linear");

                    slideInElemNav.addClass("active");
                    slideOuElemNav.removeClass("active");

                } else if(this.slideMethod==="fade"){

                    slideInElem.css({
                        "left" : 0,
                        "display" : "block",
                        "opacity" : 0,
                        "z-index" : 6
                    }).animate({
                        "opacity" : 1
                    },this.speed, "linear", function(){
                        slideOutElem.css({
                            "opacity" : 0
                        });
                    });

                    slideOutElem.css({
                        "z-index" : 5
                    });

                    slideInElemNav.addClass("active");
                    slideOuElemNav.removeClass("active");

                }


                this.currentSlide=slideIn;

            }
        };

        var slideshow = new Slideshow(
            this.attr("id"),
            settings.height,
            settings.numberOfSlides,
            settings.speed,
            settings.slideMethod,
            settings.auto,
            settings.autoDelay,
            settings.initialSlide
        );

        // call set slider initialise method
        slideshow.init();

        // control click
        this.find(".ctrl").click(function(){
            if ($("#" + slideshow.slideshowName + " > ul > li:animated").length) {
                return false;
            } else {
                slideshow.moveSlide($(this).attr("data-direction"));
                slideshow.auto = false;
            }
        });

        // nav click
        this.find(".nav_ctrl").click(function(){
            //alert('asd');
            if ($("#" + slideshow.slideshowName + " > ul > li:animated").length) {
                return false;
            } else {
                slideshow.moveSlide(parseInt($(this).attr("data-slide")));
                slideshow.auto = false;
            }
        });

        if(slideshow.auto){
            window.setInterval(function () {
                if(slideshow.auto){
                    slideshow.moveSlide("next");
                }
            }, slideshow.autoDelay);
        }

    }

}(jQuery));