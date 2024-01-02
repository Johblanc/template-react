import { useContext, useState } from "react";
import { TokenContext } from "../Context/TokenContext";
import { Requester } from "../Utilities/Requests/Requester";

export function GestionBdD() {
  const { token } = useContext(TokenContext);

  const [inReset, setInReset] = useState(false);
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);

  const handleReset = async () => {
    await Requester.app.reset(token, files ? files : undefined);
    setInReset(false);
    setMessage("Réinitialisation réalisée");
  };
  return (
    <section className="section-extract">
      <h2>Gestion</h2>
      <div className="sub-section">
        <h3>Extraction de la base de données</h3>
        <button onClick={async () => await Requester.app.extract(token)}>
          Extraction
        </button>
      </div>
      <div className="sub-section">
        <h3>Restauration de la base de données</h3>
        {message === "" ? (
          <>
            {!inReset && (
              <div>
                <div>
                  <label>Choix de l'archive</label>
                  <input
                    type="file"
                    accept=".zip"
                    onChange={(e) => setFiles(e.target.files)}
                  />
                </div>
                <button className="theme-bad" onClick={() => setInReset(true)}>Reset</button>
              </div>
            )}
            {inReset && (
              <div>
                <h5>Confirmer la réinitialisation</h5>
                <div>
                  <button className="theme-good" onClick={() => setInReset(false)}>Non</button>
                  <button className="theme-bad" onClick={handleReset}>Oui</button>
                </div>
              </div>
            )}
          </>
        ) : (
          <p>{message}</p>
        )}
      </div>
    </section>
  );
}
