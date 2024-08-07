var controller = new ScrollMagic.Controller();


$(document).ready(function() {


    var elements = $('img, video');
    var totalElements = elements.length;
    var loadedElements = 0;
    
    function initPin () {
        var scene = new ScrollMagic.Scene({
            triggerElement: "#parent-pin", triggerHook: 'onLeave', duration: $("#parent-pin").height()-$(window).height()
        })
            .setPin("#baby-pin")
            // .addIndicators({name: "pin it"})
            .addTo(controller);


        var scene2 = new ScrollMagic.Scene({
            triggerElement: ".hero div", triggerHook: 'onLeave'
        })
            .setClassToggle("#top-navigation", "active")
            // .addIndicators({name: "navigation effect"})
            .addTo(controller);
    }

    if (totalElements === 0) {
        initPin()
        return;
    }

    elements.one('load loadeddata error', function() {
        loadedElements++;
        if (loadedElements === totalElements) {
            initPin()
        }
    }).each(function() {
        if (this.complete || this.readyState === 4) {
            $(this).trigger('load');
        }
    });

        
});