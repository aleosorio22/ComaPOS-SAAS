
export function ConvertirCapitalize(input) {
  if (!input || typeof input !== 'string') return '';
  return (input.charAt(0).toUpperCase()+input.slice(1).toLowerCase());

}

export function ConvertirMinusculas(input){
  return input.toLowerCase();
}

export function FormatearNumeroDinero(numero) {
  const numeroFormateado = numero.toLocaleString("es-GT",{style : "currency", currency: "GTQ"});
  return numeroFormateado;
}