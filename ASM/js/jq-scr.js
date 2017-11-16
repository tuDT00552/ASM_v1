  /*Menu-toggle*/
    $("#wrapper").toggleClass("active");
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("active");
    });


    //hover menu

    $("#activeh").hover(function () {
        $(this).addClass("active");
        }, function(){
        $(this).removeClass("active");
    });
    $("#activep").hover(function () {
        $(this).addClass("active");
        }, function(){
        $(this).removeClass("active");
    });

    //drop menu user

    $(document).ready(function(){
    $(".dropdown").hover(            
        function() {
            $('.dropdown-menu', this).not('.in .dropdown-menu').stop( true, true ).slideDown("fast");
            $(this).toggleClass('open');        
        },
        function() {
            $('.dropdown-menu', this).not('.in .dropdown-menu').stop( true, true ).slideUp("fast");
            $(this).toggleClass('open');       
            }
        );
    });

    //end drrop

    //slide home

    $(document).ready(function() {
    $('#Carousel').carousel({
        interval: 1800
        })
    });

    //end slide

    // enter input search upload
        $('#inputsearchchup').keypress(function (e) {
          if (e.which == 13) {
            $('form#login').submit();
          }
        });
    //end

    // When the DOM is ready, run this function
    $(document).ready(function() {
      //Set the carousel options
      $('#myCarousel').carousel({
        interval: 3000,
      });
      $('#myCarousel1').carousel({
        interval: 3000,
      });
    });