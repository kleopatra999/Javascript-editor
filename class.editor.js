

// class.editor.js

function Editor( element ){
  this.storedSelection = {};
  this.selection = null;
  this.range = null;
  this.element = element;
  this.status = false;
  this.init();
}

Editor.prototype.init = function(){
  this.element.addEventListener('dblclick', this.toggleStatus.bind(this), false );
};

Editor.prototype.setStatus = function( status ){
  this.status = status;
};

Editor.prototype.getStatus = function(){
  return this.status;
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

Editor.prototype.toggleEdition = function(){
  this.addAttribute( 'contentEditable', this.getStatus() );
  if( this.getStatus() ){
    this.addAttribute( 'class', 'editor edition' );
    this.element.addEventListener('mouseup', this.getSelection, false );
  } else {
    this.addAttribute( 'class', 'editor' );
    this.element.removeEventListener('mouseup', this.getSelection, false );
  }
};

Editor.prototype.getSelection = function(){
  // https://developer.mozilla.org/en-US/docs/Web/API/Selection
  var selection;
  if ( window.getSelection ) {
    selection = window.getSelection();
  } else if ( document.selection ) {
    selection = document.selection.createRange();
  }
  this.storedSelection = {
    'isCollapsed': selection.isCollapsed,
    'anchorNode': selection.anchorNode,
    'anchorOffset': selection.anchorOffset,
    'focusNode': selection.focusNode,
    'focusOffset': selection.focusOffset
  };
  toStr( this.storedSelection );
};

Editor.prototype.setRange = function(){
  // https://developer.mozilla.org/en-US/docs/Web/API/range
  this.selection = null;
  this.selection = window.getSelection();
  this.selection.removeAllRanges();
  this.range = document.createRange();
  this.range.setStart( this.storedSelection.anchorNode, this.storedSelection.anchorOffset );
  this.range.setEnd( this.storedSelection.focusNode, this.storedSelection.focusOffset );
  return this.selection.addRange( this.range );
};


