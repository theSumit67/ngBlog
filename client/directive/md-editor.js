angular
    .module('ngBlog')
    .directive('mdEditor', mdEditor);

// mdEditor.$inject = [''];
function mdEditor() {

    var directive = {
        bindToController: true,
        controller: function mdEditorController () { },
        transclude: false,
        controllerAs: 'mdEC',
        link: link,
        restrict: 'E',
        template: `<textarea></textarea>`,
        replace: true,
        scope: {
            api: '='
        }
    }
    
    return directive;
    
    function link(scope, el, attrs, ctrl) {
        
        var simplemde = new SimpleMDE({ element: document.getElementById( attrs.id ) });

        ctrl.api = ctrl.api || {};
        ctrl.api.getContent = function getContent() {
            return simplemde.codemirror.getValue();
        }
        ctrl.api.setContent = function setContent(_content) {
            simplemde.codemirror.setValue(_content);
        }
        
    };

}