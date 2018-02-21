var vista = null;
var libroVista = {

    init:function () {
        vista.referenciarObjetos();
        vista.referenciarControles();
        vista.asignarEventos();
    },

    referenciarObjetos:function(){
        vista.control = libroControl;
        vista.modelo = libroModelo;
        var x = 'dsads';
        console.log(x);

    },

    asignarEventos:function(){

    },

};
vista = libroVista;
vista.init();