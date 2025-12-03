import { useEffect, useState, FormEvent } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { createReview, getReviews, type Review } from "@/services/reviewService";

const initialForm: Omit<Review, "id"> = {
  name: "",
  comment: "",
  rating: 5,
};

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [form, setForm] = useState<Omit<Review, "id">>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const loadReviews = async () => {
    try {
      setError(null);
      const data = await getReviews();
      setReviews(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "No se pudieron cargar las reseñas");
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      const created = await createReview(form);
      setReviews((prev) => [...prev, created]);
      setForm(initialForm);
      setSuccess("¡Gracias por tu reseña sobre la tienda de impresión 3D!");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "No se pudo enviar la reseña");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        <div className="space-y-2">
          <Badge>Opiniones</Badge>
          <h1 className="text-3xl font-bold">Reseñas de la tienda Thunder3D</h1>
          <p className="text-muted-foreground">
            Deja tu comentario sobre impresoras 3D, filamentos o el servicio de la tienda.
          </p>
        </div>

        <div className="grid md:grid-cols-[1.3fr,1fr] gap-8 items-start">
          <div className="space-y-4">
            {reviews.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Aún no hay reseñas registradas. ¡Sé el primero en contar tu experiencia con Thunder3D!
              </p>
            )}

            {reviews.map((review) => (
              <Card key={review.id} className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{review.name}</h3>
                  <Badge variant="outline">{`⭐ ${review.rating}/5`}</Badge>
                </div>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {review.comment}
                </p>
              </Card>
            ))}
          </div>

          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Deja tu reseña</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <label htmlFor="name" className="text-sm font-medium">
                  Nombre
                </label>
                <Input
                  id="name"
                  placeholder="Escribe tu nombre"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="rating" className="text-sm font-medium">
                  Puntuación (1 a 5)
                </label>
                <Input
                  id="rating"
                  type="number"
                  min={1}
                  max={5}
                  value={form.rating}
                  onChange={(e) =>
                    setForm({ ...form, rating: Number(e.target.value) || 1 })
                  }
                  required
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="comment" className="text-sm font-medium">
                  Comentario
                </label>
                <Textarea
                  id="comment"
                  placeholder="Cuéntanos cómo fue tu experiencia comprando impresoras 3D o filamentos..."
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  required
                />
              </div>

              {error && <p className="text-xs text-red-500">{error}</p>}
              {success && <p className="text-xs text-emerald-500">{success}</p>}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Enviando..." : "Enviar reseña"}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
