#!/bin/bash

#function reemplar
fn_reemplazar() {
    if sed "s/$1/$2/g" $3 > $3;then
    echo "$1"
        echo "¡Cambio realizado!"
    else
        echo "¡Error!"
    fi
}

old="httpHeaderAcceptSelected.startsWith('text')"
new="(httpHeaderAcceptSelected.startsWith('text') || httpHeaderAcceptSelected.startsWith('application\/xml'))"

if [ -z $1 ]; then
    echo 'Se neceita el directorio'
else
   for fichero in `ls $1`
    do 
       fn_reemplazar $old $new $fichero
    done
fi
