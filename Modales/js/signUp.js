$(document).ready(function () {
    $("#next1").click(function () {
        $("#form-cont").remove();
        $("fieldset").append(
            '<div id="form-cont2">'+
            '<h2 class="fs-title">Redes Sociales</h2>'+
            '<h3 class="fs-subtitle">Para comenzar puedes ingresar tus peliculas o series favoritas(opcional)</h3>'+
            '<input type="text" name="title-1" placeholder="Titulo 1" />'+
            '<input type="text" name="title-2" placeholder="Titulo 2" />'+
            '<input type="text" name="title-3" placeholder="Titulo 3" />'+
            '<input type="button" id="next2" name="next" class="action-button btn-md" value="Siguiente" />'+
            '</div>'
        );
        $("#2").addClass("active");

        $("#next2").click(function () {
            $("#form-cont2").remove();
            $("fieldset").append(
                '<div id="form-cont3">' +
                '<h2 class="fs-title">Datos Personales</h2>' +
                '<h3 class="fs-subtitle">Para terminar ingresa tus Datos personales</h3>' +
                '<input type="text" name="nombre" placeholder="Nombre"/>' +
                '<input type="text" name="apellido" placeholder="Apellido"/>' +
                '<input type="text" name="alias" placeholder="Alias"/>' +
                '<input type="submit" id="btn-submit" name="submit" class="submit action-button" value="Enviar"/>' +
                '</div>'
            );
            $("#3").addClass("active");

            $("#btn-submit").click(function () {
                $("#form-cont3").remove();
                $("#progressbar").remove();
                $("fieldset").append(
                    '<img class="success-img" src="img/success.png" alt="">'+
                    '<div id="form-cont4">' +
                    '<h1 class="success">¡Felicitaciones!</h1>' +
                    '<h3 class="success">¡Bienvenido a MovieSpace!</h3>' +
                    '</div>' +
                    '<input type="button" id="comenzar" name="comenzar" class="next action-button" value="Comenzar" />'
                );
            });
        });
    });
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
});
});
=======
});
>>>>>>> Stashed changes
=======
});
>>>>>>> Stashed changes
=======
});
>>>>>>> Stashed changes
