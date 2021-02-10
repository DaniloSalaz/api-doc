#!/bin/bash

#function reemplar
fn_reemplazar() {
    dir="$4""$3"
    if sed "s/$1/$2/g" $dir > $3;then
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
       fn_reemplazar "$old" "$new" "$fichero" "$1"
    done
fi

