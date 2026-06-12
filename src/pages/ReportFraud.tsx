import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import StatusMessage from "@/components/ui/StatusMessage";
import { submitFraudReport } from "@/lib/frauds";

const emptyForm = {
  impostorName: "",
  impostorContact: "",
  comments: "",
};

type FormErrors = Partial<Record<keyof typeof emptyForm, string>>;

const inputClass =
  "w-full rounded-md border bg-white px-3 py-2.5 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger-600 focus-visible:border-danger-600";

const requiredFields: (keyof typeof emptyForm)[] = [
  "impostorName",
  "impostorContact",
];

function validateForm(form: typeof emptyForm): FormErrors {
  const errors: FormErrors = {};

  if (!form.impostorName.trim()) {
    errors.impostorName = "El nombre del impostor es obligatorio.";
  }

  if (!form.impostorContact.trim()) {
    errors.impostorContact = "El contacto del estafador es obligatorio.";
  }

  return errors;
}

const ReportFraud = () => {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (field: keyof typeof emptyForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (submitError) setSubmitError(null);
    if (success) setSuccess(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitError(null);
    setSuccess(false);

    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      const firstInvalidField = requiredFields.find(
        (field) => validationErrors[field]
      );
      if (firstInvalidField) {
        requestAnimationFrame(() => {
          const field = document.getElementById(firstInvalidField);
          field?.focus({ preventScroll: true });
          field?.scrollIntoView({ behavior: "smooth", block: "center" });
        });
      }

      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      await submitFraudReport({
        impostorDetails: form.impostorName.trim(),
        contactInfo: form.impostorContact.trim(),
        comments: form.comments.trim(),
      });
      setForm(emptyForm);
      setSuccess(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Error al enviar el reporte."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main id="main-content" className="flex-1 mt-20">
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-3xl">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio
            </Link>

            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 sm:p-10 space-y-8"
            >
              <div
                className="h-1.5 w-full rounded-full bg-gray-200 overflow-hidden"
                aria-hidden
              >
                <div className="h-full w-2/5 rounded-full bg-danger-600" />
              </div>

              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-2">
                    Detalles sobre el impostor
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Comparta lo que sepa sobre quién decía ser el estafador.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="impostorName"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Nombre de la persona, empresa o entidad que decía ser el
                    impostor{" "}
                    <span className="text-danger-600" aria-hidden>
                      *
                    </span>
                  </label>
                  <input
                    id="impostorName"
                    type="text"
                    value={form.impostorName}
                    onChange={(e) =>
                      handleChange("impostorName", e.target.value)
                    }
                    aria-invalid={!!errors.impostorName}
                    aria-describedby={
                      errors.impostorName ? "impostorName-error" : undefined
                    }
                    className={`${inputClass} scroll-mt-24 ${
                      errors.impostorName
                        ? "border-danger-600"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.impostorName && (
                    <p
                      id="impostorName-error"
                      className="mt-2 text-sm text-destructive"
                      role="alert"
                    >
                      {errors.impostorName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="impostorContact"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Número, correo o usuario desde el que contactó{" "}
                    <span className="text-danger-600" aria-hidden>
                      *
                    </span>
                  </label>
                  <input
                    id="impostorContact"
                    type="text"
                    value={form.impostorContact}
                    onChange={(e) =>
                      handleChange("impostorContact", e.target.value)
                    }
                    aria-invalid={!!errors.impostorContact}
                    aria-describedby={
                      errors.impostorContact
                        ? "impostorContact-error"
                        : undefined
                    }
                    className={`${inputClass} scroll-mt-24 ${
                      errors.impostorContact
                        ? "border-danger-600"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.impostorContact && (
                    <p
                      id="impostorContact-error"
                      className="mt-2 text-sm text-destructive"
                      role="alert"
                    >
                      {errors.impostorContact}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-2">
                    Comentarios
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Describa lo que ocurrió con el mayor detalle posible.
                    Mencione URLs, números, montos o fechas si las recuerda. No
                    incluya contraseñas ni información bancaria completa.
                  </p>
                </div>

                <textarea
                  id="comments"
                  rows={8}
                  value={form.comments}
                  onChange={(e) => handleChange("comments", e.target.value)}
                  className={`${inputClass} border-gray-300`}
                />
              </div>

              {submitting && (
                <StatusMessage
                  variant="loading"
                  message="Enviando su reporte, por favor espere..."
                />
              )}

              {submitError && (
                <StatusMessage variant="error" message={submitError} />
              )}

              {success && (
                <StatusMessage
                  variant="success"
                  message="Reporte enviado correctamente. Gracias por contribuir a la seguridad digital."
                />
              )}

              <Button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto"
              >
                {submitting ? "Enviando..." : "Enviar reporte"}
              </Button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ReportFraud;
