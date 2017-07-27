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

<<<<<<< HEAD
        }
=======
        },
>>>>>>> b353d75e2ecf3cd2278534399c9c53bff589704f
        
        
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