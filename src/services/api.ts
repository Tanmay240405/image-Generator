const HF_API_URL = "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0";

export async function generateImage(prompt: string): Promise<string> {
  const apiKey = import.meta.env.VITE_HF_API_KEY;

  if (!apiKey) {
    throw new Error("Hugging Face API key is missing. Please add VITE_HF_API_KEY to your .env file.");
  }

  const response = await fetch(HF_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: prompt }),
  });

  if (!response.ok) {
    let errorData: any = {};
    try {
      errorData = await response.json();
    } catch(e) {}

    if (response.status === 503 && errorData.estimated_time) {
      throw new Error(
        `Model is loading, please try again in ~${Math.ceil(
          errorData.estimated_time
        )} seconds.`
      );
    }
    
    throw new Error(errorData.error || `API error: ${response.status}`);
  }

  const blob = await response.blob();
  return URL.createObjectURL(blob);
}
