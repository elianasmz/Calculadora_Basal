const CALCULAR = document.getElementById('calcular');
const ERROR = document.getElementById('error');
const FLU = document.getElementById('flu');
const MAN = document.getElementById('man');
const VOL = document.getElementById('vol');
var INFO = document.getElementById('info');

CALCULAR.addEventListener('click', () => {
    const DATO = document.getElementById('peso').value
    let flujo, mantenimiento;
    if (DATO > 0){
        ERROR.style.display = 'none';
        if(DATO>30){
            flujo= Math.round(calcFlujo(DATO, 1500)/24) +' o '+ Math.round(calcFlujo(DATO, 2000)/24);
            mantenimiento= calcFlujo(DATO,1500) +' o '+ calcFlujo(DATO,2000); 
            let informacion=['Se calcula con la formula Superficie corporal = ( (peso * 4) + 7) / (peso + 90).' +
                            ' Este resultado se multiplica por 1500 o por 2000 para hallar el valor del volumen diario en cc.'+' El medico decide cual de los dos resultados utilizar.'];
            VOL.innerHTML= 'Vol. Diario: ' + mantenimiento +' cc'
            FLU.innerHTML = 'Flujo: '+ flujo + ' cc/hr';
            FLU.style.display = 'block';
            MAN.style.display = 'none';
            VOL.style.display = 'block';
            INFO.innerHTML=informacion;
            
        }


        else{
            flujo = calcFlujo(DATO);
            mantenimiento = flujo*1.5;
            let informacion=['De 0kg a 10kg, se calcula 100cc por cada kilo. '+
            'Se suman 50cc por cada kilo de peso por arriba de 10kg, hasta 20kg. '+
            'De 20kg para arriba, se suman 20cc por cada kilo adicional']
            VOL.innerHTML= 'Vol. Diario: ' + holliday(DATO) +' cc'
            FLU.innerHTML = 'Mantenimiento: '+ flujo + ' cc/hr';
            MAN.innerHTML = 'm+m/2: ' + mantenimiento + ' cc/hr';
            FLU.style.display = 'block';
            MAN.style.display = 'block';
            VOL.style.display = 'block';
            INFO.innerHTML=informacion;
            
        }
        
    } else {
        ERROR.style.display = 'block';
        VOL.style.display = 'none';
        FLU.style.display = 'none';
        MAN.style.display = 'none';
    }
})

function calcFlujo(peso,opcion){
    if(peso<=30){
        return Math.round(holliday(peso)/24);
    }
    else{
        return Math.round(supCor(peso)*opcion);
    }
}

function holliday(peso){
    let resto = peso;
    let flujo = 0;
    if (resto>20){
        flujo +=(resto - 20)*20;
        resto = 20;
        } 
    if (resto>10){
        flujo += (resto -10)*50;
        resto=10;
        }
    return flujo += resto*100;
}

function supCor(peso){
    return (( (peso * 4) + 7) / (peso*1 + 90));
}
