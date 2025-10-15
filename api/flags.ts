const FLAG_API_URL = "https://flagsapi.com/{country_code}/flat/{size}.png"

export function getFlagUrl(country_code: string, size: Number = 32) {
    return FLAG_API_URL
        .replace("{country_code}", country_code)
        .replace("{size}", size.toString());
}