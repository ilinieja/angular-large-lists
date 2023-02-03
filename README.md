# Lists app

POC Angular application that displays 3 pages with different lists using reusable selection list component.

Featuring:
- [Virtual scroll](https://material.angular.io/cdk/scrolling/overview) to handle large lists (and its [integration](https://github.com/ilinieja/angular-lists/tree/main/angular-lists-ui/src/app/shared/selection-list) with [Material selection list](https://material.angular.io/components/list/api))
- [Generic CRUD resource service](https://github.com/ilinieja/angular-lists/tree/main/angular-lists-ui/src/app/shared/api)
- [Generic component with content projection](https://github.com/ilinieja/angular-lists/tree/main/angular-lists-ui/src/app/shared/selection-list)
- [UI data caching using interceptor](https://github.com/ilinieja/angular-lists/tree/main/angular-lists-ui/src/app/shared/api/cache)
- [Custom form control implementation](https://github.com/ilinieja/angular-lists/blob/main/angular-lists-ui/src/app/shared/selection-list/selection-list.component.ts) using [ControlValueAccessor](https://angular.io/api/forms/ControlValueAccessor)  
- [Material theme customization](https://github.com/ilinieja/angular-lists/blob/main/angular-lists-ui/src/theme.scss)

## [Demo](https://angular-lists.vercel.app)

Both [UI](https://angular-lists.vercel.app) and mock [API](https://angular-lists-api.vercel.app) are deployed to Vercel.

## Local run

To run the Angular app on 4200 and JSON-server on 3000 (default ports) run (from this directory):

```bash
npx concurrently --kill-others "npx json-server data.json" "cd ./angular-lists-ui/ && npm start"
```

## Implementation notes
### Data loading
Requirements state that lists can be huge - 10k and more elements.

Usually, I won't pull that amount of data to UI and stick with server-side pagination and infinite scroll or "Load more" control on UI.

But here I have to load and cache all data on list init because:
1. "Countries" and "Payments" lists require sorting/aggregation of raw data provided in the task (and the task is to verify UI skills, so I don't write server-side data processing). In order to sort and aggregate on UI the whole dataset has to be loaded first.

2. That's a good opportunity to play around and demonstrate some performance improvement practices. Virtual scroll, responses caching, OnPush for all components - all used to make lists snappy even with large datasets.

### Test coverage
Unit tests cover mainly the service layer of the UI app since that's the most reused part with most logic. Components are lighter in logic and change quicker, so I usually cover them after the service layer.

Here I'm limited in time, so I didn't test-cover components much. Just the service layer.


## UI
![Demo](https://i.ibb.co/JCNMzVZ/Screenshot-20230203-041055.png)

![Demo](https://i.ibb.co/v3xdNxC/Screenshot-20230203-041119.png)

![Demo](https://i.ibb.co/MCxnHsX/Screenshot-20230203-041142.png)

## Original task
Goal of this task is to create a reusable list component with three different types of data and items. Data structure is available in endpoints:

- `/users` - returns flat array of all users.

- `/payments` - returns flat array of all payments

- `/countries` - returns flat array of all countries

Application at main page should allow to navigate to three views `users` `payments` and `countries` and see three lists.

- Lists should be able to share common functionalities like selecting items, searching etc.

- Lists should be able to share common styles.

- Lists should be able to display different items for different data types.

- It should be possible to easily add new data type and create another list.

Bonus features:

- It should be possible to search item and filter list. In case of payments, we should be able to search by type, there's no need to search by specific payment fields.

- Add item details view with single list item.

  - `/users/:id` - returns single user
  - `/countries/:id` - returns single country

- Handle empty dataset.

- Show spinner when there is waiting period for API response.

- Some example unit tests.

What we pay attention to:

- General structure of application, components, etc.

- Strict usage of Typescript. Using setting `compilerOptions -> strict: true` in `tsconfig.json` is a plus.

- Performance - component should run smoothly. Number of values to pick is around 10k, single node may have 1k children.

- API usage - calls should be limited to minimum.

We advise to use Angular Material as UI library to minimize effort in layout styling. It does not have to be pixel perfect, wireframe is just a suggestion.

API with data should be run locally using json-server https://www.npmjs.com/package/json-server

Please fork the project to you own bitbucket, github, or other git hosting account, and give us access to the repository holding your solution.
