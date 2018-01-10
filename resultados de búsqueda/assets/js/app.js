$(document).ready(function () {
    //Función para activar selección de filtros de búsqueda
    $(".btn-round").click(function () {
        //cambia colores de los filtros
        $(this).toggleClass("tag-red-active");
    });

    //Función para aguardar pelis a la lista
    $(".btn-saveM").click(function () {
        //cambia colores del boton archivar
        $(this).toggleClass("btn-saveM-active");
    });

});