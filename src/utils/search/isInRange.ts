export const isInRange = (value: number, range: { min?: number; max?: number }) => {
    if (!range.min || !range.max) return false
   return value >= range.min || value <= range.max
}