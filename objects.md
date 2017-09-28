# JLo's List of CSS Objects

CSS objects are classes that are designed to handle common design patterns. They don't include styling information as they're supposed to be used for laying out elements. As the [OOCSS Wiki](https://github.com/stubbornella/oocss/wiki#whats-a-css-object) states:

> Basically, a CSS “object” is a repeating visual pattern, that can be abstracted into an independent snippet of HTML, CSS, and possibly JavaScript. That object can then be reused throughout a site.

## The Objects

Here are a list of common design patterns and the CSS to make them work. They're all written in pure CSS to allow them to be translated into any pre-processor.

It's worth noting that the names of these objects are just how I refer to them. You may have heard of them as a different name.

There are a few ways of creating the objects below. I've chosen styles that strike a compromise between browser support and flexibility. If you think that a more modern CSS technique can create a more robust or easier to maintain/modify object then I encourage you to experiment with that.

A final point before I show these objects is that there is no grid system here. Although it's an excellent example of an object, they are complicated to create and other people have already done so. Loops don't exist in vanilla CSS which means grid systems are very long-winded to write. This is one of the few situations where pre-processors really improve CSS. Finally, grid systems will be redundant when [CSS grid](https://css-tricks.com/snippets/css/complete-guide-grid/) is supported in a larger market-share of browsers.


### Box

A box just squares off content. It removes the top margin from the first child and the bottom margin from the last child so keep the spacing around the content consistent.

The box object also has a "lip" which sits over the padding in the box, allowing us to create borders or backgrounds that stretch the full width.

```css
.o-box {
    padding: 0.5em;
}

.o-box > :first-child {
    margin-top: 0;
}

.o-box > :last-child {
    margin-bottom: 0;
}

.o-box__lip {
    margin-left: -0.5em;
    margin-right: -0.5em;
    padding-left: 0.5em;
    padding-right: 0.5em;
}
```

```html
<div class="o-box">
    <p>One</p>
    <p class="o-box__lip">Two (with lip)</p>
    <p>Three</p>
</div>
```

When modifying this object, make sure that the lip's `padding-left` and `padding-right` match the parent's `padding` and that the `margin-left` and `margin-right` of the lip are the negative value of that padding.

```css
/* pseudo-code */
.o-box {
    padding: N;
}

.o-box__lip {
    margin-left: -N;
    margin-right: -N;
    padding-left: N;
    padding-right: N;
}
```


### Centre

This is more of a collection of similar objects rather than a single, tweakable, one. The centre objects just centre the content, either vertically, horizontally or in both directions.

```css
.o-centre-h,
.o-centre-hv {
    display: flex;
    justify-content: center;
    width: 100%;
}

.o-centre-v,
.o-centre-hv {
    align-items: center;
    display: flex;
    height: 100%;
}
```

```html
<div class="o-centre-h">
    <p>One</p>
</div>

<div class="o-centre-v">
    <p>One</p>
</div>

<div class="o-centre-hv">
    <p>One</p>
</div>
```

This object can struggle when it has multiple children. A simple work-around is to wrap all the children in a single element, such as a `<div>`, so the element only has a single child.

```html
<div class="o-centre-hv">
    <div>
        <p>One</p>
        <p>Two</p>
        <p>Three</p>
    </div>
</div>
```


#### Centred

A slight variant of [Centre](#centre) is Centred. This object aligns itself rather than its children. There's also a "centred parent" element that contains the centred child.

```css
.o-centreParent {
    position: relative;
}

.o-centred-h,
.o-centred-hv {
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
}

.o-centred-v,
.o-centred-hv {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}

.o-centred-hv {
    transform: translate(-50%, -50%);
}
```

```html
<div class="o-centreParent">
    <p class="o-centre-h">One</p>
</div>

<div class="o-centreParent">
    <p class="o-centre-v">One</p>
</div>

<div class="o-centreParent">
    <p class="o-centre-hv">One</p>
</div>
```


### Clearfix

I rarely use this object anymore because [Pack](#pack) and [Waffle](#waffle) can achieve better results, but I've included the clearfix here for reference. Clearfix will correct a container so that it wraps around floated children.

```css
.o-clearfix::before,
.o-clearfix::after {
    content: "";
    display: table;
}

.o-clearfix::after {
    clear: both;
}
```

```html
<div class="o-clearfix">
    <div style="float:left;">Floated left</div>
    <div style="float:left;">Floated left</div>
    <div style="float:left;">Floated left</div>
</div>
```


### List Bare

The list bare object just removes the list styling from a list.

The `o-list-bare__item` class isn't always necessary, but I've found a few situations where whitespace can appear under a block-level child, such as a `<div>`.

```css
.o-list-bare {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.o-list-bare__item {
    display: block;
}
```

```html
<ul class="o-list-bare">
    <li class="o-list-bare__item">One</li>
    <li class="o-list-bare__item">Two</li>
    <li class="o-list-bare__item">Three</li>
</ul>
```


### Media

The media object lays text next to an image. Unlike [Pack](#pack), Media is designed for elements of different size. The idea is that the text fills all the space left over by the image. In this example, the text is also vertically aligned to the centre of the image but the image and text will appear to be aligned to the top if the text is taller than the image.

The most useful part of the media object is that the left and right parts are optional so you may have one, the other, or both. Just remove the element you don't need.

```css
.o-media {
    display: flex;
    flex-direction: row;
    width: 100%;
}

.o-media__left {
    align-self: flex-start;
    margin-right: 0.5em;
}

.o-media__right {
    align-self: flex-start;
    margin-left: 0.5em;
}

.o-media__body {
    align-self: center;
    flex-grow: 1;
}
```

```html
<div class="o-media">
    <div class="o-media__left">Pic 1</div>
    <div class="o-media__body">Text</div>
    <div class="o-media__right">Pic 2</div>
</div>
```


### Pack

The pack object lines elements next to each other horizontally while also giving some control over the spacing between the elements. Left margin of the first child and right margin of the last child are removed so that the elements touch the edge of the parent.

Pack can have any number of children. To vertically stack elements, use the [Stack](#stack) object.

```css
.o-pack {
    display: flex;
    flex-direction: row;
    width: 100%;
}

.o-pack__item {
    margin-left: 0.25em;
    margin-right: 0.25em;
}

.o-pack__item:first-child {
    margin-left: 0;
}

.o-pack__item:last-child {
    margin-right: 0;
}
```

```html
<div class="o-pack">
    <div class="o-pack__item">One</div>
    <div class="o-pack__item">Two</div>
    <div class="o-pack__item">Three</div>
    <!-- ... -->
</div>
```


### Ratio

As the name suggests, the ratio object keeps things at a set aspect ratio. It's really useful for videos or scalable logos.

```css
.o-ratio {
    display: block;
    padding-top: calc((9 / 16) * 100%);
    position: relative;
}

.o-ratio__content {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
}
```

```html
<div class="o-ratio">
    <div class="o-ratio__content">One</div>
</div>
```

There are 2 tricks with this object.

1. The `padding-top` is a percentage of the width ("consequent") divided by the height ("antecedent"). In this case, the aspect ratio is 16:9.
2. You can add a `padding-bottom` if you want to scale a video and the player. The `padding-top` will maintain the video's dimensions, `padding-bottom` can be set to the same height as the player UI.


### Stack

Used for vertically stacking elements, one on top of the other. Although most elements do this automatically, it can be very handy to have control over things like the element spacing. (Setting the spacing to 0 will have the items touching each other.)

The Stack object automatically removes the spacing from the bottom of its last child to keep the spacing consistent.

The Stack object doesn't set any `margin-top` so doesn't need to clear it from the `:first-child`. To horizontally pack items, use the [Pack](#pack) object.

```css
.o-stack {
    display: flex;
    flex-direction: column;
}

.o-stack__item {
    margin-bottom: 0.5em;
}

.o-stack__item:last-child {
    margin-bottom: 0;
}
```

```html
<div class="o-stack">
    <div class="o-stack__item">One</div>
    <div class="o-stack__item">Two</div>
    <div class="o-stack__item">Three</div>
    <!-- ... -->
</div>
```


### Waffle

Waffles lay out elements of the same width in a grid pattern. They create a consistent space between the elements but appear to remove the space around the elements out the outside, possibly allowing them to touch the edge of the container. This is a very useful object for laying out product thumbnails.

```css
.o-waffle {
    display: flex;
    flex-flow: row wrap;
    margin: -0.25em;
    width: calc(100% + 0.5em);
}

.o-waffle__item {
    margin: 0.25em;
    width: calc((100% / 4) - 0.5em);
}
```

```html
<div class="o-waffle">
    <div class="o-waffle__item">One</div>
    <div class="o-waffle__item">Two</div>
    <div class="o-waffle__item">Three</div>
    <!-- ... -->
</div>
```

The trick with this object is that the parent has a negative margin equivalent to the children's margin. The width of the parent is 100% plus the margin of both sides; the child's width is the column width (25% for 4 columns in this example) minus the horizontal margins. You _can_ write the child's width at `calc(25% - 0.5em)` but it can be easier to express the desired number of columns by including the actual number there. For example:

```css
.o-waffle__item {
    width: calc((100% / 3) - 0.5em);
    width: calc((100% / 4) - 0.5em);
    width: calc((100% / 8) - 0.5em);
    width: calc((100% / 12) - 0.5em);
}
/* vs */
.o-waffle__item {
    width: calc(33.33333333% - 0.5em);
    width: calc(25% - 0.5em);
    width: calc(12.5% - 0.5em);
    width: calc(8.33333333% - 0.5em);
}
```

If you want to adjust this object, make sure that the widths include both side margins and that the parent and child margins match.

```css
/* pseudo-code */
.o-waffle {
    margin: -Y -X;
    width: calc(100% + (X * 2));
}

.o-waffle__item {
    margin: Y X;
    width: calc((100% / C) - (X * 2));
}
/* If X and Y are the same amount they can be a single value. C for Columns. */
```

Because of the negative margins, this object can often look strange if things like borders are applied to it. As a result, it's often better to put this element inside an element with that sort of styling.

```html
<div class="product-wrapper">
    <div class="o-waffle">
        <div class="o-waffle__item">
            <!-- ... -->
        </div>
        <!-- ... -->
    </div>
</div>
```


## Browser Support

The most advanced part of this object is `display:flex` which does not work in browsers older than IE10. You should be able to use any/all of these objects in IE11 without any problems.


## The `o-` Namespace

The `o-` namespace on all the objects is an intentional thing. The idea is to give future developers as much information about the nature of the class as possible. In the case of an object, it warns the developer that adjusting that class may have far-reaching consequences. This can either mean that a bug fix here will fix all similar bugs throughout the site or it can mean that the "fix" here will break other pages. In the latter case, it would be safer to adjust the component or module class instead.

Harry Roberts [wrote an article](https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/) that explains more about the benefits of a namespace.


## Working with Objects

The idea of the objects is to form basic styles that can be re-used throughout a website or web page. When writing your style sheet, the objects should be fairly high up so that other classes can override their styles later on.

ITCSS example:
1. Settings
2. Tools
3. Generic
4. Elements
5. **Objects**
6. Components
7. Utilities

SMACSS example:
1. Base
2. **Layout**
3. Modules
4. State
5. Theme

With a CSS structure like this, you can adjust an object using a component or module.

```css
.c-products {
    margin: -10px;
    width: calc(100% + 20px);
}

.c-products__item {
    margin: 10px;
    width: calc((100% / 6) - 20px);
}
```

```html
<div class="o-waffle c-products">
    <div class="o-waffle__item c-products__item">
        <!-- ... -->
    </div>
    <!-- ... -->
</div>
```

I've been trying to keep the selector strength as low as possible with these objects as it's easier to override the styles further down the style sheet. There are stronger selectors within the object (`.o-box__item:first-child`, for example) which allow the `.o-box__item` class to have the margins adjusted while the existing selectors tweak the first and last children automatically. Components and modules can have stronger selectors if you don't fancy adding a class to every element, although I believe that can make maintaining the website harder in the long run.
