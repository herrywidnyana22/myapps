export function toIdr(value?: number) {
  return (value ?? 0).toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  })
}

export const toLabelIdr = (amount: number) => {
    if (Math.abs(amount) <= 1000000) {
        return toIdr(amount);
    }

    const units = [
        { value: 1_000_000_000_000_000, label: "Kuadriliun" }, // Quadrillion
        { value: 1_000_000_000_000, label: "Triliun" },        // Trillion
        { value: 1_000_000_000, label: "Miliar" },             // Billion
        { value: 1_000_000, label: "Juta" },                   // Million
    ];

    const absAmount = Math.abs(amount); // Ambil nilai absolut untuk perhitungan

    for (const unit of units) {
        if (absAmount >= unit.value) {
            let formatted = (absAmount / unit.value).toFixed(1)
            if (formatted.endsWith(".0")) {
                formatted = formatted.slice(0, -2)
            }
            return `${amount < 0 ? "-" : ""}Rp.${formatted} ${unit.label}`
        }
    }
}

export const toLabelNumber = (value: string | number): string => {
    const num = typeof value === 'string' 
        ? parseFloat(value.replace(/,/g, '')) 
        : value
    
    if (isNaN(num)) return "0"

    if (num >= 1e12) return (num / 1e12).toFixed(1) + "T" // Keep 1 decimal
    if (num >= 1e9) return (num / 1e9).toFixed(1) + "M"   // Keep 1 decimal
    if (num >= 1e6) return (num / 1e6).toFixed(1) + "Jt"   // Keep 1 decimal
    if (num >= 1e3) return Math.floor(num / 1e3) + "K"    // Remove decimals

    return num.toString()
};
