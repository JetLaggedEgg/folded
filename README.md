# folded
A javascript 'class' that allows you to create groups of accordions.

### Introduction

folded is a javascript library that allows you to instatiate an object to deal with setting up accordions.

**notes:** 
* This currently uses jQuery 1.2.1 although I would like to build a non-jQuery version one day.
* I will be adding more information to the page every day.

### Setup

In order to create a new accordion family you must instantiate a new `folded` object, this can be done like so.

    var accordionFamily = new folded;

This creates a new object. The init function in this object is used to setup the accordions - call it like so:

    accordionFamily.init();

This does nothing yet, unless you use the default classes for the default stacked accordions. I plan to add complete customisability to this library but for now there is this - you may feed the init function an object with settings you wish, this is how you would call init instead.

    accordionFamily.init({
        aparent: "laptop-details",
        atype: "tabbed"
    });

In this example folded will look for an element in the HTML that has the `aparent` class and then setup a tabbed content system.

### Plans

- Add many more variants of accordions and make the types already implemented work better.
- Clean the code and make if more efficient.
