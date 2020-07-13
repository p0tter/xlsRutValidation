function rutValidation(jsonDataWorkBookSheet){
    const rut = jsonDataWorkBookSheet.RUT;
    let y = 2;
    let resultado = 0;
    for (let i = rut.length; i>0; i--){        
        resultado += y*rut[i-1];
        y++;
        if(y===8){
            y = 2;
        }
        if(i === 1){
           
            y = 2;
        }
    }
    let digitoVerificadorEsperado = 11 - (resultado % 11);
    if(digitoVerificadorEsperado === 10)
        digitoVerificadorEsperado = 'k'
    else if(digitoVerificadorEsperado === 11)
        digitoVerificadorEsperado = 0;
    
    return digitoVerificadorEsperado;
}

module.exports = rutValidation;