Goal of this task is to create a picker for values in tree data structure. Data structure is available under endpoints:

* `/list` - returns flat array of all values. Each value has `name`, `id`, `isSelectable`, and `parentId`. `parentId` refers to parent of current node. Values at root level have `parentId: null`

* `/list/:id` - returns single item from values list by `id`

* `/details` - returns all fields available for given value under `/list` endpoint with addition of `description`.

* `/details/:id` - returns single item from details list by `id`


Application at main page should allow to navigate through values like shown on given wireframe (Wireframe.png).

* At beginning there is only shown left column with root level values.

* Values which contain children should be marked with arrow icon. Clicking on them should enable right panel which displays all child values and allow to select them in same way.

* Leaf values (with no children) should not have arrow.

* Selecting non-leaf value on right panel should display children values again, so list from right panel is displayed now on left and all new children are displayed on right.  

* All leaf values can redirect to details page by clicking on "Show details".

* Details page should display in neat way all values available under `/details/:id` endpoint for given value.

* Some of non-leaf values may have set value `isSelectable: true`. In that case these items should also have "Show details" link and redirect to details page.


Bonus features:

* Values at each level are sorted alphabetically

* At bottom of page there is displayed breadcrumb with current activated path of values. 

* If value has `isSelectable: false` it should not be available to display its details page at all, even by directly entering url in browser.

* Show spinner when there is waiting period for API response.

* Unit tests.


What we pay attention to:

* General structure of application, components, etc.

* Strict usage of Typescript. Using setting `compilerOptions -> strict: true` in `tsconfig.json` is a plus.

* Performance - component should run smoothly. Number of values to pick is around 10k, single node may have 1k children.

* API usage - calls should be limited to minimum.


We advice to use Angular Material as UI library to minimize effort in layout styling.

API with data should be run locally using json-server https://www.npmjs.com/package/json-server

Please fork the project to you own bitbucket, github, or other git hosting account, and give us access to the repository holding your solution.
