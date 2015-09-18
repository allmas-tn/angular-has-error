(function() {
  'use strict';

  angular
    .module('hasError', [
      'ngMessages'
    ])
    .constant('hasErrorConfig', {})
    .directive('hasError', hasError);

  var config;
  var urlTemplate = '<div class="has-error-messages" ng-include="$url" ng-messages="$error"></div>';

  function hasError(hasErrorConfig) {
    config = angular.extend({
      ignore: [],
      template: null,
      templateUrl: null
    }, hasErrorConfig);

    return {
      scope: true,
      compile: compile
    };
  }

  function compile(tElement, tAttrs) {
    if (tAttrs.hasError) {
      var $error = tAttrs.hasError + '.$error';
      var html = null;

      if (config.template)
        html = config.template.replace('$error', $error);
      else if (config.templateUrl)
        html = urlTemplate.replace('$url', config.templateUrl);

      if (html)
        tElement.append($(html));
    }

    return link;
  }

  function link(scope, iElement, iAttrs) {
    if (iAttrs.hasError) {
      var $error = iAttrs.hasError + '.$error';

      scope.$watch($error, function(model) {
        scope.$error = model;

        if (model) {
          for (var error in model) {
            if (model.hasOwnProperty(error) && config.ignore.indexOf(error) < 0) {
              iElement.addClass('has-error');
              return;
            }
          }
        }

        iElement.removeClass('has-error');
      }, true);
    }
  }
})();
