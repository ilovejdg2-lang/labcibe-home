import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";

const emptyForm = {
  impostorName: "",
  impostorContact: "",
  comments: "",
};

const inputClass =
  "w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger-600 focus-visible:border-danger-600";

const ReportFraud = () => {
  const [form, setForm] = useState(emptyForm);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
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
                      setForm({ ...form, impostorName: e.target.value })
                    }
                    className={inputClass}
                  />
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
                      setForm({ ...form, impostorContact: e.target.value })
                    }
                    className={inputClass}
                  />
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
                  onChange={(e) =>
                    setForm({ ...form, comments: e.target.value })
                  }
                  className={inputClass}
                />
              </div>

              <Button type="submit" className="w-full sm:w-auto">
                Enviar reporte
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
