import { useFormStatus } from "react-dom";

export default function Submit() {
  const { pending } = useFormStatus(); //da status posso ricavare pending, un booleano che é true mentre inviamo dei dati e false prima e dopo averlo fatto
  return (
    <p className="actions">
      <button type="submit" disabled={pending}>
        {pending ? "Invio..." : "Invia"}
      </button>
    </p>
  );
}
