import { API_URL } from "@/lib/config";

export interface FraudReport {
  impostorDetails: string;
  contactInfo: string;
  comments: string;
}

function toFetchError(error: unknown, fallback: string): Error {
  if (error instanceof TypeError && error.message === "Failed to fetch") {
    return new Error(
      "No se pudo conectar con el servidor. Verifique que el backend esté en ejecución e intente de nuevo."
    );
  }

  if (error instanceof Error) return error;

  return new Error(fallback);
}

export async function submitFraudReport(report: FraudReport): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/api/Fraud`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(report),
    });

    if (response.status === 400) {
      const message = await response.text();
      throw new Error(message.replace(/^"|"$/g, "") || "Datos inválidos.");
    }

    if (!response.ok) {
      throw new Error(
        "No se pudo enviar el reporte. Intente de nuevo más tarde."
      );
    }
  } catch (error) {
    throw toFetchError(
      error,
      "No se pudo enviar el reporte. Intente de nuevo más tarde."
    );
  }
}
