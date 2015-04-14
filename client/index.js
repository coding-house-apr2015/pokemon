/* global pokedex:true */
/* jshint camelcase:false */

'use strict';

$(document).ready(init);

function init(){
  drawPokedex();
}

function drawPokedex(){
  pokedex.pokemon.forEach(function(pokemon){
    var $outer = $('<div>');
    var $inner = $('<div>');

    $outer.addClass('pokemon');
    $outer.attr('data-uri', pokemon.resource_uri);
    $inner.addClass('name');
    $inner.text(pokemon.name);

    $outer.append($inner);
    $('#pokedex').append($outer);
  });
}
