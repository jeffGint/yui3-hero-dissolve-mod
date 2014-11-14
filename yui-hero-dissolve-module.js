YUI.add('hero-dissolve', function (Y) {
 Y.HeroDissolve = {
	  init: function(config) {
		 this.config = config;
		 this.itemsArry = config.items;
		 this.containerElem = Y.one("#"+config.id);
		 this.curZIndex = 1;
		 this.curIndex = 0;
		 this.showSpeed =  config.showSpeed  ?  config.showSpeed : 7000;
		 this.effectSpeed = config.effectSpeed ? config.effectSpeed : 1.0;
		 this.slideDistance = config.slideDistance ? config.slideDistance :  "0";

		 this.assemble(config);
		 this.setup();
		 this.start();
	  },
	  assemble: function(config) {
		  for(var i=0; i <  this.itemsArry.length; i++) {
			  var newElement= document.createElement('li');

			  if(i > 0){
				 /*beyond 1st li, hide all list items initially*/             
				 newElement.setAttribute("class" , this.itemsArry[i].presentationClass ? this.itemsArry[i].presentationClass + " dispNone" : "dispNone");                                                  
			  } else {
				 newElement.setAttribute("class" , this.itemsArry[i].presentationClass ? this.itemsArry[i].presentationClass  : "");
			  }
			  /*wrap image with anchor if url exists*/
			  if(this.itemsArry[i].heroUrl) {
				  var heroUrlTarget = this.itemsArry[i].heroUrlTarget ? this.itemsArry[i].heroUrlTarget : "";
				  newElement.innerHTML = "<a class='heroUrl' target='"+ heroUrlTarget  +"' href='"+this.itemsArry[i].heroUrl+"'><img class='heroImg' src='"+ this.itemsArry[i].heroImg +"'/></a>";
			  } else {
				  newElement.innerHTML = "<img class='heroImg' src='"+ this.itemsArry[i].heroImg +"'/>";
			  }

			  if(this.itemsArry[i].ctaHTML){
				 /*create standard or custom cta */
					 newElement.innerHTML += this.itemsArry[i].ctaHTML;                         
			  }
			  this.containerElem.appendChild(newElement);

		  }
	  },

	  setup: function(){
		  this.liElems = this.containerElem.all("li");
		  this.liElems.setStyles({opacity: 0.0, left: this.slideDistance});
		  this.liElems.item(0).setStyles({opacity: 1, left: "0%", zIndex: 1});
		  this.liElems.removeClass("dispNone");
	  },

	  start: function(){
		  var self = this;
		  window.setInterval(function(){self.dissolve()}, self.showSpeed);
	  },
  
	  dissolve: function(){
		  this.curZIndex++;
		  this.curIndex++;
		  if(this.curIndex == this.liElems.size()){ //hit the end, reset
			  this.curIndex  = 0;
		  }
		  var self = this;

		  //fade previous index
		  if(self.curIndex == 0){ //for first elem fade out last elem
			  self.liElems.item(self.liElems.size() -1).transition({opacity: 0.0, left: 0, duration: self.effectSpeed});
		  } else { //fade out prev elem
			  self.liElems.item(self.curIndex - 1).transition({opacity: 0.0, left: 0, duration: self.effectSpeed});
		  }

		  //transition next index
		  this.liElems.item(this.curIndex).setStyles({zIndex: this.curZIndex, left: this.slideDistance});
		  this.liElems.item(this.curIndex).transition({ opacity: 1.0, left: 0, duration:  self.effectSpeed}, function (){});
	  }
	};
}, '0.0.1', {
    requires: ['node', 'event', 'transition']
});