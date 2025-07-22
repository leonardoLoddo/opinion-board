import { use, useActionState, useOptimistic } from "react";
import { OpinionsContext } from "../store/opinions-context";
export function Opinion({ opinion: { id, title, body, userName, votes } }) {
  const { upvoteOpinion, downvoteOpinion } = use(OpinionsContext);

  const [optimisticVotes, setVotesOptimistically] = useOptimistic(
    votes,
    (prevVotes, mode) => (mode === "up" ? prevVotes + 1 : prevVotes - 1)
  );
  //useOptimistic mi permette di aggiornare in maniera ottimista l'interfaccia utente, nel caso dei voti aggiorna direttamente il numero dei voti per poi sotituire il numero con quello effettivo una volta completata la chiamata al server
  //useOptimistic accetta come parametro il vero valore da prendere in considerazione e una funzione per modificarlo in modo ottimista
  //restituisce come stato il valore ottimista in modo da poterlo richiamare e visualizzare nel componente
  //restituisce una funzione per settare lo state ottimista da richiamare nelle action

  function upVoteAction() {
    setVotesOptimistically("up");
    upvoteOpinion(id);
  }
  function downVoteAction() {
    setVotesOptimistically("down");
    downvoteOpinion(id);
  }
  const [upVoteFormState, upVoteFormAction, upVotePending] =
    useActionState(upVoteAction);

  const [downVoteFormState, downVoteFormAction, downVotePending] =
    useActionState(downVoteAction);

  return (
    <article>
      <header>
        <h3>{title}</h3>
        <p>Shared by {userName}</p>
      </header>
      <p>{body}</p>
      <form className="votes">
        <button
          formAction={upVoteFormAction}
          disabled={upVotePending || downVotePending}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m16 12-4-4-4 4" />
            <path d="M12 16V8" />
          </svg>
        </button>

        <span>{optimisticVotes}</span>

        <button
          formAction={downVoteFormAction}
          disabled={upVotePending || downVotePending}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M12 8v8" />
            <path d="m8 12 4 4 4-4" />
          </svg>
        </button>
      </form>
    </article>
  );
}
