# angular-has-error

This AngularJS directive aims to simplify setting the `has-error` class of a form control based on its error state. It
also supports adding your standard HTML code required for displaying error messages.

## Install

```shell
bower install --save angular-has-error
```

Add a `<script>` to your `index.html`:

```html
<script src="/bower_components/angular-has-error/angular-has-error.js"></script>
```

Then add `hasError` as a dependency for your app:

```javascript
angular.module('myApp', ['hasError']);
```

## Usage

### Basic usage

```html
<div class="form-group" has-error="form.name">
  <label class="control-label" for="name">Name</label>
  <input id="name" name="name" type="text" class="form-control" ng-model="name" required>
</div>
```

### Ignoring errors

Sometimes you don't want to show certain validation errors, i.e. the 'required' error. In this case you can configure
the directive to ignore them:

```javascript
angular.module('myApp', ['hasError'])
  .config(function(hasErrorConfig) {
    angular.extend(hasErrorConfig, {
      ignore: ['required']
    });
  });
```

With this configuration, the `has-error` class will not be set if the control has only the `required` error, but the
control and form remain marked as invalid so you can still use the form state to e.g. disable the submit button.

### Configuring error messages

It is also possible to automate addition of the HTML code required for displaying error messages.

#### With ng-messages

Put all your `ng-message` elements in an HTML file then add its url to the configuration in the `templateUrl` property:

File `views/error-messages.html`:

```html
<div class="help-block" ng-message="email">Invalid email</div>
<div class="help-block" ng-message="number">Invalid number</div>
```

Configuration:

```javascript
angular.module('myApp', ['hasError'])
  .config(function(hasErrorConfig) {
    angular.extend(hasErrorConfig, {
      templateUrl: '\'views/error-messages.html\''
    });
  });
```

Note that the url is passed to `ng-include` so it has to be an expression.

#### Own HTML

Set the `template` configuration property to the HTML code to be appended. The `$error` of the form control is made
available in the scope in the variable `$error`.

## License

The MIT License (MIT)

Copyright (c) 2015 Allmas

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
