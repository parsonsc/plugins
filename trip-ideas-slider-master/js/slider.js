
(function($) {
    // init
    $(function () {
        var that = this,
            pathname = window.location.pathname;
            infoWindow();
            changeImg(pathname);
            addHero();

    });
    changeImg = function(pathname){// if url matches these are the variable that correspond to the url
        var xUrl = pathname.split( '/'),
            url = xUrl[xUrl.length-1],
            golf = ['images/1.jpg','description block','img decription', 'paul winterholter'],
            tripB = '2.jpeg',
            tripc = '3.jpeg';

        console.log(url);
        switch(url){
            case 'x.html':
                image(golf[0], golf[1], golf[2], golf[3]);
                return
            default:
                sliderPlugin();

        }

    },// This adds the image to the stage with all the text though an array
    image = function(imgUrl, desc, imgDes, imgCredit){
            $('li.image-slider-item').slice(1).addClass('singleImg').remove();
            $('li.image-slider-item').addClass('singleImg');
            $('.nav-con-holder').remove();
            $('.list-carousel .inner img').attr('src',imgUrl);// swap image
            $('.list-carousel .img-title h2').text(desc);
            $('.list-carousel .info_window .desc').text(imgDes);
            $('.list-carousel .info_window .credits').text(imgCredit);
      },

    sliderPlugin = function() {
        var that = this;
        // Using custom configuration
        $(".image-slider").carouFredSel({

            scroll : {
                items: 1,
                duration: 900,
                easing: 'swing',
                onBefore: $.proxy(that.onBefore, that),
                onAfter: $.proxy(that.onAfter, that)
            },
            prev: {
                button: '#slideshow_prev'
            },
            next: {
                button: '#slideshow_next'
            },
            width: '100%',
            items: {
                //width: 990,
                start: 1,
                visible: {
                    min: 3,
                    max: 6
                }
            }
        });

    },
    infoWindow = function(){

        $('.info_window').hide();
       // $('.img-title').hide();

    },
    addHero = function () {
        var heroItemL = $('.image-slider-item').length,
            heroItem = $('.image-slider-item'),
            hero = heroItemL > 1 ? '' : 'hero';

        heroItem.addClass(hero);

    },
    highlight = function (items) {
        items.find('img').eq(1).addClass('hero');
        return items;
    },

    unhighlight = function (items) {
        items.find('img').eq(1).removeClass('hero');
        return items;
    },
        info = function(){

    },

    onBefore = function (data) {

      this.unhighlight(data.items.old);
//        $('.image-slider').addClass('scrolling');
//        $('#slideshow_prev, #slideshow_next').fadeOut();
       $('.img-title, .info_window, #info_button').fadeOut();
       $('.image-slider').trigger('play');
        // FCV.log('onBefore', $('.image-slider'));
    },
    onAfter = function (data) {
        this.highlight(data.items.visible);
//        $('.image-slider').removeClass('scrolling');
        $('#slideshow_prev, #slideshow_next').fadeIn();
//        $('.image-slider').trigger('play');
//
            if (data.items.visible.length > 1) {
                $(data.items.visible).eq(1).find('.img-title, #info_button').fadeIn();
            }
            else {
                $(data.items.visible).eq(0).find('.img-title').fadeIn();
            }
    }

})(jQuery);