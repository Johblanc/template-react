
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
