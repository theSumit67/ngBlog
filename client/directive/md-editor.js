angular
    .module('ngBlog')
    .directive('mdEditor', mdEditor);

// mdEditor.$inject = [''];
function mdEditor() {

    var directive = {
        bindToController: true,
        controller: mdEditorController,
        transclude: true,
        controllerAs: 'vm',
        link: link,
        restrict: 'A',
        scope: {

        },
        
        
    };
    return directive;
    
    function link(scope, el, attrs, ctrl) {
        simplemde = new SimpleMDE({ element: document.getElementById( attrs.id ) });
        console.log( el )
    }
}
/* @ngInject */
function mdEditorController () {
    
}