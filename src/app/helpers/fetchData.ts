export async function fetchData(url: string) {
  const response = await fetch(url);
  const data = await response.json();
  console.log("data", data);
  return data;
}
