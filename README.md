yui3-hero-dissolve-mod
======================
this is a basic module that dissolves images using YUI3 event and transition modules


##mod usage
include YUI3 base from cdn and the module js itself.
The css is intentionally light. It should be styled to meet your needs
```
<link href="yui-hero-dissolve.css" rel="stylesheet"  type="text/css" />
<script src="http://yui.yahooapis.com/3.18.1/build/yui/yui-min.js"></script>
<script src="yui-hero-dissolve-module.js"></script>
```

###html requires only a UL with an id that matches the cfg:
```html
<ul id='heroWidget'></ul>
```

###set the configuration options- below is a sample

```javascript
  YUI().use('hero-dissolve', function (Y) {
     var cfg =  {
          id: "heroWidget",
          showSpeed: 8000, //millisec
          effectSpeed: 0.5, //sec
          slideDistance:  "-20px", //from left-should be able to take px or % can be negative
          items:[
            {                              
               heroImg: "http://placehold.it/900x600&text=hero1",
            },
            {
               heroUrl: "http://www.test2.com",
               heroUrlTarget: "_blank",
               heroImg: "http://placehold.it/900x600&text=hero2",
              /*optional presentation class*/
               presentationClass: "sample-class"
            },
            {
               heroImg: "http://placehold.it/900x600&text=hero3",
               presentationClass: "h1-abs",
               ctaHTML: "<h1>Welcome to our site.</h1>"                                  
             }
          ]
       };
     Y.HeroDissolve.init(cfg);

   });
```

