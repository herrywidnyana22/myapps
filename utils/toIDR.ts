export function toIdr(value: number){
    return value.toLocaleString('id-ID', { 
      style: 'currency', 
      currency: 'IDR',
      minimumFractionDigits: 0
    })
}