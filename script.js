
// script.js

function toStr( obj ){
  var output, arr, p;
  if( typeof obj === 'object' ){
    arr = [];
    for( p in obj ){
      arr.push( p + ': ' + obj[p] );
    }
    output = arr.join( "\n" );
  } else {
    output = 'toString: @param obj is not an object ( type: ' + typeof obj +')';
  }
  return output;
}

var editors = document.getElementsByClassName('editor');
var editorElement = editors[0];

if( editorElement ){
  editor = new Editor( editorElement );
}


