/* Folded by Daniel Sarracayo - Reusable accordions. */
function folded() {

  var r = this;
  this.numClicked = 0;
  this.resizeFlag = false;

  // You may pass an object that overrides any of these.
  this.settings = {
    aparent:"folded-wrap",
    maxOpen:1,
    atype:"stacked",
    openFirst:false,
    firstTab:0,
    hasCarets:false,
    foldSpeed:250,

    togC:"folded-toggle",
    togCActive:"folded-toggle-active",

    tabWrap:"folded-tab-wrap",
    tabC:"folded-tab",
    tabCActive:"folded-tab-active",

    scattBttn:"scatt-bttn",
    scattBttnID:"scatt-bttn-unique",
    scattBttnActive:"scatt-bttn-active",
    scattContent:"scatt-content",

    tabContentWrap:"folded-tab-content-wrap",
    foldContents:"folded-content"
  };

  this.s = r.settings;

  this.init = function(news) {
    // Pull in custom s.
    for (var i in r.s) {
      if (news[i]) r.s[i] = news[i];
    }
    // Initiate the setup.
    r.setup();
  };

  this.setup = function() {
    // Setup
    if($('.'+r.s.aparent).length > 0 || r.s.atype === "scattered"){
      r.ftype[r.s.atype].init();
    } else {
      console.warn("Folded: aparent not found - \'"+r.s.aparent+"\'");
    }
  };

  this.ftype = {
    stacked : {
      init : function() {
        // Structurally change.
        this.construct();
      },

      construct : function() {
        $('.'+r.s.aparent).children('.'+r.s.foldContents).hide();
        if(r.s.openFirst === true) r.funcs.openFirst();
        this.assign();
      },

      assign : function() {
        // Event handler.
        $('.'+r.s.aparent).children('.'+r.s.togC).click(function(){
          r.track.orderIncre(this);
          if($(this).hasClass(r.s.togCActive)) {
            $(this).removeClass(r.s.togCActive).next().slideToggle(r.s.foldSpeed);
          } else {
            if(r.funcs.numActive() < r.s.maxOpen) {
              $(this).addClass(r.s.togCActive).next().slideToggle(r.s.foldSpeed);
            } else {
              r.track.closeFirst();
              $(this).addClass(r.s.togCActive).next().slideToggle(r.s.foldSpeed);
            }
          }
        });
      }
    },

    tabbed : {
      init : function() {
        // Structurally change.
        this.construct();
      },

      construct : function() {
        $('.'+r.s.aparent).children('.'+r.s.tabContentWrap).children('.'+r.s.foldContents).hide();
        if(r.s.firstTab != 0) {
          $('.'+r.s.aparent).children('.'+r.s.tabWrap).children('.'+r.s.tabC).eq(r.s.firstTab - 1).addClass(r.s.tabCActive);
          var contentId = $('.'+r.s.aparent).children('.'+r.s.tabWrap).children('.'+r.s.tabC).eq(r.s.firstTab - 1).data('content');
          $('#'+contentId).show();
        } else {
          $('.'+r.s.aparent).children('.'+r.s.tabWrap).children('.'+r.s.tabC).first().addClass(r.s.tabCActive);
          $('.'+r.s.aparent).children('.'+r.s.tabContentWrap).children('.'+r.s.foldContents).first().show();
        }
        this.assign();
      },

      assign : function() {
        $('.'+r.s.aparent).children('.'+r.s.tabWrap).children('.'+r.s.tabC).click(function(){
          if($(this).hasClass('.'+r.s.tabCActive)) {
            // Is active, do nothing.
          } else {
            // Is not, open this and close the other.
            var toClose = $('.'+r.s.aparent).children('.'+r.s.tabWrap).children('.'+r.s.tabCActive).data('content');
            $('.'+r.s.aparent).children('.'+r.s.tabContentWrap).children('#'+toClose).hide();
            $('.'+r.s.aparent).children('.'+r.s.tabWrap).children('.'+r.s.tabCActive).removeClass(r.s.tabCActive);
            $(this).addClass(r.s.tabCActive);
            var toOpen = $(this).data('content');
            $('.'+r.s.aparent).children('.'+r.s.tabContentWrap).children('#'+toOpen).show();
          }
        });
      }
    },

    buttons : {
      init : function() {
        // Structurally change.
        this.construct();
      },

      construct : function() {
        $('.'+r.s.aparent).children('.'+r.s.tabContentWrap).children('.'+r.s.foldContents).hide();
        if(r.s.firstTab != 0) $('.'+r.s.aparent).children('.'+r.s.tabWrap).children('.'+r.s.tabC).eq(r.s.firstTab - 1).addClass(r.s.tabCActive).slideToggle(r.s.foldSpeed);
        // Add click handler.
        this.assign();
      },

      assign : function() {
        $('.'+r.s.aparent).children('.'+r.s.tabWrap).children('.'+r.s.tabC).click(function(){
          // Check if there are any active tabs.
          if ($(this).hasClass(r.s.tabCActive)) {
            // Close it.
            var contentId = $(this).data('content');
            $('#'+contentId).slideToggle(r.s.foldSpeed);
            $(this).removeClass(r.s.tabCActive);
          } else {
            // Close any active.
            var contentId = $('.'+r.s.tabCActive).eq(0).data('content');
            $('#'+contentId).slideToggle(r.s.foldSpeed);
            $('.'+r.s.tabCActive).eq(0).removeClass(r.s.tabCActive);
            // Open the clicked.
            $(this).addClass(r.s.tabCActive);
            var contentToOpen = $(this).data('content');
            $('#'+contentToOpen).slideToggle(r.s.foldSpeed);
          }
        });
      }
    },

    scattered : {
      init : function() {
        // Structurally change.
        this.construct();
      },

      construct : function() {
        if(r.s.openFirst === false){
          $('#'+$('#'+r.s.scattBttnID).data('content')).hide();
        } else if(r.s.openFirst === true) {
          $('#'+r.s.scattBttnID).addClass(r.s.scattBttnActive);
        }
        // Add click handler.
        this.assign();
      },

      assign : function() {
        $('#'+r.s.scattBttn).click(function(){
          // Check if there are any active tabs.
          if ($(this).hasClass(r.s.scattBttnActive)) {
            // Close it.
            var contentId = $(this).data('content');
            $('#'+contentId).slideToggle(r.s.foldSpeed);
            $(this).removeClass(r.s.scattBttnActive);
          } else {
            // Open the clicked.
            $(this).addClass(r.s.scattBttnActive);
            var contentToOpen = $(this).data('content');
            if($('#'+contentToOpen).is(':Hidden'))$('#'+contentToOpen).slideToggle(r.s.foldSpeed);
          }
        });
      }
    }

  };

  this.funcs = {
    closeAll : function() {
      $('.'+r.s.aparent).children('.'+r.s.foldContents).each(function() {
        $(this).slideToggle(r.s.foldSpeed);
      });
      $('.'+r.s.aparent).children('.'+r.s.togC).removeClass(r.s.togCActive);
    },

    closeActive : function() {
      $('.'+r.s.aparent).children('.'+r.s.togCActive).next().each(function() {
        $(this).slideToggle(r.s.foldSpeed);
      });
      $('.'+r.s.aparent).children('.'+r.s.togCActive).removeClass(r.s.togCActive);
    },

    openFirst : function() {
      $('.'+r.s.aparent).children('.'+r.s.togCActive).first().addClass(r.s.togCActive).next().slideToggle(r.s.foldSpeed);
    },

    numActive : function() {
      return $('.'+r.s.aparent).children('.'+r.s.togCActive).length;
    }

  };

  this.track = {
    orderIncre : function(that){
      // Adds a data attribute to the specified and plusses the numClicked.
      $(that).data('order', r.numClicked);
      r.numClicked++;
    },

    closeFirst : function(){
      // Closes the first that is open and not
      var oneToClose = (+r.numClicked) - (r.s.maxOpen + 1);
      for(var i = 0;i < $('.'+r.s.togCActive).length;i++) {
        if($('.'+r.s.aparent).children('.'+r.s.togCActive).eq(i).data('order') == oneToClose) $('.'+r.s.aparent).children('.'+r.s.togCActive).eq(i).removeClass(r.s.togCActive).next().slideToggle(r.s.foldSpeed);
      }
    }
  };

};
/* End of Folded object */
