var sectionIn = 'home' /* Variable para saber en que pagina nos encontramos */
window.addEventListener('load',load); /* Evento de carga al cargar la pagina */
function load() {
        loadHome(); /* Cargar la pagina home al entrar */
    $('.homeLink').addClass('selected') /* Cambiar de color al link donde estemos */
    $('.homeLink').click(function(event){ /* Carga la pagina home al clickear home */
        event.preventDefault();
        loadHome();
        highlightLink('.homeLink');
    })
    $('.portfolioLink').click(function(event){ /* Cargar la pagina del portafolio */
        event.preventDefault();
        loadPortfolio();
        highlightLink('.portfolioLink');
    })
    $('.solicitudLink').click(function(event){ /* Cargar la pagina de Solicitud de presupuesto */
        event.preventDefault();
        loadSolicitud();
        highlightLink('.solicitudLink');
    })
    $('.contactLink').click(function(event){ /* Cargar la pagina de contacto */
        event.preventDefault();
        loadContacto();
        highlightLink('.contactLink');
    })
    $('.dondeEstoyLink').click(function(event){ /* Cargar la pagina de donde estoy */
        event.preventDefault();
        loadDondeEstoy();
        highlightLink('.dondeEstoyLink');
    })
    
    
    navBarAnimation();
    
}

/* ______Función para ponerle color al link de la pagina donde estemos________ */
function highlightLink(selectedLink){
    var links = document.querySelectorAll('.navLink');
    for (let i = 0; i < links.length; i++) {
        const element = links[i];
        $(element).removeClass('selected');
    }
    $(selectedLink).addClass('selected');
}

/* ______Animar el SVG del inicio________ */
function drawSVG() {
     $('#divsvg1').load("img/svg1.svg", function(){
        new Vivus('svg1', {duration:150 , start: 'autostart'},
        function(){
            $('#svg1 path').css({transition:"all 0.5s"})
            $('#svg1 .st0').css({fill:'#D2D9FF'})
            $('#svg1 .st1').css({fill:'#2B284F'})
            $('#svg1 .st2').css({fill:'#FFFFFF'})
            $('#svg1 .st3').css({fill:'#E9EFFF'})
            $('#svg1 .st4').css({fill:'#7DA2FF'})
            $('#svg1 .st5').css({fill:'#F2C73C'})
            $('#svg1 .st6').css({fill:'#FFDA73'})
            $('#svg1 .st7').css({fill:'#98A3F4'})
            $('#svg1 .st8').css({fill:'#808FD8'})
            $('#svg1 .st9').css({fill:'#E5827C'})
            $('#svg1 .st10').css({fill:'#BC4D88'})
            $('#svg1 .st11').css({fill:'#D3A629'})
            $('#svg1 .st12').css({fill:'#4958ED'})
            $('#svg1 .st13').css({fill:'#211D35'})
            $('#svg1 .st14').css({fill:'#F4F3FE'})
            $('#svg1 .st15').css({fill:'#3500B7'})
            $('#svg1 .st16').css({fill:'#1A0087'})
            $('#svg1 .st17').css({fill:'none'})
            $('#svg1 .st18').css({fill:'#A3A3A3'})
            $('#svg1 .st19').css({fill:'#D3D3D3'})
            $('#svg1 .st20').css({fill:'#341F78'})
        })
    });
}
/* _____Función del carrusel _________ */
function slider() {
    var mySiema = new Siema({
        selector: '.mySiema',
        duration: 500,
        loop: 'true'
    });
    document.querySelector('.js-prev').addEventListener('click', function() {mySiema.prev()});
    document.querySelector('.js-next').addEventListener('click', function() {mySiema.next()});
}

/* _____Funcion para disparar alguna animación cuando el elemento entre en la pantalla_________ */
function animationtrigger(element, callback){
    var elmtPosition = $(element).height() - $(element).height()/2 + $(element).position().top;
    var scrllPosition = $(window).scrollTop() + $(window).height();
    if (scrllPosition > elmtPosition){
        callback();
    }
}


