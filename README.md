# POC Angular lists app

POC Angular application that displays 3 pages with different lists using reusable selection list component.

Featuring:
- [Virtual scroll](https://material.angular.io/cdk/scrolling/overview) to handle large lists (and its [integration](https://github.com/ilinieja/angular-lists/tree/main/angular-lists-ui/src/app/shared/selection-list) with [Material selection list](https://material.angular.io/components/list/api))
- [Generic CRUD resource service](https://github.com/ilinieja/angular-lists/tree/main/angular-lists-ui/src/app/shared/resource)
- [Generic component with content projection](https://github.com/ilinieja/angular-lists/tree/main/angular-lists-ui/src/app/shared/selection-list)
- [UI data caching using interceptor](https://github.com/ilinieja/angular-lists/tree/main/angular-lists-ui/src/app/shared/cache)
- [Custom form control implementation](https://github.com/ilinieja/angular-lists/blob/main/angular-lists-ui/src/app/shared/selection-list/selection-list.component.ts) using [ControlValueAccessor](https://angular.io/api/forms/ControlValueAccessor)  
- [HTTP error interception](https://github.com/ilinieja/angular-lists/blob/main/angular-lists-ui/src/app/shared/errors/errors.interceptor.ts)
- [Custom global error handling](https://github.com/ilinieja/angular-lists/blob/main/angular-lists-ui/src/app/shared/errors/global-error-handler.ts)
- [Material theme customization](https://github.com/ilinieja/angular-lists/blob/main/angular-lists-ui/src/styles/mat-theme.scss)

## [Demo](https://angular-lists.vercel.app)

Both [UI](https://angular-lists.vercel.app) and mock [API](https://angular-lists-api.vercel.app) are deployed to Vercel.

## Local run

To run the Angular app on 4200 and JSON-server on 3000 (default ports) run (from this directory):

```bash
npx concurrently --kill-others "npx json-server data.json" "cd ./angular-lists-ui/ && npm i && npm start"
```

## UI
![Demo](https://i.ibb.co/JCNMzVZ/Screenshot-20230203-041055.png)

![Demo](https://i.ibb.co/v3xdNxC/Screenshot-20230203-041119.png)

![Demo](https://i.ibb.co/MCxnHsX/Screenshot-20230203-041142.png)
