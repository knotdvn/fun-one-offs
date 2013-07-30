 //get width
        function getWidth(){
            var width = window.innerWidth ||
                document.documentElement.clientWidth ||
                document.body.clientWidth;
                return width;
        }//end function get width


        //global vars
        var $container;
        //for the 1000 column
        var dvnonce = true;
        //for the 750 column
        var dvntwice = false;
        //for the rare occaision we go big to small
        var dvnthrice = false;
        //another rare occaision
        var dvnfour = false;

        function resizedw(){
            // Haven't resized in 400ms!
            // Get the dimensions of the viewport
            var width = getWidth();
            //var height = $(window).height();
            //if less than 1000 and first
            if(width <=1000 && dvnonce){
                 $container = $('#col-secondary');
                 $('#col-main').append($container);
                 // initialize
                 $container.masonry({
                });
                //setting this false means we wont initialize again
                dvnonce = false;
                //setting this true means we will append
                dvntwice = true;
                //setting this lets us unappend
                dvnfour = true;
                $container.masonry('reloadItems');
                $container.masonry();

            }//end if 1000


            //if width is < than 750 time to masonry
            if(width <= 750 && dvntwice){
               if( $('#col-tertiary').not(':has(#leftnav)') ){
                    
                    //setting this false means we wont append again
                    dvntwice = false;
                    //setting this true lets us fix it
                    dvnthrice = true;

                   var dawg = $('#col-tertiary').children();
                   $(dawg).addClass('terti');
                   $('#col-secondary').prepend(dawg).masonry('reloadItems');
                    $('#col-tertiary').html('');
                  $container.masonry('reloadItems');
                  $container.masonry();


                    
               }//end if not nav
            }//end if <750



            //if width is 751 or bigger
            if(width >= 751 &&dvnthrice){
                $('#col-secondary').children().each(function(){
                    if($(this).hasClass('terti')){
                        $(this).css(
                            {position:'relative',
                             left: '0px',
                             top: '0px',
                             right: '0px',
                              bottom: '0px',
                              float:'left',
                              transition: 'none',
                              transform: 'none'});
                        $('#col-tertiary').append($(this));
                        
                    }
                });

                dvnthrice = false;
                dvnonce = false;
                dvntwice = true;
                dvnfour = true;
                $container.masonry('reloadItems');
                  $container.masonry();


            }//end if bigger than 751 again

            //if width is 751 or bigger
            if(width >= 1001 &&dvnfour){
                $('#maincontainer').append($container);
                dvnfour = false;
                dvnonce = true;
                dvntwice = false;
                dvnthrice = false;
            }//end if big again
             
        }//end resize function

        //this function only fires our app logic
        //400ms after the last resize event
        //prevents over-firing
        var doit;
        $(window).resize(function(){
          clearTimeout(doit);
          doit = setTimeout(resizedw, 400);
        });//end timeout check

        $(window).load(function(){
            if(getWidth() <= 1000){
            $('#col-secondary').masonry();
            }
        });