/* ______Animacion para la barra de navegacion al usar el scroll________ */
  function navBarAnimation(){
    window.addEventListener('scroll', function(){
        if($(window).scrollTop() > 0){
            $('.navbar').addClass('navbar2');
        } else {
            $('.navbar').removeClass('navbar2');
        }
    })
}


/* ______Función para cargar home por AJAX________ */
function loadHome(){
    $("#container").css('display', 'none');
    $.ajax({
        type: "GET",
        url: "./home.html",
        success: function (data) {
            var data2 = data;
            $("#container").html(data);
            $("#container").fadeIn(500);
            slider();
            drawSVG();
            addEventListener('scroll', animateSkills);
            loadrss();
            $('.contactButton').click((event)=>{
                event.preventDefault();
                loadContacto();
                highlightLink('.contactLink');
            })
            $('.portfolioBtn').click((event)=>{
                event.preventDefault();
                loadPortfolio();
                highlightLink('.portfolioLink');
            })
            sectionIn = 'home';
            
        }
    });
}

/* ____Función para animar la seccion de skills de inicio__________ */
function animateSkills(){
    if(sectionIn == 'home'){
        animationtrigger($('.skillSection'),function () {
            $('.services').css({
                'transform': 'none',
                'opacity': '1'
            })
            setTimeout(() => {$('.languages').css({
                'transform': 'none',
                'opacity': '1'
            })},500)
        
            setTimeout(() => {$('.tools').css({
                'transform': 'none',
                'opacity': '1'
            })},1000)
          });
    }
    
}

