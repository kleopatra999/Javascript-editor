
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
    output = 'toString: unexpected type: ' + typeof obj;
  }
  return console.log( output );
}

var editors = document.getElementsByClassName('editor');
var editorElement = editors[0];

if( editorElement ){
  editor = new Editor( editorElement );
}


