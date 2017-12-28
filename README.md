#This is an extension Of vue-json-tree-view to support "Annotated JSON".

JSON is pure data. Annotated JSON is a little extension that uses convention to add additional information into it.
Common usages include:
* comment
* hint for presentation (e.g. different colors for different sections)

Annotated JSON does not change tree structure, it modifies key in place instead. For example, if this is an original JSON:
{"k": "v"}

The annotated one may look like this:
{"@k(class='red', comment='example')": "v"}

And that is it. If you are building a parser yourself, annotated key always starts with '@' and is followed by a parentheses with HTML-style attributes inside.

This format is not governed by any committee. I just found it useful in many of my projects for keeping track of changes of a JSON document.

Below are the original README:

# Vue JSON Tree View

![a demonstration](https://raw.githubusercontent.com/arvidkahl/vue-json-tree-view/master/header.png)


## Demo and Blogpost

You can check out the [demo](https://jsfiddle.net/arvidkahl/kwo6vk9d/11/) on JSFiddle and read the Blogpost called [Building a JSON Tree View Component in Vue.js from Scratch in Six Steps](https://devblog.digimondo.io/building-a-json-tree-view-component-in-vue-js-from-scratch-in-six-steps-ce0c05c2fdd8#.dkwh4jo2m) that lead to the creation of this library.

##  Installation

Install the plugin with npm:
```shell
npm install --save vue-json-tree-view
```

Then, in your Application JavaScript, add:
```javascript
import TreeView from "vue-json-tree-view"
Vue.use(TreeView)
```

Done.

## Usage

Put the `tree-view` element into your  HTML where you want the Tree View to appear.
```html
<div>
  <tree-view :data="jsonSource" :options="{maxDepth: 3}"></tree-view>
</div>
```

## Props

#### `data`

The JSON to be displayed. Expects a valid JSON object.

#### `options`

The defaults are:
```
{
  maxDepth: 4,
  rootObjectKey: "root",
  modifiable: false
}
```
- maxDepth: The maximum number of levels of the JSON Tree that should be expanded by default. Expects an Integer from 0 to Infinity.
- rootObjectKey: the name of the Root Object, will default to `root`
- modifiable: To modify the json value.

## Event

#### updated json data
If `modifiable` is true and you want to take the updated json data, you must register event handler as `v-on:change-data=...`. Only one argument is passed that is updated data - `data`.
```html
<div>
  <tree-view :data="jsonSource" :options="{modifiable: true}" @change-data="onChangeData"></tree-view>
</div>

// in your vue code
  ...
  methods: {
    onChangeData: function(data) {
      console.log(JSON.stringify(data))
    }
  },
  ...

```


## Custom Styling

All leaves will have their type indicated as a CSS class, like `tree-view-item-value-string`. Supported types: String, Number, Function, Boolean and Null Values.

## Notes

Enjoy.

## Changelog

- 2.0.0: Moved prop based option into `options` object. Added CSS for leaf types. Support for raw values as data.
- 1.0.0: Initial Release
