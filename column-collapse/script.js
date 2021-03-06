        //this script uses the width of the browser 
        //to alternate between layouts concerning
        //the use of "tiles" in left and right column sidebars
        //the tiles are added to a masonry container
        //and removed at different breakpoints

        //get width //straight javascript cause why not?
        function getWidth(){
            var width = window.innerWidth ||
                document.documentElement.clientWidth ||
                document.body.clientWidth;   
                return width;
        }//end function get width


        //global vars

        //our masonry container
        var $container;
        //every control mechanism needs good control flags
        //for the w < 1000 breakpoint
        var dvnonce = true;
        //for the w < 750 breakpoint
        var dvntwice = false;
        //for the rare occaision we go w < 750 to 750 < w < 1000
        var dvnthrice = false;
        //another rare occaision when we go 750 > w < 1000 to w > 1000
        var dvnfour = false;

        //the browser was resized! logic-time
        function resizedw(){
          $container = $('#col-secondary');
            // Haven't resized in 400ms!
            // Get the dimensions of the viewport
            var width = getWidth();
            //if less than 1000 and first breakpoint
            if(width <=1000 && dvnonce){
                 $('#col-main').append($container);
                 // initialize
                 $container.masonry({
                });
                //setting this false means we wont initialize again 
                dvnonce = false;
                //setting this true means we are ready for next BP
                dvntwice = true;
                //setting this now we know we are elligble to reverse it
                dvnfour = true;
                //make sure masonry looks good
                $container.masonry('reloadItems');
                $container.masonry();

            }//end if 1000


            //if width is < than 750 time to add left column
            if(width <= 750 && dvntwice){
              //if left column is nav, no need to masonry
               if(  $('#leftnav').length < 1 ){
                    //setting this false means we wont append again
                    dvntwice = false;
                    //setting this true lets us fix it 
                    dvnthrice = true;

                  //in case we reverse, lets label our appendees
                  var dawg = $('#col-tertiary').children();
                  $(dawg).addClass('terti');
                  $('#col-secondary').prepend(dawg).masonry('reloadItems');
                  $('#col-tertiary').html('');
                  $container.masonry('reloadItems');
                  $container.masonry();
               }//end if not nav
            }//end if <750



            //if width is 751 or bigger reverse little BP action
            if(width >= 751 &&dvnthrice){
              //unless it was a nav
            if(  $('#leftnav').length < 1 ){
              //undo masonry for each tile
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
                    }//end if has clas terti
                });//end each
                $container.masonry('reloadItems');
                $container.masonry();
            }//end if not left nav
                //reset our flags to proper control scheme
                dvnthrice = false;
                dvnonce = false;
                dvntwice = true;
                dvnfour = true;
               


            }//end if bigger than 751 again

            //very simple 750 to 1000 case
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

        //this refires masonry when all the images load
        //which causes masonry to recalculate the height
        $(window).load(function(){
            if(getWidth() <= 1000){
            $('#col-secondary').masonry();
            }
        });



