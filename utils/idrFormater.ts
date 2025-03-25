export function toIdr(value?: number) {
  return (value ?? 0).toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  })
}

export const toLabelIdr = (amount: number) => {
    if (amount <= 1000000) {
        return toIdr(amount)
    }

    const units = [
        { value: 1_000_000_000_000_000, label: "Kuadriliun" }, // Quadrillion
        { value: 1_000_000_000_000, label: "Triliun" },        // Trillion
        { value: 1_000_000_000, label: "Miliar" },             // Billion
        { value: 1_000_000, label: "Juta" },                   // Million
    ]

    for (const unit of units) {
        if (amount >= unit.value) {
            let formatted = (amount / unit.value).toFixed(1);
            if (formatted.endsWith(".0")) {
                formatted = formatted.slice(0, -2) // Remove .0 if unnecessary
            }
            return `Rp.${formatted} ${unit.label}`
        }
    }
}