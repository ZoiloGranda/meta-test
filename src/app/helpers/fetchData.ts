export async function fetchData(url: string) {
  try {
    const response = await fetch(url);
    if (response.status === 500) {
      throw new Error("Internal Server Error (500)");
    }
    const data = await response.json();
    return data;
  } catch {
    throw new Error("Failed to fetch data");
  }
}
