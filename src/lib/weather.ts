type OpenMeteoCurrent = {
  temperature: number;
  weathercode: number;
  windspeed: number;
};

type OpenMeteoResponse = {
  current_weather?: OpenMeteoCurrent;
};

function codeToText(code: number): string {
  // https://open-meteo.com/en/docs (WMO weather interpretation codes)
  if (code === 0) return "Clear";
  if (code === 1 || code === 2) return "Partly cloudy";
  if (code === 3) return "Overcast";
  if (code === 45 || code === 48) return "Fog";
  if (code === 51 || code === 53 || code === 55) return "Drizzle";
  if (code === 56 || code === 57) return "Freezing drizzle";
  if (code === 61 || code === 63 || code === 65) return "Rain";
  if (code === 66 || code === 67) return "Freezing rain";
  if (code === 71 || code === 73 || code === 75) return "Snow";
  if (code === 77) return "Snow grains";
  if (code === 80 || code === 81 || code === 82) return "Showers";
  if (code === 85 || code === 86) return "Snow showers";
  if (code === 95) return "Thunderstorm";
  if (code === 96 || code === 99) return "Thunderstorm";
  return "Weather";
}

export async function getSrinagarWeatherLine(): Promise<string | null> {
  // Srinagar coordinates
  const latitude = 34.0837;
  const longitude = 74.7973;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`;

  try {
    const res = await fetch(url, {
      // Cache at the Next.js layer; keep this lightweight for Vercel.
      next: { revalidate: 15 * 60 },
      headers: { "User-Agent": "rising-kashmir/1.0" },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as OpenMeteoResponse;
    const current = data.current_weather;
    if (!current) return null;

    const temp = Math.round(current.temperature);
    const label = codeToText(current.weathercode);
    return `Srinagar · ${temp}°C · ${label}`;
  } catch {
    return null;
  }
}

