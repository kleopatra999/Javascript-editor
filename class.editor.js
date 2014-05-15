

// class.editor.js

function Editor( element ){
  this.selection = null;
  this.range = null;
  this.element = element;
  this.elementWrapper = null;
  this.edition = false;
  this.contextualStatus = false;
  this.keyUpCallback = null;
  this.clickCallback = null;
  this.init();
}

Editor.prototype.init = function(){
  var el;
  el = this.element.querySelector('.editor-wrapper');
  if( el ){
    this.elementWrapper = el;
    this.element.addEventListener('dblclick', this.toggleStatus.bind(this), false );

    this.getEditorPosition();
  }
};

Editor.prototype.setStatus = function( status ){
  this.edition = status;
};

Editor.prototype.getStatus = function(){
  return this.edition;
};

Editor.prototype.addAttribute = function( element, att, value ){
  var node;
  if( element.hasAttribute( att ) ){
    node = element.getAttributeNode( att );
  } else {
    node = document.createAttribute( att );
  }
  node.value = value;
  element.setAttributeNode( node );
};

Editor.prototype.toggleStatus = function(){
  var status = this.getStatus() ? false : true;
  this.setStatus( status );
  this.toggleEdition();
};

Editor.prototype.factory = function( obj, callback ){
  var fct = function(){
    callback.apply( obj, arguments);
  };
  return fct; 
};

/*Editor.prototype.toggleContextual = function(){
  // Hide contextual
  this.contextualStatus = false;
  this.range = null;
  this.selection = null;
};*/

Editor.prototype.toggleEdition = function(){
  this.addAttribute( this.elementWrapper, 'contenteditable', this.getStatus() );
  if( this.getStatus() ){
    this.addAttribute( this.elementWrapper, 'class', 'editor-wrapper edition' );
    // Add keyup event.
    this.keyUpCallback = this.factory( this, this.getSelection );
    this.element.addEventListener('mouseup', this.keyUpCallback, false );

  } else {
    this.addAttribute( this.elementWrapper, 'class', 'editor-wrapper' );
    // Remove keyup event.
    this.element.removeEventListener('mouseup', this.keyUpCallback, false );
    this.keyUpCallback = null;
    
  }

};

Editor.prototype.getSelection = function(){

  if ( window.getSelection ) {
    this.selection = window.getSelection();
  } else if ( document.selection ) {
    this.selection = document.selection.createRange();
  }

  if( this.selection && !this.selection.isCollapse ){
    // Display contextual ??
    this.setRange();
    this.getRangePosition();
  }

};

Editor.prototype.setRange = function(){
  this.range = document.createRange();
  this.range.setStart( this.selection.anchorNode, this.selection.anchorOffset );
  this.range.setEnd( this.selection.focusNode, this.selection.focusOffset );
  return this.selection.addRange( this.range );
};

Editor.prototype.getEditorPosition = function(){
  return {
    'x': this.element.offsetLeft || 0,
    'y': this.element.offsetTop || 0,
    'w': this.offsetWidth || 0,
    'h': this.offsetHeight || 0
  };
};

Editor.prototype.getRangePosition = function(){

  var rectList,
      res = {},
      x = [],
      y = [],
      w = [];

  rectList = this.range.getClientRects();
  for( var i=0; i < rectList.length; i++ ){
    x.push( rectList.item( i ).left );
    y.push( rectList.item( i ).top );
    w.push( rectList.item( i ).width );
  }

  x = arraySort( x );
  y = arraySort( y );
  w = arraySort( w );

  return {
    'top': y[0] || 0,
    'left': x[0] || 0,
    'width': w[(w.length-1)] || 0
  };

};

