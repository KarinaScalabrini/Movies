
const region = "BR";
const language = "pt-BR";
const api_key = "3388b3e3f87c5b6b0d1be607cd4a04d8";
const api = 'https://api.themoviedb.org/3/search/movie/?api_key=';
const urlImg = "https://image.tmdb.org/t/p/original/" ;
const listPopular = "https://api.themoviedb.org/3/movie/popular?";
const emBreve = "https://api.themoviedb.org/3/movie/upcoming?";



// modal de login
const fazerLogin = () => {
    $('.divnone').css("display","flex");
    $('#login').hide();
};
// função de entrar no formulário


const viewMovie = (data, section) => {
    
    let populateSection = section;
    let resultado = data.results;

    if(populateSection == ".section1"){
        $(resultado).each(function(el, film){  
   
            $('body').find('.section1').append('<article class="cartazFront"><img class="front" src="' + urlImg + film.poster_path +'"></article>');   
          })
          return
    }if (populateSection == ".section2"){
        $(resultado).each(function(el, film){  
   
            $('body').find('.section2').append('<article class="cartazFront"><img class="front" src="' + urlImg + film.poster_path +'"></article>');   
          })
          return
    } if(populateSection == ".sectionPesquisa"){
        $(resultado).each(function(el, film){  
   
            $('body').find('.sectionPesquisa').append('<article class="cartazFront"><img class="front" src="' + urlImg + film.poster_path +'"></article>');   
          })
          return
    }


}

 async function listar(url, section) { 

    let response = await fetch(url + "api_key=" + api_key + "&language=" + language + "-" + region + "&page=1")
    let result = await response.json();

    switch (section){
        case "emBreve" :
            viewMovie(result , ".section2");
            break;
        case "listPopular" :
            viewMovie(result , ".section1");    
            break;
    }          
}
     

// pesquisar filme por nome
// função pesquisa o filme por nome e retorna o array com ids e atributos. 

async function pesquisarFilme(filmePesquisa) { 

    let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=3388b3e3f87c5b6b0d1be607cd4a04d8&query=${filmePesquisa}&page=1`);
    let result = await response.json();
    viewMovie(result , '.sectionPesquisa');
}

   
// falta limpar a pesquisa parar realizar outra

$(function () {

    listar(emBreve, "emBreve");
    listar(listPopular, "listPopular");

    $('.btnLogin').on('click', function(e){
        e.preventDefault();
        const usuario = $('#user').val();
        localStorage.setItem("user", usuario);
        var user = localStorage.getItem("user");
        
        $('.loginForm').find('form').remove();
        $('.loginForm').html('<span class="textForm"> Bem-vindo de volta <span class="textForm2">'+ user + '</span></span>');
        $('.loginForm').addClass('loginFrame');
        setTimeout(function(){
            $('.divnone').hide();
        }, 2000);  
    });

    $('#pesquisarTittle').on('click', function(){
        $('.sectionPesquisa').find('article').remove();
        $('.sectionPesquisa').show();

        let filmePesquisa =  $('#title').val();
        $('.container').removeClass('d-none');
        pesquisarFilme(filmePesquisa);
    });

    $("#search").on('click', function (){

        $(this).remove();
        $("#pesquisa").css("display", "flex");
    });

    $('#login').on('click', function(){
       
        fazerLogin();
    });
   

});
