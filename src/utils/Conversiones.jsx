
export function ConvertirCapitalize(input) {
  if (!input || typeof input !== 'string') return '';
  return (input.charAt(0).toUpperCase()+input.slice(1).toLowerCase());

}

export function ConvertirTitleCase(input) {
  if (!input || typeof input !== 'string') return '';
  return input
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function ConvertirMinusculas(input){
  return input.toLowerCase();
}

export function FormatearNumeroDinero(numero, currency, iso) {
  if(currency === undefined){
    return;
  }
  const esiso= "es-" + iso;
  const numeroFormateado = numero.toLocaleString(esiso,{style : "currency", currency: `${currency}`});
  return numeroFormateado;
}