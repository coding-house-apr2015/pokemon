/* global pokedex:true */
/* jshint camelcase:false */

'use strict';

$(document).ready(init);

function init(){
  $('#pokedex').on('click', '.pokemon:not(.filled)', getPokemon);
  $('#pokedex').on('click', '.filled', choosePokemon);
  $('#clear').click(clearPokemon);
  $('#fight').click(fight);
  drawPokedex();
}

function fight(){
  var $p1 = $('.player1');
  var $p2 = $('.player2');
  var p1 = {};
  var p2 = {};

  p1.attack = $('.player1').find('li:nth-child(1)').text().split(':')[1] * 1;
  p1.defense = $('.player1').find('li:nth-child(2)').text().split(':')[1] * 1;
  p1.exp = $('.player1').find('li:nth-child(3)').text().split(':')[1] * 1;
  p1.hp = $('.player1').find('li:nth-child(4)').text().split(':')[1] * 1;

  p2.attack = $('.player2').find('li:nth-child(1)').text().split(':')[1] * 1;
  p2.defense = $('.player2').find('li:nth-child(2)').text().split(':')[1] * 1;
  p2.exp = $('.player2').find('li:nth-child(3)').text().split(':')[1] * 1;
  p2.hp = $('.player2').find('li:nth-child(4)').text().split(':')[1] * 1;

  hit(p1, p2);
  hit(p2, p1);

  if(p1.hp <= 0){
    $p1.remove();
  }

  if(p2.hp <= 0){
    $p2.remove();
  }

  $('.player1').find('li:nth-child(4)').text('hp:' + p1.hp);
  $('.player2').find('li:nth-child(4)').text('hp:' + p2.hp);
}

function hit(p1, p2){
  var attack = p1.attack * (p1.exp / 100);
  var defense = p2.defense * (p2.exp / 100);
  var final = Math.abs(attack - defense);
  var random = Math.floor(Math.random() * final);
  p2.hp -= random;
}

function choosePokemon(){
  var $self = $(this);
  if($self.is('.player1')){
    $self.removeClass('player1').addClass('player2');
  }else if($self.is('.player2')){
    $self.removeClass('player2');
  }else{
    $self.addClass('player1');
  }
}

function clearPokemon(){
  $('.pokemon:not(.filled)').remove();
}

function getPokemon(){
  var $self = $(this);
  var domain = 'http://pokeapi.co/';
  var uri = $(this).data('uri');
  var url = domain + uri;
  $.getJSON(url, function(response){

    $self.addClass('filled');
    var $ul = $self.find('ul');
    var attributes = ['attack', 'defense', 'exp', 'hp'];
    var $lis = attributes.map(function(attribute){
      return '<li>' + attribute + ':' + response[attribute] + '</li>'
    });
    $ul.empty().append($lis);

    var spriteUrls = response.sprites.map(function(o){
      return domain + o.resource_uri;
    });

    spriteUrls.forEach(function(url){
      $.getJSON(url, function(response){

        $self.children('.image').css('background-image', 'url("'+domain + response.image+'")');
      });
    });
  });
}

function drawPokedex(){
  pokedex.pokemon.forEach(function(pokemon){
    var $outer = $('<div>');
    var $name = $('<div>');
    var $image = $('<div>');
    var $stats = $('<div>');

    $outer.addClass('pokemon');
    $outer.attr('data-uri', pokemon.resource_uri);
    $name.addClass('name');
    $name.text(pokemon.name);
    $image.addClass('image');
    $stats.addClass('stats');

    var $ul = $('<ul>');
    $stats.append($ul);

    $outer.append($name, $image, $stats);
    $('#pokedex').append($outer);
  });
}