/* _____Función para cargar el RSS_________ */
function loadrss(){
    var rssContainer = document.getElementById('rss');
    var rssxhr = new XMLHttpRequest();

    /* ______Tuve que pasar el XML a json por que si no se usa PHP da un error de CORS , y aun no he aprendido PHP asi que lo convierto en JSON________ */
    rssxhr.open('GET', 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fep00.epimg.net%2Frss%2Ftags%2Fultimas_noticias.xml', true);

    rssxhr.onload = function(){
        if(this.readyState == 4 && this.status==200){
            var data = JSON.parse(rssxhr.responseText);
            console.log(data);
            renderRSS(data);
        }
    }
    rssxhr.send();

    /* ______Renderizo en HTML________ */
    function renderRSS(data) {
        var rssTitle = data.feed.title
        var noticias = data.items
        for (let i = 0; i < noticias.length; i++) {

            var linkToNew = document.createElement('a');
            var newUrl = noticias[i].link.match(/[^;]*/);
            linkToNew.href = newUrl[0];
            linkToNew.appendChild[div]



            var div = document.createElement('div');
            div.classList.add('noticia');

            var img = document.createElement('img');
            img.src = noticias[i].enclosure.link;

            var div2 = document.createElement('div');
            div.classList.add('rssdescripcion');

            var newTitle = document.createElement('h2')
            var titleText = noticias[i].title ;
            newTitle.innerHTML= titleText;
            div2.appendChild(newTitle);


            var newDescription = document.createElement('p')
            var descriptionText = noticias[i].description ;
            newDescription.innerHTML= descriptionText;
            div2.appendChild(newDescription);

            linkToNew.appendChild(img);
            linkToNew.appendChild(div2);            

            div.appendChild(linkToNew);
            rssContainer.appendChild(div);
            
        
        }
    }
}

/* ______Función para cargar Portafolio por AJAX________ */
function loadPortfolio(){
    
    $("#container").css('display', 'none');
    $.ajax({
        type: "GET",
        url: "./portfolio.html",
        success: function (data) {
            sectionIn = 'portfolio';
            $("#container").html(data);
            $("#container").fadeIn(500);
            const openModalBtn = document.querySelectorAll('.plusBtn');
            const closeModalBtn = document.querySelectorAll('.closeModalBtn');
            const modal = document.querySelectorAll('.modal');
            var modalOpen = false; /* si esta cerrado el pop modal es false y si esta abierto es true */

            /* _______Función para abrir un modal pop al clickear en las imagenes_______ */
            function openModal(index){
                if(modalOpen == false){
                    $(modal[index]).fadeIn(500);
                    modalOpen = true;
                }else if(modalOpen == true){
                    $(modal[index]).fadeOut(500);
                    modalOpen = false;

                }
            }

            /* _____agrego el eventListener a todas las tarjetas_________ */
            openModalBtn.forEach(img =>{
                img.addEventListener('click' , ()=>{
                    index = $(openModalBtn).index(img);
                    console.log(modal[index]);
                    openModal(index);
                })
            })

            /* _____agrego eventListener a todas las 'X' para poder cerrar el modal pop_________ */
            closeModalBtn.forEach(img =>{
                img.addEventListener('click' , ()=>{
                    index = $(closeModalBtn).index(img);
                    console.log(modal[index]);
                    openModal(index);
                })
            })

            /* _____Agrego eventListener a todos los pop para que si se haga click afuera se cierre_________ */
            modal.forEach(modal =>{
                modal.addEventListener('click' , (e) =>{
                    if(e.target == modal){
                        openModal(index);
                    }
                })
            })
        }
    });
    return;
}

/* _____Función para cargar la pagina de solicitud por AJAX_________ */
function loadSolicitud(){
    $("#container").css('display', 'none');
    $.ajax({
        type: "GET",
        url: "./solicitud.html",
        success: function(data){
            sectionIn = 'solicitud'
            $("#container").html(data);
            $("#container").fadeIn(500);
            var precioMostrado = document.getElementById('precioMostrado');
            var precioFinal = 0;
            var precio = 0;
            var precioBase = 0;
            var secciones = 0;
            const valorxSeccion = 400;
            var meses = 0;
            const porcentajexMes = 5;
            const maxDescuento = 20;
            var descuento = 0;
            var tipoWebInput = document.getElementById('typeOfWeb');
            var mesesInput = document.getElementById('plazoMeses');
            var seccionesInput = document.querySelectorAll('.checkbox');
            /* _____eventListener para que se actualize cuando se cambie el tipo de web_________ */
            tipoWebInput.addEventListener('change', ()=>{
                precioBase = parseInt(tipoWebInput.value);
                calcularPrecio();
            })
            /* _______eventListener para que actualize cuando se ingrese los meses_______ */
            mesesInput.addEventListener('keyup', ()=>{
                meses = mesesInput.value;
                calcularPrecio();
            })

            /* ____agregar eventListener a cada uno de los checkbox__________ */
            for (let i = 0; i < seccionesInput.length; i++) {
                seccionesInput[i].addEventListener('change',()=>{
                    if(seccionesInput[i].checked){
                        secciones ++;
                    }else{
                        secciones--;
                    }
                    calcularPrecio();
                })
            }
            /* ____Función para calcular los precios en 'tiempo real'__________ */
            function calcularPrecio(){
                precio = precioBase + (secciones*valorxSeccion);
                var porcentaje = meses*porcentajexMes
                if(porcentaje>maxDescuento){
                    porcentaje=maxDescuento;
                }
                descuento = porcentaje * precio /100;
                precioFinal = precio - descuento;
                if (precioFinal >= 0){
                    precioMostrado.innerHTML = precioFinal + '€';
                }
            }
            
            document.getElementById('presupuestoForm').addEventListener('submit', ()=>{
                verificar();
            })

            /* _____Función para validar los datos_________ */
            function verificar(){
                var name = document.getElementById('name');
                var lastName = document.getElementById('lastName');
                var phone = document.getElementById('phone');
                var phoneregex= /\(\+\d{1,3}\)\d{9}$/;
                var email = document.getElementById('email');
                var emailregex = /^[a-z0-9]*\@[a-z0-9]*\.[a-z0-9]*$/;
                var texto = '';
                var verificado = true;

                if (name.value == ''){
                    texto += 'Introduzca su nombre\n';
                    verificado = false;
                }
                if (lastName.value == ''){
                    texto += 'Introduzca su apellido\n';
                    verificado = false;
                }
                if (phoneregex.test(phone.value) == false){
                    texto += 'Introduzca un telefono valido\n';
                    verificado = false;
                }
                if(emailregex.test(email.value) == false){
                    texto += 'Introduzca un email valido\n';
                    verificado = false;
                }
                if(tipoWebInput.value == ''){
                    texto +='Seleccione tipo de pagina\n';
                    verificado = false;
                }
                if(mesesInput.value == ''){
                    texto +='Introduzca el plazo en meses\n';
                    verificado = false;
                }
                if(verificado == false){
                    event.preventDefault();
                    alert(texto);
                }
            }
            $('.solicitudReset').click(function(){
                loadSolicitud();
            });
        }
    });
}

/* _____Funcion para cargar la pagina de contacto por AJAX_________ */
function loadContacto(){
    $("#container").css('display', 'none');
    $.ajax({
        type: "GET",
        url: "./contacto.html",
        success: function(data){
            sectionIn = 'contacto';
            $("#container").html(data);
            $("#container").fadeIn(500);
            var form = document.getElementById('contactForm');
            form.addEventListener('submit',function () {
                verificar();
            })

            /* _____Función para validar datos_________ */
            function verificar() {
                var name = document.getElementById('name');
                var lastName = document.getElementById('lastName');
                var phone = document.getElementById('phone');
                var phoneregex= /\(\+\d{1,3}\)\d{9}$/;
                var email = document.getElementById('email');
                var emailregex = /^[a-z0-9]*\@[a-z0-9]*\.[a-z0-9]*$/;
                var fecha = document.getElementById('date');
                var motivo = document.getElementById('motivo');
                var texto = '';
                var verificado=true;
                if (name.value == ''){
                    texto += 'Introduzca su nombre\n';
                    verificado = false;
                }
                if (lastName.value == ''){
                    texto += 'Introduzca su apellido\n';
                    verificado = false;
                }
                if (phoneregex.test(phone.value) == false){
                    texto += 'Introduzca un telefono valido\n';
                    verificado = false;
                }
                if(emailregex.test(email.value) == false){
                    texto += 'Introduzca un email valido\n';
                    verificado = false;
                }
                if(fecha.value == ''){
                    texto += 'Introduzca una fecha valida\n';
                    verificado = false;
                }
                if(motivo.value ==''){
                    texto += 'Introduzca usu motivo de contacto\n';
                    verificado = false;
                }
                if(verificado == false){
                    event.preventDefault();
                    alert(texto);
                }else{
                    verificado == true;
                }
            }
        }
    });
}

/* _____Función para cargar la pagina de donde estoy por AJAX_________ */
function loadDondeEstoy() {
    $("#container").css('display', 'none');
    $.ajax({
        type: "GET",
        url: "./dondeestoy.html",
        success: function(data){
            sectionIn = 'dondeEstoy';
            $("#container").html(data);
            $("#container").fadeIn(500);

            /* ______Utilizando Leaflet________ */
            var mymap = L.map('map').setView([36.711798, -4.428980], 17);

            var OpenStreetMap_Mapnik = L.tileLayer('https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=ginlsrbEieqPJOPc91TU', {
                maxZoom: 19,
                attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
            }).addTo(mymap);
            L.Control.geocoder().addTo(mymap);
            /* ____Agregamos un marcador__________ */
            var marker = L.marker([36.711798, -4.428980]).addTo(mymap);
            marker.bindPopup("Master D <br> Málaga").openPopup();


            /* _____Utilizamos Routing Machine_________ */
            L.Routing.control({
                waypoints: [L.latLng(36.711798, -4.428980), L.latLng(36.712408, -4.433633)],
                routeWhileDragging: true
            }).addTo(mymap);

            /* _____Aveces no se renderiza la ruta por problemas del mismo plugin, no del codigo_________ */
        }
    });
}