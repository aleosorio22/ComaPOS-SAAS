
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

export  const urlToBase64 = async(imageUrl)=>{
  const response = await fetch(imageUrl)
  const blob = await response.blob()
  const reader = new FileReader()
  return new Promise ((resolve,reject)=>{
    reader.onloadend=()=>{
      resolve(reader.result)
    }
    reader.onerror = reject;
    reader.readAsDataURL(blob)
  })
}