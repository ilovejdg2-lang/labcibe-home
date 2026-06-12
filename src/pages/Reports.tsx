import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import StatusMessage from "@/components/ui/StatusMessage";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getFraudReports, type Fraud } from "@/lib/frauds";

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleString("es-CR", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

const Reports = () => {
  const [reports, setReports] = useState<Fraud[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadReports() {
      setLoading(true);
      setError(null);

      try {
        const data = await getFraudReports();
        if (!cancelled) setReports(data);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Error al cargar los reportes."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadReports();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main id="main-content" className="flex-1 mt-20">
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio
            </Link>

            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Reportes registrados
              </h1>
              <p className="text-sm text-muted-foreground">
                Listado de estafas reportadas por la comunidad.
              </p>
            </div>

            {loading && (
              <StatusMessage
                variant="loading"
                message="Cargando reportes registrados..."
              />
            )}

            {error && <StatusMessage variant="error" message={error} />}

            {!loading && !error && reports.length === 0 && (
              <p className="text-sm text-muted-foreground py-8">
                No hay reportes registrados todavía.
              </p>
            )}

            {!loading && !error && reports.length > 0 && (
              <ul className="space-y-4">
                {reports.map((report) => (
                  <li key={report.id}>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          {report.impostorDetails}
                        </CardTitle>
                        <CardDescription>
                          Reporte #{report.id} · {formatDate(report.createdAt)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3 text-sm">
                        <div>
                          <span className="font-medium text-foreground">
                            Contacto del estafador:{" "}
                          </span>
                          <span className="text-muted-foreground">
                            {report.contactInfo}
                          </span>
                        </div>
                        {report.comments && (
                          <div>
                            <span className="font-medium text-foreground block mb-1">
                              Comentarios
                            </span>
                            <p className="text-muted-foreground whitespace-pre-wrap">
                              {report.comments}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Reports;
