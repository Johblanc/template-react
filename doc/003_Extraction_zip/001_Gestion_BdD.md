# Gestion de la base de données

## scss section-extract

new ```src/Style/F_Customs/Section.Extract.scss```

```scss
.section-extract {
  >div{
    >*{
      @include get-margin("xl")
    }
    button {
      @include get-margin("xl")
    }
  }
}
```

## scss import

update ```src/Style/F_Customs/Import.scss```

```scss
/* ... */
@import './Section.Extract.scss';
```

## RequesterApp

new ```src/Utilities/Requests/RequesterApp.ts```


```ts
import { RequestMethods } from "./RequestMethods.enum";
import { RequesterBase } from "./RequesterBase";

export class RequesterApp extends RequesterBase {
  async extract(token: string) {

    const data = await fetch(`${process.env.REACT_APP_API_URL}/extract`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const blob = await data.blob();
    const a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.setAttribute(
      "download",
      `archive_dev_tools_${new Date().toISOString()}.zip`
    );
    a.click();
  }
  async reset(token : string , files? : FileList )
  {
    const response = await RequesterApp.base(
      "reset",
      RequestMethods.POST ,
      [],
      undefined,
      token,
      files ? {key : "files", value : files} : undefined
      )
    return response
  } ;
}
```

## Requester

update ```src/Utilities/Requests/Requester.ts```

```ts
import { RequesterApp } from "./RequesterApp";
/* ... */

export class Requester {
  static app = new RequesterApp() ;
  /* ... */
  
}
```

## GestionBdD

new ```src/Admin/GestionBdD.tsx```

```ts
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
```

## ROUTER

update ```src/App/Router.tsx```

```ts
/* ... */
import { GestionBdD } from "../Admin/GestionBdD";

export const ROUTER = createBrowserRouter([
  {
    /* ... */
    children: [
      /* ... */
      {
        path: "admin",
        element : <AutoPromote/>,
        children: [
          {
            path: "",
            element: <GestionBdD/>,
          },
          {
            path: "promote",
            element: <Promote />,
          },
        ],
      },
    ],
  },
]);
```