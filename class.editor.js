

// class.editor.js

function Editor( element ){
  this.selection = null;
  this.range = null;
  this.element = element;
  this.edition = false;
  this.contextualStatus = false;
  this.keyUpCallback = null;
  this.clickCallback = null;
  this.init();
}

Editor.prototype.init = function(){
  this.element.addEventListener('dblclick', this.toggleStatus.bind(this), false );
};

Editor.prototype.setStatus = function( status ){
  this.edition = status;
};

Editor.prototype.getStatus = function(){
  return this.edition;
};

Editor.prototype.addAttribute = function( att, value ){
  var node;
  if( this.element.hasAttribute( att ) ){
    node = this.element.getAttributeNode( att );
  } else {
    node = document.createAttribute( att );
  }
  node.value = value;
  this.element.setAttributeNode( node );
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

Editor.prototype.toggleContextual = function(){
  // Hide contextual
  this.contextualStatus = false;
  this.range = null;
  this.selection = null;
};

Editor.prototype.toggleEdition = function(){
  this.addAttribute( 'contenteditable', this.getStatus() );
  if( this.getStatus() ){
    this.addAttribute( 'class', 'editor edition' );
    // Add keyup event.
    this.keyUpCallback = this.factory( this, this.getSelection );
    this.element.addEventListener('mouseup', this.keyUpCallback, false );

    // Add click event.
    // this.clickCallback = this.factory( this, this.toggleContextual );
    // this.element.addEventListener('mouseup', this.toggleContextual, false );
    
  } else {
    this.addAttribute( 'class', 'editor' );
    // Remove keyup event.
    this.element.removeEventListener('mouseup', this.keyUpCallback, false );
    this.keyUpCallback = null;
    // Remove click event.
    //this.element.removeEventListener('mouseup', this.toggleContextual, false );
    //this.clickUpCallback = null;
  }
};

Editor.prototype.getSelection = function(){
  // https://developer.mozilla.org/en-US/docs/Web/API/Selection
  if ( window.getSelection ) {
    this.selection = window.getSelection();
  } else if ( document.selection ) {
    this.selection = document.selection.createRange();
  }

  if( this.selection && !this.selection.isCollapse ){
    // Display contextual
    this.setRange();
    //this.getRangePosition();
  }
};


Editor.prototype.setRange = function(){
  // https://developer.mozilla.org/en-US/docs/Web/API/range
  this.range = document.createRange();
  this.range.setStart( this.selection.anchorNode, this.selection.anchorOffset );
  this.range.setEnd( this.selection.focusNode, this.selection.focusOffset );
  return this.selection.addRange( this.range );
};

Editor.prototype.getRangePosition = function(){
  var rectList;
  rectList = this.range.getClientRects();
  return rectList.item( 0 );
};

