// lib/barcode.ts

/**
 * Generates a GS1-compliant EAN-13 barcode number for retail products.
 *
 * Structure: [GS1 Company Prefix (7)] + [Product Reference (5)] + [Check Digit (1)]
 *
 * For a real deployment, your GS1 company prefix is assigned by GS1 org.
 * During dev/staging, prefix 200-299 is reserved for internal/store use.
 *
 * @param companyPrefix  - 7-digit GS1 company prefix  (e.g. "2000001")
 * @param productRef     - Up to 5-digit product reference, zero-padded
 * @returns              - 13-digit EAN-13 string
 */
export function generateEAN13(companyPrefix: string, productRef: number): string {
    if (!/^\d{7}$/.test(companyPrefix)) {
        throw new Error("Company prefix must be exactly 7 digits")
    }
    if (productRef < 0 || productRef > 99999) {
        throw new Error("Product reference must be between 0 and 99999")
    }

    console.log("{LIB}", productRef)
    const base = `${companyPrefix}${String(productRef).padStart(5, "0")}`

    console.log("{LIB} base", base)

    // EAN-13 check digit algorithm (alternating weight 1 and 3)
    const checkDigit = computeEAN13CheckDigit(base)

    console.log("{LIB} checkDigit", checkDigit)

    return `${base}${checkDigit}`
}

/**
 * Validates an EAN-13 barcode using the check digit algorithm.
 */
export function validateEAN13(barcode: string): boolean {
    if (!/^\d{13}$/.test(barcode)) return false
    const base = barcode.slice(0, 12)
    const providedCheck = parseInt(barcode[12]!, 10)
    return computeEAN13CheckDigit(base) === providedCheck
}

function computeEAN13CheckDigit(twelveDigits: string): number {
    const digits = twelveDigits.split("").map(Number)
    const sum = digits.reduce((acc, digit, i) => {
        // Odd positions (0-indexed) get weight 3, even get weight 1
        return acc + digit * (i % 2 === 0 ? 1 : 3)
    }, 0)
    const remainder = sum % 10
    return remainder === 0 ? 0 : 10 - remainder
}